<?php
/**
 * GenZ CLG Theme functions and definitions
 */

// Define constants
define('GENZ_THEME_VERSION', '1.0.0');
define('GENZ_THEME_DIR', get_template_directory());
define('GENZ_THEME_URI', get_template_directory_uri());

// Add Elementor support
function genz_clg_theme_add_elementor_support() {
    add_theme_support('elementor');
    add_theme_support('elementor-pro');
}
add_action('after_setup_theme', 'genz_clg_theme_add_elementor_support');

// Enqueue styles and scripts
function genz_clg_theme_enqueue_assets() {
    // Enqueue main stylesheet
    wp_enqueue_style(
        'genz-clg-main-style',
        GENZ_THEME_URI . '/assets/css/style.css',
        array(),
        GENZ_THEME_VERSION
    );
    
    // Enqueue Tailwind CSS
    wp_enqueue_style(
        'genz-clg-tailwind',
        GENZ_THEME_URI . '/assets/css/tailwind.css',
        array(),
        GENZ_THEME_VERSION
    );
    
    // Enqueue main JavaScript file
    wp_enqueue_script(
        'genz-clg-main-script',
        GENZ_THEME_URI . '/assets/js/main.js',
        array('jquery'),
        GENZ_THEME_VERSION,
        true
    );
    
    // Localize script with WordPress data
    wp_localize_script(
        'genz-clg-main-script',
        'genzClgData',
        array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'siteUrl' => site_url(),
            'themePath' => GENZ_THEME_URI,
            'nonce' => wp_create_nonce('genz_clg_nonce'),
            'isLoggedIn' => is_user_logged_in(),
            'userId' => get_current_user_id(),
            'settings' => array(
                'primaryColor' => get_option('genz_clg_primary_color', '#8B5CF6'),
                'logoUrl' => get_option('genz_clg_logo_url', ''),
            )
        )
    );
}
add_action('wp_enqueue_scripts', 'genz_clg_theme_enqueue_assets');

// Add Elementor locations support
function genz_clg_theme_register_elementor_locations($elementor_theme_manager) {
    $elementor_theme_manager->register_all_core_location();
}
add_action('elementor/theme/register_locations', 'genz_clg_theme_register_elementor_locations');

// Setup theme features
function genz_clg_theme_setup() {
    // Add theme support features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'genz-clg-theme'),
        'footer' => __('Footer Menu', 'genz-clg-theme'),
    ));
}
add_action('after_setup_theme', 'genz_clg_theme_setup');

// Register sidebar/widget areas
function genz_clg_theme_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'genz-clg-theme'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in your sidebar.', 'genz-clg-theme'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer', 'genz-clg-theme'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'genz-clg-theme'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'genz_clg_theme_widgets_init');

// Include theme components
require_once GENZ_THEME_DIR . '/inc/customizer.php';
require_once GENZ_THEME_DIR . '/inc/template-functions.php';
require_once GENZ_THEME_DIR . '/inc/dashboard-functions.php';
require_once GENZ_THEME_DIR . '/inc/startup-hub-functions.php';
require_once GENZ_THEME_DIR . '/inc/mentorship-functions.php';
require_once GENZ_THEME_DIR . '/inc/law-education-functions.php';

// Create custom post types
function genz_clg_register_post_types() {
    // Startup Ideas Custom Post Type
    register_post_type('startup_idea', array(
        'labels' => array(
            'name' => __('Startup Ideas', 'genz-clg-theme'),
            'singular_name' => __('Startup Idea', 'genz-clg-theme'),
            'add_new' => __('Add New', 'genz-clg-theme'),
            'add_new_item' => __('Add New Startup Idea', 'genz-clg-theme'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon' => 'dashicons-lightbulb',
        'show_in_rest' => true,
    ));
    
    // Mentors Custom Post Type
    register_post_type('mentor', array(
        'labels' => array(
            'name' => __('Mentors', 'genz-clg-theme'),
            'singular_name' => __('Mentor', 'genz-clg-theme'),
            'add_new' => __('Add New', 'genz-clg-theme'),
            'add_new_item' => __('Add New Mentor', 'genz-clg-theme'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon' => 'dashicons-businessperson',
        'show_in_rest' => true,
    ));
    
    // Law Resources Custom Post Type
    register_post_type('law_resource', array(
        'labels' => array(
            'name' => __('Law Resources', 'genz-clg-theme'),
            'singular_name' => __('Law Resource', 'genz-clg-theme'),
            'add_new' => __('Add New', 'genz-clg-theme'),
            'add_new_item' => __('Add New Law Resource', 'genz-clg-theme'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon' => 'dashicons-book-alt',
        'show_in_rest' => true,
    ));
}
add_action('init', 'genz_clg_register_post_types');

// Register taxonomies
function genz_clg_register_taxonomies() {
    // Startup Categories
    register_taxonomy('startup_category', 'startup_idea', array(
        'labels' => array(
            'name' => __('Categories', 'genz-clg-theme'),
            'singular_name' => __('Category', 'genz-clg-theme'),
        ),
        'hierarchical' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
    ));
    
    // Mentor Specialties
    register_taxonomy('mentor_specialty', 'mentor', array(
        'labels' => array(
            'name' => __('Specialties', 'genz-clg-theme'),
            'singular_name' => __('Specialty', 'genz-clg-theme'),
        ),
        'hierarchical' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
    ));
    
    // Law Resource Types
    register_taxonomy('law_resource_type', 'law_resource', array(
        'labels' => array(
            'name' => __('Resource Types', 'genz-clg-theme'),
            'singular_name' => __('Resource Type', 'genz-clg-theme'),
        ),
        'hierarchical' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
    ));
}
add_action('init', 'genz_clg_register_taxonomies');
