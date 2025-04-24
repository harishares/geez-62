
<?php
/**
 * GenZ Modern Theme functions and definitions
 */

// Define theme constants
define('GENZ_MODERN_VERSION', '1.0.0');
define('GENZ_MODERN_DIR', get_template_directory());
define('GENZ_MODERN_URI', get_template_directory_uri());

// Include TGM Plugin Activation
require_once get_template_directory() . '/inc/tgm/class-tgm-plugin-activation.php';

// Include theme files
require_once GENZ_MODERN_DIR . '/inc/theme-setup.php';
require_once GENZ_MODERN_DIR . '/inc/elementor-support.php';
require_once GENZ_MODERN_DIR . '/inc/assets.php';
require_once GENZ_MODERN_DIR . '/inc/widgets.php';
require_once GENZ_MODERN_DIR . '/inc/plugins.php';
