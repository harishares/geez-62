
<?php
/**
 * Template Name: Law Education
 *
 * This is the template that displays the Law Education page.
 */

// Redirect non-logged in users to the login page
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();
?>

<div class="law-education-wrapper bg-gray-100 min-h-screen">
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
                            <a href="<?php echo esc_url(home_url('/startup-hub/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">💡</span> Startup Hub
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/law-education/')); ?>" class="block px-4 py-2 rounded-md bg-purple-100 text-purple-700 font-medium">
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
            <div class="law-education-content flex-grow">
                <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h1 class="text-2xl font-bold mb-4">Law Education Resources</h1>
                    
                    <!-- Search and Filter -->
                    <div class="mb-6 bg-gray-50 p-4 rounded-lg">
                        <form method="get" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <input type="text" id="search" name="s" placeholder="Search resources..." class="w-full border border-gray-300 rounded-md px-3 py-2">
                            </div>
                            
                            <div>
                                <label for="resource_type" class="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                                <select id="resource_type" name="resource_type" class="w-full border border-gray-300 rounded-md px-3 py-2">
                                    <option value="">All Types</option>
                                    <?php
                                    $types = get_terms(array(
                                        'taxonomy' => 'law_resource_type',
                                        'hide_empty' => false,
                                    ));
                                    
                                    if (!is_wp_error($types)) {
                                        foreach ($types as $type) {
                                            echo '<option value="' . esc_attr($type->slug) . '">' . esc_html($type->name) . '</option>';
                                        }
                                    }
                                    ?>
                                </select>
                            </div>
                            
                            <div class="flex items-end">
                                <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Featured Courses -->
                    <div class="mb-8">
                        <h2 class="text-xl font-bold mb-4">Featured Courses</h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <?php
                            // Get featured courses
                            $args = array(
                                'post_type' => 'law_resource',
                                'posts_per_page' => 3,
                                'meta_query' => array(
                                    array(
                                        'key' => 'law_resource_featured',
                                        'value' => '1',
                                        'compare' => '=',
                                    ),
                                ),
                            );
                            
                            $query = new WP_Query($args);
                            
                            if ($query->have_posts()) :
                                while ($query->have_posts()) : $query->the_post();
                                    $resource_type = get_the_terms(get_the_ID(), 'law_resource_type');
                                    $type_name = is_array($resource_type) && !empty($resource_type) ? $resource_type[0]->name : 'Resource';
                                    $duration = get_post_meta(get_the_ID(), 'law_resource_duration', true) ?: '30 mins';
                            ?>
                                <div class="course-card bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <div class="course-thumbnail h-48 overflow-hidden">
                                            <?php the_post_thumbnail('medium', array('class' => 'w-full h-full object-cover')); ?>
                                        </div>
                                    <?php else : ?>
                                        <div class="course-thumbnail h-48 bg-purple-100 flex items-center justify-center">
                                            <span class="text-4xl">📚</span>
                                        </div>
                                    <?php endif; ?>
                                    
                                    <div class="p-4">
                                        <div class="flex justify-between items-center mb-2">
                                            <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                <?php echo esc_html($type_name); ?>
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <?php echo esc_html($duration); ?>
                                            </span>
                                        </div>
                                        
                                        <h3 class="text-lg font-bold mb-2">
                                            <a href="<?php the_permalink(); ?>" class="hover:text-purple-600">
                                                <?php the_title(); ?>
                                            </a>
                                        </h3>
                                        
                                        <div class="mb-3 text-sm text-gray-600">
                                            <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                                        </div>
                                        
                                        <a href="<?php the_permalink(); ?>" class="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center">
                                            Start Learning 
                                            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            <?php
                                endwhile;
                                wp_reset_postdata();
                            else :
                            ?>
                                <div class="col-span-3 text-center py-8">
                                    <p class="text-gray-600">No featured courses found.</p>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <!-- Recent Resources -->
                    <div>
                        <h2 class="text-xl font-bold mb-4">Recent Resources</h2>
                        
                        <div class="grid grid-cols-1 gap-4">
                            <?php
                            // Get recent resources
                            $args = array(
                                'post_type' => 'law_resource',
                                'posts_per_page' => 5,
                                'meta_query' => array(
                                    array(
                                        'key' => 'law_resource_featured',
                                        'compare' => 'NOT EXISTS',
                                    ),
                                ),
                            );
                            
                            $query = new WP_Query($args);
                            
                            if ($query->have_posts()) :
                                while ($query->have_posts()) : $query->the_post();
                                    $resource_type = get_the_terms(get_the_ID(), 'law_resource_type');
                                    $type_name = is_array($resource_type) && !empty($resource_type) ? $resource_type[0]->name : 'Resource';
                                    $duration = get_post_meta(get_the_ID(), 'law_resource_duration', true) ?: '30 mins';
                            ?>
                                <div class="resource-item flex flex-col md:flex-row border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <div class="resource-thumbnail w-full md:w-48 h-32 md:h-24 overflow-hidden mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                                            <?php the_post_thumbnail('thumbnail', array('class' => 'w-full h-full object-cover rounded')); ?>
                                        </div>
                                    <?php else : ?>
                                        <div class="resource-thumbnail w-full md:w-48 h-32 md:h-24 bg-purple-100 flex items-center justify-center mb-4 md:mb-0 md:mr-4 rounded flex-shrink-0">
                                            <span class="text-2xl">📄</span>
                                        </div>
                                    <?php endif; ?>
                                    
                                    <div class="flex-grow">
                                        <div class="flex justify-between items-start mb-2">
                                            <h3 class="text-lg font-bold">
                                                <a href="<?php the_permalink(); ?>" class="hover:text-purple-600">
                                                    <?php the_title(); ?>
                                                </a>
                                            </h3>
                                            <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                                                <?php echo esc_html($type_name); ?>
                                            </span>
                                        </div>
                                        
                                        <div class="mb-3 text-sm text-gray-600">
                                            <?php echo wp_trim_words(get_the_excerpt(), 25); ?>
                                        </div>
                                        
                                        <div class="flex justify-between items-center text-xs text-gray-500">
                                            <span><?php echo esc_html(get_the_date()); ?></span>
                                            <span><?php echo esc_html($duration); ?></span>
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
                                <div class="text-center py-8">
                                    <p class="text-gray-600">No resources found.</p>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
