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
require_once GENZ_CLG_PLUGIN_DIR . 'includes/dashboard-widget.php';

// Register activation hook
register_activation_hook(__FILE__, 'genz_clg_activate');

// Enqueue scripts and styles
function genz_clg_enqueue_assets() {
    // Only enqueue scripts if the shortcode is used on the page
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'genz_clg')) {
        // First enqueue our plugin's CSS
        wp_enqueue_style(
            'genz-clg-styles',
            GENZ_CLG_PLUGIN_URL . 'assets/css/genz-clg.css',
            array(),
            GENZ_CLG_VERSION
        );

        // Get all CSS files from the build directory
        $css_files = glob(GENZ_CLG_PLUGIN_DIR . 'build/static/css/*.css');
        if ($css_files) {
            foreach ($css_files as $css_file) {
                $filename = basename($css_file);
                wp_enqueue_style(
                    'genz-clg-react-' . $filename,
                    GENZ_CLG_PLUGIN_URL . 'build/static/css/' . $filename,
                    array('genz-clg-styles'),
                    GENZ_CLG_VERSION
                );
            }
        }

        // Get all JS files from the build directory
        $js_files = glob(GENZ_CLG_PLUGIN_DIR . 'build/static/js/*.js');
        if ($js_files) {
            foreach ($js_files as $js_file) {
                $filename = basename($js_file);
                wp_enqueue_script(
                    'genz-clg-script-' . $filename,
                    GENZ_CLG_PLUGIN_URL . 'build/static/js/' . $filename,
                    array('jquery'),
                    GENZ_CLG_VERSION,
                    true
                );
            }
        }

        // Pass WordPress data to React
        $first_js_file = $js_files ? 'genz-clg-script-' . basename($js_files[0]) : 'genz-clg-script';
        
        wp_localize_script($first_js_file, 'wpData', array(
            'restUrl' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'userId' => get_current_user_id(),
            'isLoggedIn' => is_user_logged_in(),
            'siteUrl' => get_site_url(),
            'pluginUrl' => GENZ_CLG_PLUGIN_URL,
            'adminEmail' => get_option('admin_email'),
            'siteName' => get_bloginfo('name'),
            'settings' => array(
                'customColor' => get_option('genz_clg_primary_color', '#8B5CF6'), 
                'logoUrl' => get_option('genz_clg_logo_url', ''),
                'allowRegistration' => get_option('genz_clg_allow_registration', true)
            )
        ));
    }
}
add_action('wp_enqueue_scripts', 'genz_clg_enqueue_assets');

// Register shortcode to embed the app
function genz_clg_app_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'page' => 'dashboard',
        'height' => 'auto',
        'class' => '',
        'width' => '100%'
    ), $atts);

    $container_style = sprintf(
        'height: %s; width: %s; margin: 0 auto;',
        esc_attr($attributes['height']),
        esc_attr($attributes['width'])
    );

    $container_class = 'genz-clg-container ' . esc_attr($attributes['class']);
    
    $output = '<div class="' . $container_class . '" style="' . $container_style . '">';
    
    // Add loading indicator
    $output .= '<div class="genz-clg-loading">';
    $output .= '<div class="genz-clg-loading-spinner"></div>';
    $output .= '</div>';
    
    // Add root element for React
    $output .= '<div id="genz-clg-root" data-page="' . esc_attr($attributes['page']) . '" style="display: none;"></div>';
    
    // Add inline script to show the app and hide loader when React loads
    $output .= '<script>
        document.addEventListener("DOMContentLoaded", function() {
            // Wait for React to initialize
            var checkReactInterval = setInterval(function() {
                if (document.querySelector("#genz-clg-root > div")) {
                    document.querySelector("#genz-clg-root").style.display = "block";
                    document.querySelector(".genz-clg-loading").style.display = "none";
                    clearInterval(checkReactInterval);
                }
            }, 100);
            
            // Fallback if React doesn\'t load within 5 seconds
            setTimeout(function() {
                clearInterval(checkReactInterval);
                if (!document.querySelector("#genz-clg-root > div")) {
                    document.querySelector(".genz-clg-loading").innerHTML = "<p>Failed to load the application. Please refresh the page or contact support.</p>";
                }
            }, 5000);
        });
    </script>';
    
    $output .= '</div>';
    
    return $output;
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

// Register plugin settings
function genz_clg_register_settings() {
    register_setting('genz_clg_settings', 'genz_clg_primary_color');
    register_setting('genz_clg_settings', 'genz_clg_logo_url');
    register_setting('genz_clg_settings', 'genz_clg_allow_registration');
}
add_action('admin_init', 'genz_clg_register_settings');

// Create the settings page
function genz_clg_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        
        <div class="notice notice-info">
            <p>Use the shortcode <code>[genz_clg]</code> to embed the GenZ CLG app in any page or post.</p>
        </div>
        
        <form method="post" action="options.php">
            <?php settings_fields('genz_clg_settings'); ?>
            <?php do_settings_sections('genz_clg_settings'); ?>
            
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Primary Color</th>
                    <td>
                        <input type="color" name="genz_clg_primary_color" value="<?php echo esc_attr(get_option('genz_clg_primary_color', '#8B5CF6')); ?>" />
                        <p class="description">Choose the primary color for the app interface</p>
                    </td>
                </tr>
                
                <tr valign="top">
                    <th scope="row">Logo URL</th>
                    <td>
                        <input type="text" name="genz_clg_logo_url" class="regular-text" value="<?php echo esc_url(get_option('genz_clg_logo_url', '')); ?>" />
                        <button type="button" class="button-secondary" id="genz-clg-media-button">Select Image</button>
                        <p class="description">Upload or select a logo for the app</p>
                    </td>
                </tr>
                
                <tr valign="top">
                    <th scope="row">Allow Registration</th>
                    <td>
                        <input type="checkbox" name="genz_clg_allow_registration" value="1" <?php checked(1, get_option('genz_clg_allow_registration', 1)); ?> />
                        <p class="description">Allow new users to register through the app</p>
                    </td>
                </tr>
            </table>
            
            <?php submit_button(); ?>
        </form>
        
        <hr />
        
        <h2>Shortcode Options</h2>
        <p>The GenZ CLG app can be embedded using these shortcode parameters:</p>
        <ul style="list-style-type: disc; margin-left: 2em;">
            <li><code>[genz_clg]</code> - Basic usage</li>
            <li><code>[genz_clg page="dashboard"]</code> - Specify the initial page</li>
            <li><code>[genz_clg height="800px"]</code> - Set container height</li>
            <li><code>[genz_clg class="my-custom-class"]</code> - Add custom CSS class</li>
        </ul>
        
        <hr />
        
        <h2>React App Management</h2>
        <p>The React app should be built and copied to the <code><?php echo GENZ_CLG_PLUGIN_DIR; ?>build</code> directory.</p>
        
        <?php if (file_exists(GENZ_CLG_PLUGIN_DIR . 'build/static/js')): ?>
            <?php $js_files = glob(GENZ_CLG_PLUGIN_DIR . 'build/static/js/*.js'); ?>
            <?php if ($js_files): ?>
                <div class="notice notice-success inline">
                    <p>✅ React app is correctly installed.</p>
                </div>
            <?php else: ?>
                <div class="notice notice-warning inline">
                    <p>⚠️ React app JavaScript files are missing.</p>
                </div>
            <?php endif; ?>
        <?php else: ?>
            <div class="notice notice-error inline">
                <p>❌ React app build directory structure is incomplete.</p>
            </div>
        <?php endif; ?>
    </div>
    
    <script>
    jQuery(document).ready(function($) {
        $('#genz-clg-media-button').click(function(e) {
            e.preventDefault();
            var image = wp.media({ 
                title: 'Upload Logo',
                multiple: false
            }).open()
            .on('select', function(e){
                var uploaded_image = image.state().get('selection').first();
                var image_url = uploaded_image.toJSON().url;
                $('input[name="genz_clg_logo_url"]').val(image_url);
            });
        });
    });
    </script>
    <?php
}

// Create the documentation page
function genz_clg_docs_page() {
    ?>
    <div class="wrap">
        <h1>GenZ CLG Documentation</h1>
        
        <div class="card">
            <h2>Getting Started</h2>
            <p>The GenZ CLG plugin embeds a React application into your WordPress site. Follow these steps to get started:</p>
            <ol>
                <li>Configure the plugin settings under the GenZ CLG menu</li>
                <li>Add the <code>[genz_clg]</code> shortcode to any page or post where you want the app to appear</li>
                <li>Customize the shortcode parameters as needed</li>
            </ol>
        </div>
        
        <div class="card">
            <h2>Integration with WordPress</h2>
            <p>Your React app can access WordPress data through the global <code>wpData</code> object:</p>
            <pre style="background: #f5f5f5; padding: 10px; border: 1px solid #ddd; overflow: auto;">
// In your React component
const wpData = window.wpData;
console.log(wpData.userId); // Current user ID
console.log(wpData.restUrl); // WordPress REST API URL
console.log(wpData.settings.customColor); // Custom settings
            </pre>
        </div>
        
        <div class="card">
            <h2>REST API Integration</h2>
            <p>To interact with WordPress data, use the REST API with proper authentication:</p>
            <pre style="background: #f5f5f5; padding: 10px; border: 1px solid #ddd; overflow: auto;">
// Example API call from React
fetch(`${window.wpData.restUrl}wp/v2/posts`, {
    headers: {
        'X-WP-Nonce': window.wpData.nonce,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(posts => console.log(posts));
            </pre>
        </div>
        
        <div class="card">
            <h2>Build Process</h2>
            <p>To deploy your React app to the WordPress plugin:</p>
            <ol>
                <li>In your React project, build the app: <code>npm run build</code></li>
                <li>Copy the build files to the <code><?php echo GENZ_CLG_PLUGIN_DIR; ?>build</code> directory</li>
                <li>The plugin will automatically load the React app when the shortcode is used</li>
            </ol>
            <p>For automated deployment, consider setting up a script that builds your React app and copies it to the WordPress plugin directory.</p>
        </div>
        
        <div class="card">
            <h2>Theming</h2>
            <p>The plugin passes WordPress settings to your React app. To apply custom colors:</p>
            <pre style="background: #f5f5f5; padding: 10px; border: 1px solid #ddd; overflow: auto;">
// In your React component
const primaryColor = window.wpData.settings.customColor;
const logoUrl = window.wpData.settings.logoUrl;

// Use these variables in your styles
const buttonStyle = {
  backgroundColor: primaryColor,
  // other styles...
};
            </pre>
        </div>
    </div>
    <?php
}

// Register custom REST API endpoints
function genz_clg_register_rest_routes() {
    register_rest_route('genz-clg/v1', '/settings', array(
        'methods' => 'GET',
        'callback' => 'genz_clg_get_settings',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
    
    // Add endpoint to get public data that doesn't require authentication
    register_rest_route('genz-clg/v1', '/public', array(
        'methods' => 'GET',
        'callback' => 'genz_clg_get_public_data',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'genz_clg_register_rest_routes');

// Callback for settings endpoint
function genz_clg_get_settings() {
    return array(
        'primary_color' => get_option('genz_clg_primary_color', '#8B5CF6'),
        'logo_url' => get_option('genz_clg_logo_url', ''),
        'allow_registration' => get_option('genz_clg_allow_registration', true)
    );
}

// Callback for public data endpoint
function genz_clg_get_public_data() {
    return array(
        'site_name' => get_bloginfo('name'),
        'site_description' => get_bloginfo('description'),
        'primary_color' => get_option('genz_clg_primary_color', '#8B5CF6')
    );
}

// Add settings link on plugin page
function genz_clg_add_settings_link($links) {
    $settings_link = '<a href="admin.php?page=genz-clg-settings">' . __('Settings', 'genz-clg') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
}
$plugin = plugin_basename(__FILE__);
add_filter("plugin_action_links_$plugin", 'genz_clg_add_settings_link');

// Add custom admin styles
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

// Load WP Media scripts for the admin
function genz_clg_enqueue_admin_scripts($hook) {
    if (strpos($hook, 'genz-clg') !== false) {
        wp_enqueue_media();
    }
}
add_action('admin_enqueue_scripts', 'genz_clg_enqueue_admin_scripts');

?>
