
<?php
/**
 * GenZ CLG Installation Handler
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Runs on plugin activation
 */
function genz_clg_activate() {
    // Create build directory if it doesn't exist
    if (!file_exists(GENZ_CLG_PLUGIN_DIR . 'build')) {
        mkdir(GENZ_CLG_PLUGIN_DIR . 'build', 0755);
        mkdir(GENZ_CLG_PLUGIN_DIR . 'build/static', 0755);
        mkdir(GENZ_CLG_PLUGIN_DIR . 'build/static/css', 0755);
        mkdir(GENZ_CLG_PLUGIN_DIR . 'build/static/js', 0755);
    }

    // Create a placeholder file for React build
    if (!file_exists(GENZ_CLG_PLUGIN_DIR . 'build/index.html')) {
        $placeholder_html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>GenZ CLG React App</title>
</head>
<body>
    <div id="root">
        <p>This is a placeholder for the React app build files.</p>
        <p>Please build your React app and copy the files to this directory.</p>
    </div>
</body>
</html>';
        file_put_contents(GENZ_CLG_PLUGIN_DIR . 'build/index.html', $placeholder_html);
    }

    // Set default options
    if (!get_option('genz_clg_primary_color')) {
        add_option('genz_clg_primary_color', '#8B5CF6');
    }

    if (!get_option('genz_clg_allow_registration')) {
        add_option('genz_clg_allow_registration', 1);
    }

    // Add a sample page with the shortcode if requested
    if (isset($_GET['create_sample']) && $_GET['create_sample'] == 1) {
        $page = array(
            'post_title'    => 'GenZ CLG App',
            'post_content'  => '[genz_clg]',
            'post_status'   => 'publish',
            'post_type'     => 'page',
        );
        wp_insert_post($page);
    }
}

/**
 * Display admin notice after activation
 */
function genz_clg_admin_notice() {
    global $pagenow;
    if ($pagenow == 'plugins.php' && isset($_GET['activate']) && $_GET['activate'] == 'true') {
        ?>
        <div class="updated notice is-dismissible">
            <p>Thank you for installing GenZ CLG! <a href="<?php echo admin_url('admin.php?page=genz-clg-settings'); ?>">Configure the plugin</a> or <a href="<?php echo admin_url('post-new.php?post_type=page&genz_clg_shortcode=1'); ?>">create a new page</a> with the app.</p>
        </div>
        <?php
    }

    // Add shortcode button to page editor
    if (($pagenow == 'post.php' || $pagenow == 'post-new.php') && isset($_GET['genz_clg_shortcode'])) {
        ?>
        <script>
            jQuery(document).ready(function($) {
                if (wp.data && wp.data.select('core/editor')) {
                    wp.data.dispatch('core/editor').insertBlocks(
                        wp.blocks.createBlock('core/shortcode', { 
                            text: '[genz_clg]' 
                        })
                    );
                }
            });
        </script>
        <?php
    }
}
add_action('admin_notices', 'genz_clg_admin_notice');
