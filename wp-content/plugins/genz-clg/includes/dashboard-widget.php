
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
    $shortcode_count = genz_clg_get_shortcode_count();
    $primary_color = get_option('genz_clg_primary_color', '#8B5CF6');
    $is_react_installed = file_exists(GENZ_CLG_PLUGIN_DIR . 'build/static/js');
    ?>
    <div class="genz-clg-dashboard-widget-content">
        <style>
            .genz-clg-dashboard-widget-content {
                padding: 8px 0;
            }
            .genz-clg-stat-item {
                display: flex;
                align-items: center;
                margin-bottom: 16px;
                padding: 12px;
                background-color: #f9f9f9;
                border-left: 4px solid <?php echo esc_attr($primary_color); ?>;
                border-radius: 3px;
            }
            .genz-clg-stat-value {
                font-size: 24px;
                font-weight: bold;
                margin-right: 12px;
                color: <?php echo esc_attr($primary_color); ?>;
            }
            .genz-clg-stat-label {
                font-size: 14px;
                color: #555;
            }
            .genz-clg-status {
                display: flex;
                align-items: center;
                margin-bottom: 16px;
                font-size: 14px;
            }
            .genz-clg-status-indicator {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 8px;
            }
            .genz-clg-status-active {
                background-color: #46b450;
            }
            .genz-clg-status-inactive {
                background-color: #dc3232;
            }
            .genz-clg-quick-links {
                margin-top: 16px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
        </style>

        <div class="genz-clg-status">
            <?php if ($is_react_installed): ?>
                <span class="genz-clg-status-indicator genz-clg-status-active"></span>
                <span>React App is properly installed</span>
            <?php else: ?>
                <span class="genz-clg-status-indicator genz-clg-status-inactive"></span>
                <span>React App needs to be built and installed</span>
            <?php endif; ?>
        </div>

        <div class="genz-clg-stat-item">
            <div class="genz-clg-stat-value"><?php echo esc_html($shortcode_count); ?></div>
            <div class="genz-clg-stat-label">
                <?php echo _n('Page using GenZ CLG', 'Pages using GenZ CLG', $shortcode_count, 'genz-clg'); ?>
            </div>
        </div>
        
        <div class="genz-clg-stat-item">
            <div class="genz-clg-stat-value"><?php echo esc_html(genz_clg_get_recent_views(7)); ?></div>
            <div class="genz-clg-stat-label">Views in the last 7 days</div>
        </div>
        
        <div class="genz-clg-stat-item">
            <div class="genz-clg-stat-value"><?php echo esc_html(genz_clg_get_user_count()); ?></div>
            <div class="genz-clg-stat-label">Registered app users</div>
        </div>

        <?php if (current_user_can('manage_options')): ?>
            <div class="genz-clg-quick-links">
                <a href="<?php echo esc_url(admin_url('admin.php?page=genz-clg-settings')); ?>" class="button button-primary">
                    Configure Settings
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=genz-clg-docs')); ?>" class="button">
                    View Documentation
                </a>
                <a href="<?php echo esc_url(admin_url('post-new.php?post_type=page&genz_clg_shortcode=1')); ?>" class="button">
                    Create New Page
                </a>
            </div>
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

/**
 * Get recent view count (simulated for now)
 * In a production environment, this would connect to an analytics system
 */
function genz_clg_get_recent_views($days = 7) {
    // This is a placeholder - in a real implementation, you would track actual views
    // For now we'll return a random number based on the day of the month for demonstration
    $seed = date('j') + $days;
    return rand($seed * 5, $seed * 20);
}

/**
 * Get registered user count
 * In a production environment, this would connect to your app's user system
 */
function genz_clg_get_user_count() {
    // This is a placeholder - in a real implementation, you would query your app's user database
    // For now we'll return a count of WordPress users with the subscriber role as an example
    $user_query = new WP_User_Query(array('role' => 'subscriber'));
    return $user_query->get_total();
}
