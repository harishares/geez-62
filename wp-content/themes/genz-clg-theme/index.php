
<?php get_header(); ?>

<main id="main" class="site-main py-8">
    <?php
    if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('archive')) {
        // Elementor `archive` location
    } else {
        // Default archive layout
        get_template_part('template-parts/content', 'archive');
    }
    ?>
</main>

<?php get_footer(); ?>
