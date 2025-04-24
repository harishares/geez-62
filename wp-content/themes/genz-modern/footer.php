
    </div><!-- #content -->

    <footer class="w-full border-t bg-card mt-auto">
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4"><?php bloginfo('name'); ?></h3>
                    <p class="text-muted-foreground">
                        <?php bloginfo('description'); ?>
                    </p>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold mb-4"><?php _e('Quick Links', 'genz-modern'); ?></h3>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class'     => 'space-y-2',
                        'container'      => false,
                        'fallback_cb'    => false,
                    ));
                    ?>
                </div>
                
                <div>
                    <?php dynamic_sidebar('footer-1'); ?>
                </div>
            </div>
            
            <div class="border-t mt-8 pt-8 text-sm text-muted-foreground">
                <div class="flex flex-col md:flex-row justify-between gap-4">
                    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e('All rights reserved.', 'genz-modern'); ?></p>
                    <div class="flex gap-4">
                        <a href="<?php echo esc_url(get_privacy_policy_url()); ?>" class="hover:text-foreground">
                            <?php _e('Privacy Policy', 'genz-modern'); ?>
                        </a>
                        <a href="<?php echo esc_url(home_url('/terms-of-service/')); ?>" class="hover:text-foreground">
                            <?php _e('Terms of Service', 'genz-modern'); ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
