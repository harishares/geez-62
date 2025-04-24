
<?php
/**
 * Elementor integration functions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Add Elementor support
function genz_modern_add_elementor_support() {
    add_theme_support('elementor');
    add_theme_support('elementor-pro');
}
add_action('after_setup_theme', 'genz_modern_add_elementor_support');

// Add Elementor locations support
function genz_modern_register_elementor_locations($elementor_theme_manager) {
    $elementor_theme_manager->register_all_core_location();
}
add_action('elementor/theme/register_locations', 'genz_modern_register_elementor_locations');
