<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <?php 
    if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('header')) {
        // Elementor `header` location
    } else {
        // Default header
        get_template_part('template-parts/header', 'default');
    }
    ?>
    
    <div id="content" class="site-content">
