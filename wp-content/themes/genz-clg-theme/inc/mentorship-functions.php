
<?php
/**
 * Mentorship functionality
 */

/**
 * Register default mentor specialties on theme activation
 */
function genz_clg_register_default_mentor_specialties() {
    $default_specialties = array(
        'Business Law',
        'Intellectual Property',
        'Corporate Finance',
        'Startup Strategy',
        'Tax Planning',
        'Contract Negotiation',
        'Product Development',
        'Marketing Strategy',
    );
    
    foreach ($default_specialties as $specialty) {
        if (!term_exists($specialty, 'mentor_specialty')) {
            wp_insert_term($specialty, 'mentor_specialty');
        }
    }
}
add_action('after_switch_theme', 'genz_clg_register_default_mentor_specialties');

/**
 * Ajax handler for booking a mentorship session
 */
function genz_clg_book_mentorship_session() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'genz_clg_book_session')) {
        wp_send_json_error('Security check failed');
    }
    
    // Check if user is logged in
    if (!is_user_logged_in()) {
        wp_send_json_error('You must be logged in to book a session');
    }
    
    // Get mentor and timeslot
    $mentor_id = isset($_POST['mentor_id']) ? intval($_POST['mentor_id']) : 0;
    $timeslot = isset($_POST['timeslot']) ? sanitize_text_field($_POST['timeslot']) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field($_POST['message']) : '';
    
    if (!$mentor_id || !$timeslot) {
        wp_send_json_error('Invalid mentor or timeslot');
    }
    
    // Validate mentor exists
    $mentor = get_post($mentor_id);
    if (!$mentor || $mentor->post_type !== 'mentor') {
        wp_send_json_error('Mentor not found');
    }
    
    // Get current user
    $user_id = get_current_user_id();
    $user = get_userdata($user_id);
    
    // Create booking in custom table or post type (using post type for simplicity here)
    $booking_data = array(
        'post_title'    => 'Session: ' . $user->display_name . ' with ' . $mentor->post_title,
        'post_content'  => $message,
        'post_status'   => 'pending',
        'post_type'     => 'mentorship_session',
        'meta_input'    => array(
            'mentor_id' => $mentor_id,
            'user_id'   => $user_id,
            'timeslot'  => $timeslot,
            'status'    => 'pending',
        ),
    );
    
    $booking_id = wp_insert_post($booking_data);
    
    if (is_wp_error($booking_id)) {
        wp_send_json_error('Error creating booking: ' . $booking_id->get_error_message());
    }
    
    // Send notification email to mentor
    $mentor_email = get_post_meta($mentor_id, 'mentor_email', true);
    
    if ($mentor_email) {
        $subject = 'New Mentorship Session Request';
        
        $message = "Hello " . $mentor->post_title . ",\n\n";
        $message .= "You have received a new mentorship session request from " . $user->display_name . ".\n";
        $message .= "Requested Time: " . $timeslot . "\n\n";
        $message .= "User's Message: " . $message . "\n\n";
        $message .= "Please log in to your account to accept or decline this request.\n\n";
        $message .= "Best regards,\n";
        $message .= get_bloginfo('name') . " Team";
        
        wp_mail($mentor_email, $subject, $message);
    }
    
    wp_send_json_success(array(
        'booking_id' => $booking_id,
        'message'    => 'Your session request has been submitted successfully!',
    ));
}
add_action('wp_ajax_genz_clg_book_mentorship_session', 'genz_clg_book_mentorship_session');

/**
 * Register custom post type for mentorship sessions during theme activation
 */
function genz_clg_register_mentorship_session_cpt() {
    // Don't register if it already exists
    if (post_type_exists('mentorship_session')) {
        return;
    }
    
    register_post_type('mentorship_session', array(
        'labels' => array(
            'name' => __('Mentorship Sessions', 'genz-clg-theme'),
            'singular_name' => __('Mentorship Session', 'genz-clg-theme'),
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-groups',
        'supports' => array('title', 'editor'),
        'capability_type' => 'post',
        'map_meta_cap' => true,
    ));
}
add_action('after_switch_theme', 'genz_clg_register_mentorship_session_cpt');
