
    </div><!-- #content -->
    
    <?php 
    if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer')) {
        // Elementor `footer` location
    } else {
        // Default footer
        get_template_part('template-parts/footer', 'default');
    }
    ?>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
