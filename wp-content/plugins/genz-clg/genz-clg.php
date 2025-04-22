
<?php
/**
 * Plugin Name: GenZ CLG React App
 * Description: Embeds the GenZ CLG React application in WordPress
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue scripts and styles
function genz_clg_enqueue_assets() {
    // Enqueue React app's CSS and JS (paths will be updated once you build your React app)
    wp_enqueue_style(
        'genz-clg-styles',
        plugin_dir_url(__FILE__) . 'build/static/css/main.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'genz-clg-js',
        plugin_dir_url(__FILE__) . 'build/static/js/main.js',
        array(),
        '1.0.0',
        true
    );

    // Pass WordPress data to React
    wp_localize_script('genz-clg-js', 'wpData', array(
        'restUrl' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'userId' => get_current_user_id()
    ));
}
add_action('wp_enqueue_scripts', 'genz_clg_enqueue_assets');

// Register shortcode to embed the app
function genz_clg_app_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'page' => 'dashboard'
    ), $atts);

    return sprintf(
        '<div id="genz-clg-root" data-page="%s"></div>',
        esc_attr($attributes['page'])
    );
}
add_shortcode('genz_clg', 'genz_clg_app_shortcode');

// Add menu page in WordPress admin
function genz_clg_admin_menu() {
    add_menu_page(
        'GenZ CLG Settings',
        'GenZ CLG',
        'manage_options',
        'genz-clg-settings',
        'genz_clg_settings_page',
        'dashicons-welcome-learn-more'
    );
}
add_action('admin_menu', 'genz_clg_admin_menu');

// Create the settings page
function genz_clg_settings_page() {
    ?>
    <div class="wrap">
        <h1>GenZ CLG Settings</h1>
        <p>Use the shortcode [genz_clg] to embed the app in any page.</p>
        <p>You can specify a page: [genz_clg page="dashboard"]</p>
    </div>
    <?php
}
