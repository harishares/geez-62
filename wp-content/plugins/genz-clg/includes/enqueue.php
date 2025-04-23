
<?php
/**
 * Script and Style Enqueuing
 */

if (!defined('ABSPATH')) {
    exit;
}

function genz_clg_enqueue_assets() {
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'genz_clg')) {
        wp_enqueue_style(
            'genz-clg-styles',
            GENZ_CLG_PLUGIN_URL . 'assets/css/genz-clg.css',
            array(),
            GENZ_CLG_VERSION
        );

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
