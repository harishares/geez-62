
<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 */

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function genz_clg_pingback_header() {
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
    }
}
add_action('wp_head', 'genz_clg_pingback_header');

/**
 * Add custom classes to body based on page template and context
 */
function genz_clg_body_classes($classes) {
    // Add a class if we're in the customizer preview
    if (is_customize_preview()) {
        $classes[] = 'customizer-preview';
    }
    
    // Add class if we're viewing a singular item
    if (is_singular()) {
        $classes[] = 'viewing-singular';
    }
    
    // Add class for specific page templates
    if (is_page_template('page-dashboard.php')) {
        $classes[] = 'dashboard-page';
    } elseif (is_page_template('page-startup-hub.php')) {
        $classes[] = 'startup-hub-page';
    } elseif (is_page_template('page-law-education.php')) {
        $classes[] = 'law-education-page';
    } elseif (is_page_template('page-mentorship.php')) {
        $classes[] = 'mentorship-page';
    }
    
    return $classes;
}
add_filter('body_class', 'genz_clg_body_classes');

/**
 * Add custom classes to the navigation menu items
 */
function genz_clg_menu_item_classes($classes, $item) {
    if (in_array('current-menu-item', $classes)) {
        $classes[] = 'active';
    }
    
    if (in_array('menu-item-has-children', $classes)) {
        $classes[] = 'has-dropdown';
    }
    
    return $classes;
}
add_filter('nav_menu_css_class', 'genz_clg_menu_item_classes', 10, 2);

/**
 * Add custom classes to the anchor tags in the navigation menu
 */
function genz_clg_menu_link_attrs($atts, $item, $args) {
    if ($args->theme_location === 'primary') {
        $atts['class'] = isset($atts['class']) ? $atts['class'] . ' text-gray-800 hover:text-purple-600 font-medium' : 'text-gray-800 hover:text-purple-600 font-medium';
    }
    
    return $atts;
}
add_filter('nav_menu_link_attributes', 'genz_clg_menu_link_attrs', 10, 3);

/**
 * Modify the excerpt more text
 */
function genz_clg_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'genz_clg_excerpt_more');

/**
 * Set custom excerpt length
 */
function genz_clg_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'genz_clg_excerpt_length');

/**
 * Add dashboard capabilities to subscriber users
 */
function genz_clg_add_dashboard_caps() {
    $role = get_role('subscriber');
    if ($role) {
        $role->add_cap('read_startup_ideas');
        $role->add_cap('read_law_resources');
    }
}
add_action('after_setup_theme', 'genz_clg_add_dashboard_caps');

/**
 * Create custom dashboard pages during theme activation
 */
function genz_clg_create_pages() {
    // Only run once during theme activation
    if (get_option('genz_clg_theme_pages_created')) {
        return;
    }
    
    // Dashboard page
    $dashboard_page = array(
        'post_title'    => 'Dashboard',
        'post_content'  => '',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'post_name'     => 'dashboard',
        'page_template' => 'page-dashboard.php'
    );
    wp_insert_post($dashboard_page);
    
    // Startup Hub page
    $startup_hub_page = array(
        'post_title'    => 'Startup Hub',
        'post_content'  => '',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'post_name'     => 'startup-hub',
        'page_template' => 'page-startup-hub.php'
    );
    wp_insert_post($startup_hub_page);
    
    // Law Education page
    $law_education_page = array(
        'post_title'    => 'Law Education',
        'post_content'  => '',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'post_name'     => 'law-education',
        'page_template' => 'page-law-education.php'
    );
    wp_insert_post($law_education_page);
    
    // Mentorship page
    $mentorship_page = array(
        'post_title'    => 'Mentorship',
        'post_content'  => '',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'post_name'     => 'mentorship',
        'page_template' => 'page-mentorship.php'
    );
    wp_insert_post($mentorship_page);
    
    // Mark as completed
    update_option('genz_clg_theme_pages_created', true);
}
add_action('after_switch_theme', 'genz_clg_create_pages');

/**
 * Add Chart.js library for dashboard charts
 */
function genz_clg_enqueue_chartjs() {
    if (is_page_template('page-dashboard.php')) {
        wp_enqueue_script('chartjs', 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js', array(), '3.9.1', true);
        
        // Custom chart initialization
        wp_enqueue_script(
            'genz-clg-charts',
            GENZ_THEME_URI . '/assets/js/charts.js',
            array('chartjs', 'jquery'),
            GENZ_THEME_VERSION,
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'genz_clg_enqueue_chartjs');
