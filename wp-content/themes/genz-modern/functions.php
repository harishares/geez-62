<?php
/**
 * GenZ Modern Theme functions and definitions
 */

// Define theme constants
define('GENZ_MODERN_VERSION', '1.0.0');
define('GENZ_MODERN_DIR', get_template_directory());
define('GENZ_MODERN_URI', get_template_directory_uri());

// Theme setup
function genz_modern_setup() {
    // Add default posts and comments RSS feed links
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Register menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'genz-modern'),
        'footer'  => __('Footer Menu', 'genz-modern')
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));

    // Add theme support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-width'  => true,
        'flex-height' => true
    ));

    // Add support for full and wide align images
    add_theme_support('align-wide');

    // Add support for responsive embeds
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'genz_modern_setup');

// Add Elementor support
function genz_modern_add_elementor_support() {
    add_theme_support('elementor');
    add_theme_support('elementor-pro');
}
add_action('after_setup_theme', 'genz_modern_add_elementor_support');

// Enqueue scripts and styles
function genz_modern_enqueue_assets() {
    // Enqueue main stylesheet
    wp_enqueue_style(
        'genz-modern-style',
        get_stylesheet_uri(),
        array(),
        GENZ_MODERN_VERSION
    );
    
    // Enqueue Tailwind CSS
    wp_enqueue_style(
        'genz-modern-tailwind',
        GENZ_MODERN_URI . '/assets/css/tailwind.css',
        array(),
        GENZ_MODERN_VERSION
    );

    // Enqueue theme JavaScript
    wp_enqueue_script(
        'genz-modern-script',
        GENZ_MODERN_URI . '/assets/js/main.js',
        array('jquery'),
        GENZ_MODERN_VERSION,
        true
    );

    // Add dynamic data to JavaScript
    wp_localize_script(
        'genz-modern-script',
        'genzModernData',
        array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('genz_modern_nonce')
        )
    );
}
add_action('wp_enqueue_scripts', 'genz_modern_enqueue_assets');

// Register widget areas
function genz_modern_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'genz-modern'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in your sidebar.', 'genz-modern'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    register_sidebar(array(
        'name'          => __('Footer', 'genz-modern'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'genz-modern'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'genz_modern_widgets_init');

// Register Required Plugins
require_once get_template_directory() . '/inc/tgm/class-tgm-plugin-activation.php';

function genz_modern_register_required_plugins() {
    $plugins = array(
        array(
            'name'      => 'Elementor',
            'slug'      => 'elementor',
            'required'  => true,
        ),
        array(
            'name'      => 'Elementor Pro',
            'slug'      => 'elementor-pro',
            'required'  => false,
        ),
        array(
            'name'      => 'Contact Form 7',
            'slug'      => 'contact-form-7',
            'required'  => true,
        ),
        array(
            'name'      => 'Custom Post Type UI',
            'slug'      => 'custom-post-type-ui',
            'required'  => true,
        ),
        array(
            'name'      => 'Advanced Custom Fields',
            'slug'      => 'advanced-custom-fields',
            'required'  => true,
        ),
    );

    $config = array(
        'id'           => 'genz-modern',
        'default_path' => '',
        'menu'         => 'tgmpa-install-plugins',
        'parent_slug'  => 'themes.php',
        'capability'   => 'edit_theme_options',
        'has_notices'  => true,
        'dismissable'  => false,
        'dismiss_msg'  => '',
        'is_automatic' => true,
    );

    tgmpa($plugins, $config);
}
add_action('tgmpa_register', 'genz_modern_register_required_plugins');

// Add Elementor locations support
function genz_modern_register_elementor_locations($elementor_theme_manager) {
    $elementor_theme_manager->register_all_core_location();
}
add_action('elementor/theme/register_locations', 'genz_modern_register_elementor_locations');
