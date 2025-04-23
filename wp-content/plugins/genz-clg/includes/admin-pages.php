<?php
/**
 * Admin Pages
 */

if (!defined('ABSPATH')) {
    exit;
}

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
