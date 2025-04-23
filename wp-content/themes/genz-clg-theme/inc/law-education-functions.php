
<?php
/**
 * Law Education functionality
 */

/**
 * Register default law resource types on theme activation
 */
function genz_clg_register_default_law_resource_types() {
    $default_types = array(
        'Article',
        'Video',
        'Webinar',
        'Case Study',
        'Template',
        'Guide',
        'Checklist',
    );
    
    foreach ($default_types as $type) {
        if (!term_exists($type, 'law_resource_type')) {
            wp_insert_term($type, 'law_resource_type');
        }
    }
}
add_action('after_switch_theme', 'genz_clg_register_default_law_resource_types');

/**
 * Track law resource views
 */
function genz_clg_track_law_resource_view($post_id) {
    if (get_post_type($post_id) !== 'law_resource') {
        return;
    }
    
    // Don't track admin views
    if (is_admin()) {
        return;
    }
    
    // Get current user
    $user_id = get_current_user_id();
    
    // If not logged in, don't track
    if (!$user_id) {
        return;
    }
    
    // Get view count
    $views = intval(get_post_meta($post_id, 'law_resource_views', true));
    
    // Get viewers list
    $viewers = get_post_meta($post_id, 'law_resource_viewers', true);
    if (!is_array($viewers)) {
        $viewers = array();
    }
    
    // Only count unique views per user per day
    $today = date('Y-m-d');
    $key = $user_id . '_' . $today;
    
    if (!isset($viewers[$key])) {
        $views++;
        $viewers[$key] = time();
        
        // Update meta values
        update_post_meta($post_id, 'law_resource_views', $views);
        update_post_meta($post_id, 'law_resource_viewers', $viewers);
        
        // Track user progress if this is a course resource
        genz_clg_update_user_course_progress($post_id, $user_id);
    }
}
add_action('wp_head', function() {
    if (is_singular('law_resource')) {
        genz_clg_track_law_resource_view(get_the_ID());
    }
});

/**
 * Update user course progress
 */
function genz_clg_update_user_course_progress($resource_id, $user_id) {
    // Get the course this resource belongs to
    $course_id = get_post_meta($resource_id, 'law_resource_course', true);
    
    if (!$course_id) {
        return;
    }
    
    // Get all resources in the course
    $course_resources = get_posts(array(
        'post_type' => 'law_resource',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'law_resource_course',
                'value' => $course_id,
            ),
        ),
    ));
    
    // Get completed resources for this user
    $completed_resources = get_user_meta($user_id, 'genz_clg_completed_resources', true);
    if (!is_array($completed_resources)) {
        $completed_resources = array();
    }
    
    // Mark this resource as completed
    if (!in_array($resource_id, $completed_resources)) {
        $completed_resources[] = $resource_id;
        update_user_meta($user_id, 'genz_clg_completed_resources', $completed_resources);
    }
    
    // Calculate progress percentage
    $total_resources = count($course_resources);
    $completed_count = 0;
    
    foreach ($course_resources as $resource) {
        if (in_array($resource->ID, $completed_resources)) {
            $completed_count++;
        }
    }
    
    $progress = $total_resources > 0 ? ($completed_count / $total_resources) * 100 : 0;
    
    // Update user's course progress
    $courses_progress = get_user_meta($user_id, 'genz_clg_courses_progress', true);
    if (!is_array($courses_progress)) {
        $courses_progress = array();
    }
    
    $courses_progress[$course_id] = array(
        'progress' => $progress,
        'completed' => $completed_count,
        'total' => $total_resources,
        'last_activity' => time(),
    );
    
    update_user_meta($user_id, 'genz_clg_courses_progress', $courses_progress);
    
    // If course is completed, award a certificate
    if ($progress >= 100) {
        genz_clg_award_course_certificate($user_id, $course_id);
    }
}

/**
 * Award a course certificate
 */
function genz_clg_award_course_certificate($user_id, $course_id) {
    $certificates = get_user_meta($user_id, 'genz_clg_certificates', true);
    if (!is_array($certificates)) {
        $certificates = array();
    }
    
    // Only award if not already awarded
    if (!isset($certificates[$course_id])) {
        $certificates[$course_id] = array(
            'awarded_date' => time(),
            'course_id' => $course_id,
            'certificate_id' => uniqid('cert_'),
        );
        
        update_user_meta($user_id, 'genz_clg_certificates', $certificates);
        
        // Send notification email
        $user = get_userdata($user_id);
        $course = get_post($course_id);
        
        if ($user && $course) {
            $subject = 'Congratulations on completing ' . $course->post_title;
            
            $message = "Dear " . $user->display_name . ",\n\n";
            $message .= "Congratulations on completing the " . $course->post_title . " course!\n";
            $message .= "You can view your certificate in your profile dashboard.\n\n";
            $message .= "Best regards,\n";
            $message .= get_bloginfo('name') . " Team";
            
            wp_mail($user->user_email, $subject, $message);
        }
    }
}
