
<?php
/**
 * Asset enqueue functions
 */

if (!defined('ABSPATH')) {
    exit;
}

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
