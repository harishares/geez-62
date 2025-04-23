
/**
 * GenZ CLG Theme Main JavaScript File
 */

(function($) {
    'use strict';
    
    /**
     * Initialize the theme's JavaScript
     */
    function initTheme() {
        setupMobileMenu();
        setupTabs();
        setupForms();
        setupAnimations();
    }
    
    /**
     * Handle mobile menu toggling
     */
    function setupMobileMenu() {
        const mobileMenuToggle = $('#mobile-menu-toggle');
        const mobileMenu = $('#mobile-menu');
        
        if (mobileMenuToggle.length && mobileMenu.length) {
            mobileMenuToggle.on('click', function() {
                mobileMenu.toggleClass('hidden');
            });
        }
    }
    
    /**
     * Handle tab interfaces
     */
    function setupTabs() {
        $('.tab-nav-item').on('click', function(e) {
            e.preventDefault();
            
            const targetId = $(this).data('target');
            const tabContainer = $(this).closest('.tab-container');
            
            // Update active tab indicator
            tabContainer.find('.tab-nav-item').removeClass('active-tab');
            $(this).addClass('active-tab');
            
            // Show selected tab content
            tabContainer.find('.tab-content').hide();
            tabContainer.find(targetId).show();
        });
    }
    
    /**
     * Handle form submissions and validation
     */
    function setupForms() {
        // Newsletter form
        $('.newsletter-form').on('submit', function(e) {
            e.preventDefault();
            const email = $(this).find('input[type="email"]').val();
            
            // Simulate AJAX submission
            $(this).html('<p class="text-center text-green-600">Thank you for subscribing!</p>');
            
            // In a real implementation, you would submit to an API endpoint here
        });
        
        // Validate all forms with class 'validate-form'
        $('.validate-form').each(function() {
            $(this).on('submit', function(e) {
                let isValid = true;
                
                // Check required fields
                $(this).find('[required]').each(function() {
                    if (!$(this).val()) {
                        isValid = false;
                        $(this).addClass('border-red-500');
                        
                        if (!$(this).next('.error-message').length) {
                            $(this).after('<p class="error-message text-sm text-red-500 mt-1">This field is required</p>');
                        }
                    } else {
                        $(this).removeClass('border-red-500');
                        $(this).next('.error-message').remove();
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    }
    
    /**
     * Setup animations and interactive elements
     */
    function setupAnimations() {
        // Fade in elements with class 'fade-in' when they enter the viewport
        if ('IntersectionObserver' in window) {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('faded-in');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            });
            
            fadeElements.forEach(el => fadeObserver.observe(el));
        }
        
        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(e) {
            const targetId = $(this).attr('href');
            
            if (targetId !== '#' && $(targetId).length) {
                e.preventDefault();
                
                $('html, body').animate({
                    scrollTop: $(targetId).offset().top - 100
                }, 500);
            }
        });
    }
    
    // Initialize when the DOM is ready
    $(document).ready(function() {
        initTheme();
    });
    
})(jQuery);
