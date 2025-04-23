
<?php
/**
 * Admin functionality
 */

if (!defined('ABSPATH')) {
    exit;
}

function genz_clg_admin_menu() {
    add_menu_page(
        'GenZ CLG Settings',
        'GenZ CLG',
        'manage_options',
        'genz-clg-settings',
        'genz_clg_settings_page',
        'dashicons-welcome-learn-more'
    );
    
    add_submenu_page(
        'genz-clg-settings',
        'General Settings',
        'Settings',
        'manage_options',
        'genz-clg-settings',
        'genz_clg_settings_page'
    );
    
    add_submenu_page(
        'genz-clg-settings',
        'Documentation',
        'Documentation',
        'manage_options',
        'genz-clg-docs',
        'genz_clg_docs_page'
    );
}
add_action('admin_menu', 'genz_clg_admin_menu');

function genz_clg_register_settings() {
    register_setting('genz_clg_settings', 'genz_clg_primary_color');
    register_setting('genz_clg_settings', 'genz_clg_logo_url');
    register_setting('genz_clg_settings', 'genz_clg_allow_registration');
}
add_action('admin_init', 'genz_clg_register_settings');

function genz_clg_add_settings_link($links) {
    $settings_link = '<a href="admin.php?page=genz-clg-settings">' . __('Settings', 'genz-clg') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
}

function genz_clg_admin_styles() {
    $screen = get_current_screen();
    if (strpos($screen->id, 'genz-clg') !== false) {
        ?>
        <style>
            .card {
                background: #fff;
                border: 1px solid #ccd0d4;
                box-shadow: 0 1px 1px rgba(0,0,0,0.04);
                margin-top: 20px;
                padding: 15px;
            }
            .card h2 {
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
                margin-top: 0;
            }
        </style>
        <?php
    }
}
add_action('admin_head', 'genz_clg_admin_styles');

function genz_clg_enqueue_admin_scripts($hook) {
    if (strpos($hook, 'genz-clg') !== false) {
        wp_enqueue_media();
    }
}
add_action('admin_enqueue_scripts', 'genz_clg_enqueue_admin_scripts');
