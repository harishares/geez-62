
<?php
/**
 * Widget registration functions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register widget areas
function genz_modern_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'genz-modern'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in your sidebar.', 'genz-modern'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    register_sidebar(array(
        'name'          => __('Footer', 'genz-modern'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'genz-modern'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'genz_modern_widgets_init');
