
<?php
/**
 * Shortcode functionality
 */

if (!defined('ABSPATH')) {
    exit;
}

function genz_clg_app_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'page' => 'dashboard',
        'height' => 'auto',
        'class' => '',
        'width' => '100%'
    ), $atts);

    $container_style = sprintf(
        'height: %s; width: %s; margin: 0 auto;',
        esc_attr($attributes['height']),
        esc_attr($attributes['width'])
    );

    $container_class = 'genz-clg-container ' . esc_attr($attributes['class']);
    
    $output = '<div class="' . $container_class . '" style="' . $container_style . '">';
    
    $output .= '<div class="genz-clg-loading">';
    $output .= '<div class="genz-clg-loading-spinner"></div>';
    $output .= '</div>';
    
    $output .= '<div id="genz-clg-root" data-page="' . esc_attr($attributes['page']) . '" style="display: none;"></div>';
    
    $output .= '<script>
        document.addEventListener("DOMContentLoaded", function() {
            var checkReactInterval = setInterval(function() {
                if (document.querySelector("#genz-clg-root > div")) {
                    document.querySelector("#genz-clg-root").style.display = "block";
                    document.querySelector(".genz-clg-loading").style.display = "none";
                    clearInterval(checkReactInterval);
                }
            }, 100);
            
            setTimeout(function() {
                clearInterval(checkReactInterval);
                if (!document.querySelector("#genz-clg-root > div")) {
                    document.querySelector(".genz-clg-loading").innerHTML = "<p>Failed to load the application. Please refresh the page or contact support.</p>";
                }
            }, 5000);
        });
    </script>';
    
    $output .= '</div>';
    
    return $output;
}
add_shortcode('genz_clg', 'genz_clg_app_shortcode');
