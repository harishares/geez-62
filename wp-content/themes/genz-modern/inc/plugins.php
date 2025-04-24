
<?php
/**
 * Required plugins registration
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register Required Plugins
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
