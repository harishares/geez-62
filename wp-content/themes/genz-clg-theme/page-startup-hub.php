
<?php
/**
 * Template Name: Startup Hub
 *
 * This is the template that displays the Startup Hub page.
 */

// Redirect non-logged in users to the login page
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();
?>

<div class="startup-hub-wrapper bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row">
            <!-- Sidebar Navigation -->
            <div class="dashboard-sidebar w-full md:w-64 bg-white rounded-lg shadow-md p-4 mb-6 md:mb-0 md:mr-6">
                <h2 class="text-xl font-bold mb-4">Dashboard</h2>
                
                <nav class="dashboard-nav">
                    <ul>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/dashboard/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">📊</span> Overview
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/startup-hub/')); ?>" class="block px-4 py-2 rounded-md bg-purple-100 text-purple-700 font-medium">
                                <span class="mr-2">💡</span> Startup Hub
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/law-education/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">📚</span> Law Education
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/mentorship/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">👨‍🏫</span> Mentorship
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/networking/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">🔄</span> Networking
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/tasks/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">✅</span> Daily Tasks
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/settings/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">⚙️</span> Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <!-- Main Content -->
            <div class="startup-hub-content flex-grow">
                <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 class="text-2xl font-bold">Startup Hub</h1>
                        <button id="new-startup-idea-btn" class="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                            New Startup Idea
                        </button>
                    </div>
                    
                    <!-- Filters -->
                    <div class="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-medium mb-2">Filter Startup Ideas</h3>
                        <form class="startup-filters grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select id="category" name="category" class="w-full border border-gray-300 rounded-md px-3 py-2">
                                    <option value="">All Categories</option>
                                    <?php
                                    $categories = get_terms(array(
                                        'taxonomy' => 'startup_category',
                                        'hide_empty' => false,
                                    ));
                                    
                                    if (!is_wp_error($categories)) {
                                        foreach ($categories as $category) {
                                            echo '<option value="' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</option>';
                                        }
                                    }
                                    ?>
                                </select>
                            </div>
                            
                            <div>
                                <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                <select id="sort" name="sort" class="w-full border border-gray-300 rounded-md px-3 py-2">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="a-z">A-Z</option>
                                    <option value="z-a">Z-A</option>
                                </select>
                            </div>
                            
                            <div>
                                <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <input type="text" id="search" name="search" placeholder="Search ideas..." class="w-full border border-gray-300 rounded-md px-3 py-2">
                            </div>
                        </form>
                    </div>
                    
                    <!-- Startup Ideas List -->
                    <div class="startup-ideas-list">
                        <?php
                        $args = array(
                            'post_type' => 'startup_idea',
                            'posts_per_page' => 10,
                        );
                        
                        $query = new WP_Query($args);
                        
                        if ($query->have_posts()) :
                            while ($query->have_posts()) : $query->the_post();
                                $categories = get_the_terms(get_the_ID(), 'startup_category');
                                $category_name = is_array($categories) && !empty($categories) ? $categories[0]->name : 'Uncategorized';
                                $likes = get_post_meta(get_the_ID(), 'startup_likes', true) ?: '0';
                                $comments = get_comments_number();
                        ?>
                            <div class="startup-idea-card border border-gray-200 rounded-lg mb-4 overflow-hidden">
                                <div class="p-5">
                                    <div class="flex justify-between items-start mb-3">
                                        <h3 class="text-lg font-bold">
                                            <a href="<?php the_permalink(); ?>" class="hover:text-purple-600">
                                                <?php the_title(); ?>
                                            </a>
                                        </h3>
                                        <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            <?php echo esc_html($category_name); ?>
                                        </span>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <?php the_excerpt(); ?>
                                    </div>
                                    
                                    <div class="flex justify-between text-sm text-gray-500">
                                        <div class="flex items-center">
                                            <?php echo get_avatar(get_the_author_meta('ID'), 24, '', '', array('class' => 'mr-2 rounded-full')); ?>
                                            <?php the_author(); ?>
                                        </div>
                                        <div>
                                            <span class="mr-3">
                                                <span class="mr-1">👍</span> <?php echo esc_html($likes); ?>
                                            </span>
                                            <span>
                                                <span class="mr-1">💬</span> <?php echo esc_html($comments); ?>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php
                            endwhile;
                            wp_reset_postdata();
                            
                            // Pagination
                            echo '<div class="pagination flex justify-center mt-6">';
                            echo paginate_links(array(
                                'total' => $query->max_num_pages,
                                'prev_text' => '&laquo; Previous',
                                'next_text' => 'Next &raquo;',
                            ));
                            echo '</div>';
                        else :
                        ?>
                            <div class="text-center py-12">
                                <p class="text-lg text-gray-600 mb-4">No startup ideas found.</p>
                                <p>Be the first to share your idea!</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- New Startup Idea Modal -->
<div id="startup-idea-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="relative bg-white rounded-lg max-w-lg w-full p-6">
            <h2 class="text-xl font-bold mb-4">New Startup Idea</h2>
            
            <form id="new-startup-form" method="post" action="<?php echo admin_url('admin-ajax.php'); ?>">
                <?php wp_nonce_field('submit_startup_idea', 'startup_idea_nonce'); ?>
                <input type="hidden" name="action" value="submit_startup_idea">
                
                <div class="mb-4">
                    <label for="startup_title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" id="startup_title" name="startup_title" required class="w-full border border-gray-300 rounded-md px-3 py-2">
                </div>
                
                <div class="mb-4">
                    <label for="startup_category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="startup_category" name="startup_category" required class="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option value="">Select Category</option>
                        <?php
                        if (!is_wp_error($categories)) {
                            foreach ($categories as $category) {
                                echo '<option value="' . esc_attr($category->term_id) . '">' . esc_html($category->name) . '</option>';
                            }
                        }
                        ?>
                    </select>
                </div>
                
                <div class="mb-4">
                    <label for="startup_description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="startup_description" name="startup_description" rows="5" required class="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                </div>
                
                <div class="flex justify-end space-x-3">
                    <button type="button" id="close-modal-btn" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('startup-idea-modal');
    const newIdeaBtn = document.getElementById('new-startup-idea-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // Open modal
    newIdeaBtn.addEventListener('click', function() {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });
});
</script>

<?php get_footer(); ?>
