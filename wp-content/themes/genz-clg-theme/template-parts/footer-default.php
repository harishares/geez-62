<footer id="colophon" class="site-footer bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="footer-widget">
                <h3 class="text-xl font-semibold mb-4">About GenZ CLG</h3>
                <p class="text-gray-300">
                    <?php echo get_theme_mod('footer_about_text', 'GenZ CLG is a platform dedicated to empowering entrepreneurs with legal knowledge and mentorship.'); ?>
                </p>
            </div>
            
            <div class="footer-widget">
                <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'footer',
                    'menu_id' => 'footer-menu',
                    'container' => false,
                    'menu_class' => 'footer-menu text-gray-300',
                    'fallback_cb' => false,
                ));
                ?>
            </div>
            
            <div class="footer-widget">
                <?php dynamic_sidebar('footer-1'); ?>
            </div>
        </div>
        
        <div class="border-t border-gray-700 mt-6 pt-6 text-sm text-gray-400">
            <div class="flex flex-col md:flex-row justify-between">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
                <div class="mt-2 md:mt-0">
                    <a href="<?php echo esc_url(get_privacy_policy_url()); ?>" class="hover:text-white">Privacy Policy</a>
                    <span class="mx-2">|</span>
                    <a href="<?php echo esc_url(home_url('/terms-of-service/')); ?>" class="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    </div>
</footer>
