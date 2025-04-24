
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>

<body <?php body_class('bg-background text-foreground antialiased'); ?>>
<?php wp_body_open(); ?>

<div id="page" class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container mx-auto px-4">
            <div class="flex h-16 items-center justify-between">
                <div class="flex-1 flex items-center">
                    <?php
                    if (has_custom_logo()) {
                        the_custom_logo();
                    } else {
                        echo '<a href="' . esc_url(home_url('/')) . '" class="text-xl font-bold">';
                        bloginfo('name');
                        echo '</a>';
                    }
                    ?>
                </div>

                <nav id="site-navigation" class="hidden md:flex items-center space-x-4">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class'     => 'flex space-x-4',
                        'container'      => false,
                        'fallback_cb'    => false,
                    ));
                    ?>
                </nav>

                <div class="flex items-center space-x-4">
                    <?php if (is_user_logged_in()): ?>
                        <a href="<?php echo esc_url(wp_logout_url(home_url())); ?>" class="text-sm font-medium">
                            <?php _e('Logout', 'genz-modern'); ?>
                        </a>
                    <?php else: ?>
                        <a href="<?php echo esc_url(wp_login_url()); ?>" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            <?php _e('Login', 'genz-modern'); ?>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </header>

    <div id="content" class="flex-grow">
