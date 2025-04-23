
<?php
/**
 * Plugin Name: GenZ CLG React App
 * Description: Embeds the GenZ CLG React application in WordPress pages using shortcodes
 * Version: 1.0.0
 * Author: GenZ CLG Team
 * Text Domain: genz-clg
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('GENZ_CLG_VERSION', '1.0.0');
define('GENZ_CLG_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('GENZ_CLG_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once GENZ_CLG_PLUGIN_DIR . 'includes/install.php';
require_once GENZ_CLG_PLUGIN_DIR . 'includes/enqueue.php';
require_once GENZ_CLG_PLUGIN_DIR . 'includes/shortcodes.php';
require_once GENZ_CLG_PLUGIN_DIR . 'includes/admin.php';
require_once GENZ_CLG_PLUGIN_DIR . 'includes/admin-pages.php';
require_once GENZ_CLG_PLUGIN_DIR . 'includes/rest-api.php';
require_once GENZ_CLG_PLUGIN_DIR . 'includes/dashboard-widget.php';

// Register activation hook
register_activation_hook(__FILE__, 'genz_clg_activate');

// Add settings link on plugin page
$plugin = plugin_basename(__FILE__);
add_filter("plugin_action_links_$plugin", 'genz_clg_add_settings_link');
