
<?php
/**
 * GenZ CLG Theme Customizer
 */

/**
 * Register customizer settings
 */
function genz_clg_customize_register($wp_customize) {
    // Add sections
    $wp_customize->add_section('genz_clg_theme_general', array(
        'title'    => __('GenZ CLG Theme Settings', 'genz-clg-theme'),
        'priority' => 30,
    ));
    
    $wp_customize->add_section('genz_clg_theme_dashboard', array(
        'title'    => __('Dashboard Settings', 'genz-clg-theme'),
        'priority' => 31,
    ));
    
    $wp_customize->add_section('genz_clg_theme_footer', array(
        'title'    => __('Footer Settings', 'genz-clg-theme'),
        'priority' => 32,
    ));
    
    // General Settings
    $wp_customize->add_setting('primary_color', array(
        'default'           => '#8B5CF6',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'primary_color', array(
        'label'    => __('Primary Color', 'genz-clg-theme'),
        'section'  => 'genz_clg_theme_general',
        'settings' => 'primary_color',
    )));
    
    // Footer About Text
    $wp_customize->add_setting('footer_about_text', array(
        'default'           => 'GenZ CLG is a platform dedicated to empowering entrepreneurs with legal knowledge and mentorship.',
        'sanitize_callback' => 'wp_kses_post',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control('footer_about_text', array(
        'label'    => __('Footer About Text', 'genz-clg-theme'),
        'section'  => 'genz_clg_theme_footer',
        'settings' => 'footer_about_text',
        'type'     => 'textarea',
    ));
    
    // Dashboard Welcome Message
    $wp_customize->add_setting('dashboard_welcome', array(
        'default'           => 'Welcome to your GenZ CLG Dashboard',
        'sanitize_callback' => 'wp_kses_post',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control('dashboard_welcome', array(
        'label'    => __('Dashboard Welcome Message', 'genz-clg-theme'),
        'section'  => 'genz_clg_theme_dashboard',
        'settings' => 'dashboard_welcome',
        'type'     => 'text',
    ));
}
add_action('customize_register', 'genz_clg_customize_register');

/**
 * Generate inline CSS from customizer settings
 */
function genz_clg_customizer_css() {
    $primary_color = get_theme_mod('primary_color', '#8B5CF6');
    ?>
    <style type="text/css">
        /* Primary color customizations */
        a:hover,
        .site-title a:hover,
        .entry-title a:hover {
            color: <?php echo esc_attr($primary_color); ?>;
        }
        
        .bg-primary,
        .btn-primary,
        button.primary,
        .pagination .current,
        .widget_calendar caption {
            background-color: <?php echo esc_attr($primary_color); ?>;
        }
        
        .border-primary {
            border-color: <?php echo esc_attr($primary_color); ?>;
        }
        
        .text-primary {
            color: <?php echo esc_attr($primary_color); ?>;
        }
        
        /* Additional customizations based on primary color */
        .dashboard-nav a.active,
        .dashboard-nav a:hover {
            background-color: <?php echo esc_attr($primary_color); ?>;
            color: #ffffff;
        }
    </style>
    <?php
}
add_action('wp_head', 'genz_clg_customizer_css');
