
<?php
/**
 * REST API functionality
 */

if (!defined('ABSPATH')) {
    exit;
}

function genz_clg_register_rest_routes() {
    register_rest_route('genz-clg/v1', '/settings', array(
        'methods' => 'GET',
        'callback' => 'genz_clg_get_settings',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
    
    register_rest_route('genz-clg/v1', '/public', array(
        'methods' => 'GET',
        'callback' => 'genz_clg_get_public_data',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'genz_clg_register_rest_routes');

function genz_clg_get_settings() {
    return array(
        'primary_color' => get_option('genz_clg_primary_color', '#8B5CF6'),
        'logo_url' => get_option('genz_clg_logo_url', ''),
        'allow_registration' => get_option('genz_clg_allow_registration', true)
    );
}

function genz_clg_get_public_data() {
    return array(
        'site_name' => get_bloginfo('name'),
        'site_description' => get_bloginfo('description'),
        'primary_color' => get_option('genz_clg_primary_color', '#8B5CF6')
    );
}
