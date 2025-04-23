
<?php
/**
 * Dashboard specific functionality
 */

/**
 * Dashboard metrics for widgets
 */
function genz_clg_get_dashboard_metrics() {
    $metrics = array(
        'total_law_resources' => 0,
        'total_startups' => 0,
        'total_mentors' => 0,
        'recent_activities' => array(),
    );
    
    // Count law resources
    $law_resources = wp_count_posts('law_resource');
    $metrics['total_law_resources'] = $law_resources->publish;
    
    // Count startup ideas
    $startup_ideas = wp_count_posts('startup_idea');
    $metrics['total_startups'] = $startup_ideas->publish;
    
    // Count mentors
    $mentors = wp_count_posts('mentor');
    $metrics['total_mentors'] = $mentors->publish;
    
    // Get recent activities (simulated, would typically come from a custom table)
    $metrics['recent_activities'] = array(
        array(
            'type' => 'course_completed',
            'title' => 'Completed Legal Basics Course',
            'date' => date('Y-m-d H:i:s', strtotime('-2 days')),
        ),
        array(
            'type' => 'startup_idea',
            'title' => 'Submitted new startup idea',
            'date' => date('Y-m-d H:i:s', strtotime('-5 days')),
        ),
        array(
            'type' => 'mentorship',
            'title' => 'Attended mentorship session',
            'date' => date('Y-m-d H:i:s', strtotime('-1 week')),
        ),
    );
    
    return $metrics;
}

/**
 * Ajax handler for dashboard chart data
 */
function genz_clg_get_chart_data() {
    // Check nonce for security
    if (!isset($_GET['nonce']) || !wp_verify_nonce($_GET['nonce'], 'genz_clg_chart_data')) {
        wp_send_json_error('Invalid security token');
    }
    
    // Get current user
    $current_user_id = get_current_user_id();
    if (!$current_user_id) {
        wp_send_json_error('User not logged in');
    }
    
    // Example: Generate some random data for user progress
    $data = array(
        'labels' => array('Week 1', 'Week 2', 'Week 3', 'Week 4'),
        'datasets' => array(
            array(
                'label' => 'Law Education',
                'data' => array(rand(1, 10), rand(1, 10), rand(1, 10), rand(1, 10)),
                'backgroundColor' => 'rgba(139, 92, 246, 0.2)',
                'borderColor' => 'rgba(139, 92, 246, 1)',
            ),
            array(
                'label' => 'Mentorship',
                'data' => array(rand(1, 10), rand(1, 10), rand(1, 10), rand(1, 10)),
                'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                'borderColor' => 'rgba(59, 130, 246, 1)',
            ),
        ),
    );
    
    wp_send_json_success($data);
}
add_action('wp_ajax_genz_clg_get_chart_data', 'genz_clg_get_chart_data');

/**
 * Ajax handler for user goal tracking
 */
function genz_clg_update_goal_progress() {
    // Check nonce for security
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'genz_clg_update_goal')) {
        wp_send_json_error('Invalid security token');
    }
    
    // Get current user
    $current_user_id = get_current_user_id();
    if (!$current_user_id) {
        wp_send_json_error('User not logged in');
    }
    
    // Get goal ID and new progress value
    $goal_id = isset($_POST['goal_id']) ? intval($_POST['goal_id']) : 0;
    $progress = isset($_POST['progress']) ? intval($_POST['progress']) : 0;
    
    if (!$goal_id) {
        wp_send_json_error('Invalid goal ID');
    }
    
    // Validate progress range
    $progress = max(0, min(100, $progress));
    
    // Update user meta with the new progress value
    $goals = get_user_meta($current_user_id, 'genz_clg_goals', true);
    if (!is_array($goals)) {
        $goals = array();
    }
    
    $goals[$goal_id] = $progress;
    update_user_meta($current_user_id, 'genz_clg_goals', $goals);
    
    wp_send_json_success(array(
        'progress' => $progress,
    ));
}
add_action('wp_ajax_genz_clg_update_goal_progress', 'genz_clg_update_goal_progress');

/**
 * Create initial dashboard charts JavaScript
 */
function genz_clg_create_charts_js() {
    // Create the js directory if it doesn't exist
    $js_dir = GENZ_THEME_DIR . '/assets/js';
    if (!file_exists($js_dir)) {
        mkdir($js_dir, 0755, true);
    }
    
    // Create the charts.js file
    $charts_js_content = <<<EOT
/**
 * GenZ CLG Dashboard Charts
 */

(function($) {
    'use strict';
    
    // Performance Chart
    function initPerformanceChart() {
        const ctx = document.getElementById('performance-chart');
        
        if (!ctx) {
            return;
        }
        
        // Clear any previous content
        ctx.innerHTML = '';
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        ctx.appendChild(canvas);
        
        // Fetch chart data via Ajax
        $.ajax({
            url: genzClgData.ajaxUrl,
            type: 'GET',
            data: {
                action: 'genz_clg_get_chart_data',
                nonce: genzClgData.nonce
            },
            success: function(response) {
                if (response.success && response.data) {
                    const chart = new Chart(canvas, {
                        type: 'line',
                        data: response.data,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                } else {
                    ctx.innerHTML = '<p class="text-center text-gray-500 pt-4">Could not load chart data</p>';
                }
            },
            error: function() {
                ctx.innerHTML = '<p class="text-center text-gray-500 pt-4">Error loading chart data</p>';
            }
        });
    }
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        initPerformanceChart();
    });
    
})(jQuery);
EOT;

    file_put_contents($js_dir . '/charts.js', $charts_js_content);
}
add_action('after_switch_theme', 'genz_clg_create_charts_js');

/**
 * Create initial CSS files
 */
function genz_clg_create_css_files() {
    // Create the css directory if it doesn't exist
    $css_dir = GENZ_THEME_DIR . '/assets/css';
    if (!file_exists($css_dir)) {
        mkdir($css_dir, 0755, true);
    }
    
    // Create the main style.css file
    $style_css_content = <<<EOT
/**
 * GenZ CLG Theme Styles
 */

/* Tailwind Utilities */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
body {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #333;
    background-color: #f9fafb;
}

.dashboard-nav ul li a {
    transition: all 0.2s ease-in-out;
}

.dashboard-nav ul li a:hover {
    background-color: #f3f4f6;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
}

.pagination .page-numbers {
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border-radius: 0.375rem;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    color: #6b7280;
}

.pagination .page-numbers.current {
    background-color: #8B5CF6;
    color: #fff;
    border-color: #8B5CF6;
}

.pagination .page-numbers:hover:not(.current) {
    background-color: #f3f4f6;
}
EOT;

    file_put_contents($css_dir . '/style.css', $style_css_content);
    
    // Create the tailwind.css file with a placeholder
    $tailwind_css_content = "/* Tailwind CSS will be generated here */\n";
    file_put_contents($css_dir . '/tailwind.css', $tailwind_css_content);
}
add_action('after_switch_theme', 'genz_clg_create_css_files');
