<header id="masthead" class="site-header bg-white shadow-md">
    <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
            <div class="flex items-center">
                <?php 
                $custom_logo_id = get_theme_mod('custom_logo');
                $logo_url = get_option('genz_clg_logo_url', '');
                
                if ($logo_url) {
                    echo '<a href="' . esc_url(home_url('/')) . '" class="site-logo">';
                    echo '<img src="' . esc_url($logo_url) . '" alt="' . get_bloginfo('name') . '" class="h-10">';
                    echo '</a>';
                } elseif ($custom_logo_id) {
                    echo '<a href="' . esc_url(home_url('/')) . '" class="site-logo">';
                    echo wp_get_attachment_image($custom_logo_id, 'full', false, array('class' => 'h-10'));
                    echo '</a>';
                } else {
                    echo '<a href="' . esc_url(home_url('/')) . '" class="text-xl font-bold text-gray-800">';
                    echo get_bloginfo('name');
                    echo '</a>';
                }
                ?>
            </div>
            
            <nav id="site-navigation" class="main-navigation hidden md:block">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id' => 'primary-menu',
                    'container' => false,
                    'menu_class' => 'flex space-x-6',
                ));
                ?>
            </nav>
            
            <div class="flex items-center">
                <?php if (is_user_logged_in()): ?>
                    <a href="<?php echo esc_url(home_url('/dashboard/')); ?>" class="px-4 py-2 mr-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                        Dashboard
                    </a>
                    <a href="<?php echo esc_url(wp_logout_url(home_url())); ?>" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                        Logout
                    </a>
                <?php else: ?>
                    <a href="<?php echo esc_url(wp_login_url()); ?>" class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                        Login
                    </a>
                <?php endif; ?>
                
                <button id="mobile-menu-toggle" class="ml-4 p-2 md:hidden">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <div id="mobile-menu" class="hidden mt-4 md:hidden">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_id' => 'mobile-primary-menu',
                'container' => false,
                'menu_class' => 'space-y-2',
            ));
            ?>
        </div>
    </div>
</header>
