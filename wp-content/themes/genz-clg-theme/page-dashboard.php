<?php
/**
 * Template Name: Dashboard
 *
 * This is the template that displays the dashboard page.
 */

// Redirect non-logged in users to the login page
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();

if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('single')) {
    // Elementor `single` location
} else {
    // Default dashboard content
    get_template_part('template-parts/content', 'dashboard');
}

get_footer();
