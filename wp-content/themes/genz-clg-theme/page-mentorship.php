
<?php
/**
 * Template Name: Mentorship
 *
 * This is the template that displays the Mentorship page.
 */

// Redirect non-logged in users to the login page
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();
?>

<div class="mentorship-wrapper bg-gray-100 min-h-screen">
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
                            <a href="<?php echo esc_url(home_url('/law-education/')); ?>" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                <span class="mr-2">📚</span> Law Education
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="<?php echo esc_url(home_url('/mentorship/')); ?>" class="block px-4 py-2 rounded-md bg-purple-100 text-purple-700 font-medium">
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
            <div class="mentorship-content flex-grow">
                <!-- Tabs -->
                <div class="mb-6">
                    <div class="border-b border-gray-200">
                        <nav class="flex -mb-px">
                            <a href="#mentors" class="active-tab border-purple-500 text-purple-600 border-b-2 py-4 px-6 font-medium text-sm">
                                Find Mentors
                            </a>
                            <a href="#sessions" class="text-gray-500 hover:text-gray-700 py-4 px-6 font-medium text-sm">
                                My Sessions
                            </a>
                            <a href="#videos" class="text-gray-500 hover:text-gray-700 py-4 px-6 font-medium text-sm">
                                Video Library
                            </a>
                        </nav>
                    </div>
                </div>
                
                <!-- Find Mentors Tab -->
                <div id="mentors-tab" class="tab-content">
                    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h1 class="text-2xl font-bold mb-6">Find a Mentor</h1>
                        
                        <!-- Search and Filter -->
                        <div class="mb-6 bg-gray-50 p-4 rounded-lg">
                            <form method="get" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                    <input type="text" id="search" name="s" placeholder="Search mentors..." class="w-full border border-gray-300 rounded-md px-3 py-2">
                                </div>
                                
                                <div>
                                    <label for="specialty" class="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                                    <select id="specialty" name="specialty" class="w-full border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">All Specialties</option>
                                        <?php
                                        $specialties = get_terms(array(
                                            'taxonomy' => 'mentor_specialty',
                                            'hide_empty' => false,
                                        ));
                                        
                                        if (!is_wp_error($specialties)) {
                                            foreach ($specialties as $specialty) {
                                                echo '<option value="' . esc_attr($specialty->slug) . '">' . esc_html($specialty->name) . '</option>';
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
                        
                        <!-- Mentors List -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <?php
                            // Get mentors
                            $args = array(
                                'post_type' => 'mentor',
                                'posts_per_page' => 6,
                            );
                            
                            $query = new WP_Query($args);
                            
                            if ($query->have_posts()) :
                                while ($query->have_posts()) : $query->the_post();
                                    $specialty = get_the_terms(get_the_ID(), 'mentor_specialty');
                                    $specialty_name = is_array($specialty) && !empty($specialty) ? $specialty[0]->name : 'General';
                                    $years_experience = get_post_meta(get_the_ID(), 'mentor_years_experience', true) ?: '5+';
                                    $rating = get_post_meta(get_the_ID(), 'mentor_rating', true) ?: '4.5';
                            ?>
                                <div class="mentor-card bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div class="p-4 text-center">
                                        <?php if (has_post_thumbnail()) : ?>
                                            <div class="inline-block rounded-full overflow-hidden w-24 h-24 mb-3">
                                                <?php the_post_thumbnail('thumbnail', array('class' => 'w-full h-full object-cover')); ?>
                                            </div>
                                        <?php else : ?>
                                            <div class="inline-block rounded-full overflow-hidden w-24 h-24 mb-3 bg-gray-200 flex items-center justify-center">
                                                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                        <?php endif; ?>
                                        
                                        <h3 class="text-lg font-bold mb-1">
                                            <a href="<?php the_permalink(); ?>" class="hover:text-purple-600">
                                                <?php the_title(); ?>
                                            </a>
                                        </h3>
                                        
                                        <p class="text-sm text-gray-600 mb-2"><?php echo esc_html($specialty_name); ?></p>
                                        
                                        <div class="flex justify-center items-center text-sm text-gray-500 mb-3">
                                            <span class="mr-3">
                                                <span class="mr-1">⭐</span> <?php echo esc_html($rating); ?>
                                            </span>
                                            <span>
                                                <span class="mr-1">⏱️</span> <?php echo esc_html($years_experience); ?> years
                                            </span>
                                        </div>
                                        
                                        <a href="<?php the_permalink(); ?>" class="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm">
                                            View Profile
                                        </a>
                                    </div>
                                </div>
                            <?php
                                endwhile;
                                wp_reset_postdata();
                            else :
                            ?>
                                <div class="col-span-3 text-center py-8">
                                    <p class="text-gray-600">No mentors found.</p>
                                </div>
                            <?php endif; ?>
                        </div>
                        
                        <!-- View All Link -->
                        <div class="text-center mt-8">
                            <a href="<?php echo esc_url(get_post_type_archive_link('mentor')); ?>" class="text-purple-600 hover:text-purple-800 font-medium">
                                View All Mentors
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- My Sessions Tab (Hidden initially) -->
                <div id="sessions-tab" class="tab-content hidden">
                    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h1 class="text-2xl font-bold mb-6">My Mentorship Sessions</h1>
                        
                        <?php
                        // Get user's mentorship sessions
                        $args = array(
                            'post_type' => 'mentorship_session',
                            'posts_per_page' => 10,
                            'meta_query' => array(
                                array(
                                    'key' => 'user_id',
                                    'value' => get_current_user_id(),
                                    'compare' => '=',
                                ),
                            ),
                        );
                        
                        $query = new WP_Query($args);
                        
                        if ($query->have_posts()) :
                        ?>
                            <div class="overflow-x-auto">
                                <table class="min-w-full table-auto">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <?php while ($query->have_posts()) : $query->the_post(); 
                                            $mentor_id = get_post_meta(get_the_ID(), 'mentor_id', true);
                                            $mentor = get_post($mentor_id);
                                            $timeslot = get_post_meta(get_the_ID(), 'timeslot', true);
                                            $status = get_post_meta(get_the_ID(), 'status', true);
                                        ?>
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <?php echo $mentor ? esc_html($mentor->post_title) : 'Unknown Mentor'; ?>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <?php echo esc_html($timeslot); ?>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <?php 
                                                    $status_class = '';
                                                    switch ($status) {
                                                        case 'pending':
                                                            $status_class = 'bg-yellow-100 text-yellow-800';
                                                            break;
                                                        case 'confirmed':
                                                            $status_class = 'bg-green-100 text-green-800';
                                                            break;
                                                        case 'completed':
                                                            $status_class = 'bg-blue-100 text-blue-800';
                                                            break;
                                                        case 'cancelled':
                                                            $status_class = 'bg-red-100 text-red-800';
                                                            break;
                                                        default:
                                                            $status_class = 'bg-gray-100 text-gray-800';
                                                    }
                                                    ?>
                                                    <span class="<?php echo esc_attr($status_class); ?> px-2 py-1 text-xs rounded-full">
                                                        <?php echo ucfirst(esc_html($status)); ?>
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                                    <a href="<?php the_permalink(); ?>" class="text-purple-600 hover:text-purple-900">View Details</a>
                                                    
                                                    <?php if ($status === 'pending'): ?>
                                                        <span class="text-gray-300 mx-2">|</span>
                                                        <a href="#" class="text-red-600 hover:text-red-900 cancel-session" data-id="<?php the_ID(); ?>">Cancel</a>
                                                    <?php endif; ?>
                                                    
                                                    <?php if ($status === 'completed'): ?>
                                                        <span class="text-gray-300 mx-2">|</span>
                                                        <a href="#" class="text-blue-600 hover:text-blue-900 leave-review" data-id="<?php the_ID(); ?>">Leave Review</a>
                                                    <?php endif; ?>
                                                </td>
                                            </tr>
                                        <?php endwhile; ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php 
                        else : 
                        ?>
                            <div class="text-center py-8">
                                <p class="text-gray-600 mb-4">You haven't booked any mentorship sessions yet.</p>
                                <p>Find a mentor to schedule your first session!</p>
                            </div>
                        <?php 
                            wp_reset_postdata();
                        endif; 
                        ?>
                    </div>
                </div>
                
                <!-- Video Library Tab (Hidden initially) -->
                <div id="videos-tab" class="tab-content hidden">
                    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h1 class="text-2xl font-bold mb-6">Mentorship Video Library</h1>
                        
                        <!-- Categories -->
                        <div class="mb-6 flex overflow-x-auto pb-2">
                            <button class="video-category-btn active-category whitespace-nowrap px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mr-2">
                                All Videos
                            </button>
                            <?php
                            $specialties = get_terms(array(
                                'taxonomy' => 'mentor_specialty',
                                'hide_empty' => false,
                            ));
                            
                            if (!is_wp_error($specialties)) :
                                foreach ($specialties as $specialty) :
                            ?>
                                <button class="video-category-btn whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium mr-2 hover:bg-gray-200">
                                    <?php echo esc_html($specialty->name); ?>
                                </button>
                            <?php 
                                endforeach;
                            endif;
                            ?>
                        </div>
                        
                        <!-- Video Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <?php
                            // Simulated videos - in a real implementation, these would come from a custom post type or similar
                            $videos = array(
                                array(
                                    'title' => 'Introduction to Business Law',
                                    'mentor' => 'Jane Smith',
                                    'duration' => '45 min',
                                    'views' => '1.2K',
                                    'image' => 'https://via.placeholder.com/300x200?text=Business+Law',
                                ),
                                array(
                                    'title' => 'Intellectual Property for Startups',
                                    'mentor' => 'Michael Johnson',
                                    'duration' => '60 min',
                                    'views' => '856',
                                    'image' => 'https://via.placeholder.com/300x200?text=IP+Law',
                                ),
                                array(
                                    'title' => 'Funding Options for Entrepreneurs',
                                    'mentor' => 'Sarah Williams',
                                    'duration' => '55 min',
                                    'views' => '2.3K',
                                    'image' => 'https://via.placeholder.com/300x200?text=Funding',
                                ),
                                array(
                                    'title' => 'Negotiation Techniques for Founders',
                                    'mentor' => 'David Miller',
                                    'duration' => '40 min',
                                    'views' => '945',
                                    'image' => 'https://via.placeholder.com/300x200?text=Negotiation',
                                ),
                                array(
                                    'title' => 'Digital Marketing Strategies',
                                    'mentor' => 'Emily Chen',
                                    'duration' => '50 min',
                                    'views' => '1.5K',
                                    'image' => 'https://via.placeholder.com/300x200?text=Marketing',
                                ),
                                array(
                                    'title' => 'Product Development Best Practices',
                                    'mentor' => 'Robert Taylor',
                                    'duration' => '65 min',
                                    'views' => '1.1K',
                                    'image' => 'https://via.placeholder.com/300x200?text=Product+Dev',
                                ),
                            );
                            
                            foreach ($videos as $video) :
                            ?>
                                <div class="video-card bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div class="relative">
                                        <img src="<?php echo esc_url($video['image']); ?>" alt="<?php echo esc_attr($video['title']); ?>" class="w-full h-40 object-cover">
                                        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <button class="play-video-btn w-12 h-12 rounded-full bg-white text-purple-600 flex items-center justify-center">
                                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                            <?php echo esc_html($video['duration']); ?>
                                        </div>
                                    </div>
                                    
                                    <div class="p-4">
                                        <h3 class="text-base font-bold mb-1">
                                            <?php echo esc_html($video['title']); ?>
                                        </h3>
                                        
                                        <p class="text-sm text-gray-600 mb-2">
                                            <?php echo esc_html($video['mentor']); ?>
                                        </p>
                                        
                                        <div class="text-xs text-gray-500">
                                            <?php echo esc_html($video['views']); ?> views
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        
                        <!-- Pagination -->
                        <div class="pagination flex justify-center mt-6">
                            <span class="page-numbers current px-4 py-2 bg-purple-600 text-white rounded-md">1</span>
                            <a class="page-numbers px-4 py-2 mx-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50" href="#">2</a>
                            <a class="next page-numbers px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" href="#">Next &raquo;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabLinks = document.querySelectorAll('.mentorship-content nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active classes
            tabLinks.forEach(l => l.classList.remove('active-tab', 'border-purple-500', 'text-purple-600', 'border-b-2'));
            tabLinks.forEach(l => l.classList.add('text-gray-500', 'hover:text-gray-700'));
            
            // Add active class to clicked tab
            this.classList.add('active-tab', 'border-purple-500', 'text-purple-600', 'border-b-2');
            this.classList.remove('text-gray-500', 'hover:text-gray-700');
            
            // Show corresponding content
            const targetId = this.getAttribute('href').substring(1);
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
                if (content.id === targetId + '-tab') {
                    content.classList.remove('hidden');
                }
            });
        });
    });
    
    // Video category buttons
    const categoryBtns = document.querySelectorAll('.video-category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => {
                b.classList.remove('active-category', 'bg-purple-100', 'text-purple-700');
                b.classList.add('bg-gray-100', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.add('active-category', 'bg-purple-100', 'text-purple-700');
            this.classList.remove('bg-gray-100', 'text-gray-700');
            
            // In a real implementation, you would filter videos by category here
        });
    });
});
</script>

<?php get_footer(); ?>
