
<?php
/**
 * The sidebar containing the main widget area
 */

if (!is_active_sidebar('sidebar-1')) {
    return;
}
?>

<aside id="secondary" class="widget-area">
    <?php dynamic_sidebar('sidebar-1'); ?>
    
    <!-- Quick Actions Widget -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-bold mb-3">Quick Actions</h3>
        <ul class="space-y-2">
            <li>
                <a href="<?php echo esc_url(home_url('/dashboard/')); ?>" class="flex items-center text-gray-700 hover:text-purple-600">
                    <span class="mr-2">📊</span> My Dashboard
                </a>
            </li>
            <li>
                <a href="<?php echo esc_url(home_url('/startup-hub/')); ?>" class="flex items-center text-gray-700 hover:text-purple-600">
                    <span class="mr-2">💡</span> Browse Startups
                </a>
            </li>
            <li>
                <a href="<?php echo esc_url(home_url('/law-education/')); ?>" class="flex items-center text-gray-700 hover:text-purple-600">
                    <span class="mr-2">📚</span> Law Resources
                </a>
            </li>
            <li>
                <a href="<?php echo esc_url(home_url('/mentorship/')); ?>" class="flex items-center text-gray-700 hover:text-purple-600">
                    <span class="mr-2">👨‍🏫</span> Find a Mentor
                </a>
            </li>
        </ul>
    </div>
    
    <!-- Latest Posts Widget -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-bold mb-3">Latest Posts</h3>
        <ul class="space-y-3">
            <?php
            $latest_posts = get_posts(array(
                'posts_per_page' => 5,
            ));
            
            foreach ($latest_posts as $post) :
                setup_postdata($post);
            ?>
                <li>
                    <a href="<?php the_permalink(); ?>" class="text-gray-700 hover:text-purple-600">
                        <?php the_title(); ?>
                    </a>
                    <div class="text-xs text-gray-500 mt-1">
                        <?php echo get_the_date(); ?>
                    </div>
                </li>
            <?php
            endforeach;
            wp_reset_postdata();
            ?>
        </ul>
    </div>
    
    <!-- Newsletter Signup Widget -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-bold mb-3">Stay Updated</h3>
        <p class="text-sm text-gray-600 mb-3">Subscribe to our newsletter for the latest updates.</p>
        
        <form class="newsletter-form">
            <div class="mb-3">
                <input type="email" placeholder="Your email address" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" required>
            </div>
            <button type="submit" class="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                Subscribe
            </button>
        </form>
    </div>
</aside>
