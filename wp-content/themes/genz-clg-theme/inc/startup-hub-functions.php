
<?php
/**
 * Startup Hub functionality
 */

/**
 * Ajax handler for submitting a startup idea
 */
function genz_clg_submit_startup_idea() {
    // Check nonce for security
    if (!isset($_POST['startup_idea_nonce']) || !wp_verify_nonce($_POST['startup_idea_nonce'], 'submit_startup_idea')) {
        wp_die('Security check failed');
    }
    
    // Get current user
    $current_user_id = get_current_user_id();
    if (!$current_user_id) {
        wp_die('You must be logged in to submit a startup idea');
    }
    
    // Validate required fields
    $title = isset($_POST['startup_title']) ? sanitize_text_field($_POST['startup_title']) : '';
    $category = isset($_POST['startup_category']) ? intval($_POST['startup_category']) : 0;
    $description = isset($_POST['startup_description']) ? wp_kses_post($_POST['startup_description']) : '';
    
    if (empty($title) || empty($description) || empty($category)) {
        wp_die('Please fill in all required fields');
    }
    
    // Create the startup idea post
    $post_data = array(
        'post_title'    => $title,
        'post_content'  => $description,
        'post_status'   => 'publish',
        'post_author'   => $current_user_id,
        'post_type'     => 'startup_idea',
    );
    
    $post_id = wp_insert_post($post_data);
    
    if (is_wp_error($post_id)) {
        wp_die('Error creating startup idea: ' . $post_id->get_error_message());
    }
    
    // Set the category
    if ($category > 0) {
        wp_set_object_terms($post_id, $category, 'startup_category');
    }
    
    // Initialize meta values
    update_post_meta($post_id, 'startup_likes', 0);
    
    // Redirect back to the startup hub page
    wp_redirect(add_query_arg('submitted', '1', get_permalink(get_page_by_path('startup-hub'))));
    exit;
}
add_action('wp_ajax_submit_startup_idea', 'genz_clg_submit_startup_idea');

/**
 * Ajax handler for liking a startup idea
 */
function genz_clg_like_startup_idea() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'genz_clg_like_startup')) {
        wp_send_json_error('Security check failed');
    }
    
    // Check if user is logged in
    if (!is_user_logged_in()) {
        wp_send_json_error('You must be logged in to like startup ideas');
    }
    
    // Get post ID
    $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;
    
    if (!$post_id) {
        wp_send_json_error('Invalid post ID');
    }
    
    // Get current user
    $user_id = get_current_user_id();
    
    // Check if user has already liked this idea
    $liked_by = get_post_meta($post_id, 'startup_liked_by', true);
    if (!is_array($liked_by)) {
        $liked_by = array();
    }
    
    if (in_array($user_id, $liked_by)) {
        // User already liked, remove the like
        $liked_by = array_diff($liked_by, array($user_id));
        $likes = max(0, intval(get_post_meta($post_id, 'startup_likes', true)) - 1);
        $action = 'unliked';
    } else {
        // Add the like
        $liked_by[] = $user_id;
        $likes = intval(get_post_meta($post_id, 'startup_likes', true)) + 1;
        $action = 'liked';
    }
    
    // Update meta values
    update_post_meta($post_id, 'startup_liked_by', $liked_by);
    update_post_meta($post_id, 'startup_likes', $likes);
    
    wp_send_json_success(array(
        'likes' => $likes,
        'action' => $action,
    ));
}
add_action('wp_ajax_genz_clg_like_startup_idea', 'genz_clg_like_startup_idea');

/**
 * Register default startup categories on theme activation
 */
function genz_clg_register_default_startup_categories() {
    $default_categories = array(
        'Technology',
        'E-commerce',
        'Healthcare',
        'Finance',
        'Education',
        'Food & Beverage',
        'Real Estate',
        'Social Enterprise',
    );
    
    foreach ($default_categories as $category) {
        if (!term_exists($category, 'startup_category')) {
            wp_insert_term($category, 'startup_category');
        }
    }
}
add_action('after_switch_theme', 'genz_clg_register_default_startup_categories');
