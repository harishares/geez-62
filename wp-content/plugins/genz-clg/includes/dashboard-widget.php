
<?php
/**
 * GenZ CLG Dashboard Widget
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add a dashboard widget for GenZ CLG stats
 */
function genz_clg_add_dashboard_widget() {
    wp_add_dashboard_widget(
        'genz_clg_dashboard_widget',
        'GenZ CLG Overview',
        'genz_clg_dashboard_widget_content'
    );
}
add_action('wp_dashboard_setup', 'genz_clg_add_dashboard_widget');

/**
 * Display the dashboard widget content
 */
function genz_clg_dashboard_widget_content() {
    ?>
    <div class="genz-clg-dashboard-widget-content">
        <p>Welcome to GenZ CLG! Here's a quick overview:</p>
        
        <div class="genz-clg-stat-item">
            <div class="genz-clg-stat-value"><?php echo esc_html(genz_clg_get_shortcode_count()); ?></div>
            <div class="genz-clg-stat-label">Pages using GenZ CLG</div>
        </div>
        
        <?php if (current_user_can('manage_options')): ?>
            <p>
                <a href="<?php echo esc_url(admin_url('admin.php?page=genz-clg-settings')); ?>" class="button button-primary">
                    Configure Settings
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=genz-clg-docs')); ?>" class="button">
                    View Documentation
                </a>
            </p>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Count how many posts/pages use the GenZ CLG shortcode
 */
function genz_clg_get_shortcode_count() {
    $args = array(
        'post_type' => array('post', 'page'),
        'posts_per_page' => -1,
        's' => '[genz_clg'
    );
    $query = new WP_Query($args);
    return $query->found_posts;
}
