
<?php get_header(); ?>

<main id="main" class="site-main py-8">
    <div class="container mx-auto px-4">
        <?php if (have_posts()) : ?>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-2">
                    <?php while (have_posts()) : the_post(); ?>
                        
                        <article id="post-<?php the_ID(); ?>" <?php post_class('mb-8 bg-white shadow-md rounded-lg overflow-hidden'); ?>>
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="post-thumbnail">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('large', array('class' => 'w-full h-auto')); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            
                            <div class="p-6">
                                <header class="entry-header mb-4">
                                    <?php the_title('<h2 class="entry-title text-2xl font-bold"><a href="' . esc_url(get_permalink()) . '" class="hover:text-purple-600">', '</a></h2>'); ?>
                                    
                                    <div class="entry-meta text-sm text-gray-600 mt-2">
                                        <?php
                                        echo sprintf(
                                            esc_html__('Posted on %s by %s', 'genz-clg-theme'),
                                            '<time>' . get_the_date() . '</time>',
                                            '<a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a>'
                                        );
                                        ?>
                                    </div>
                                </header>
                                
                                <div class="entry-content">
                                    <?php the_excerpt(); ?>
                                </div>
                                
                                <footer class="entry-footer mt-4">
                                    <a href="<?php the_permalink(); ?>" class="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                                        <?php esc_html_e('Read More', 'genz-clg-theme'); ?>
                                    </a>
                                </footer>
                            </div>
                        </article>
                        
                    <?php endwhile; ?>
                    
                    <div class="pagination">
                        <?php
                        the_posts_pagination(array(
                            'mid_size' => 2,
                            'prev_text' => __('&laquo; Previous', 'genz-clg-theme'),
                            'next_text' => __('Next &raquo;', 'genz-clg-theme'),
                            'class' => 'flex justify-center mt-8',
                        ));
                        ?>
                    </div>
                    
                </div>
                
                <div class="md:col-span-1">
                    <?php get_sidebar(); ?>
                </div>
            </div>
            
        <?php else : ?>
            
            <div class="no-results p-6 bg-white shadow-md rounded-lg">
                <h1 class="text-2xl font-bold mb-4"><?php esc_html_e('Nothing Found', 'genz-clg-theme'); ?></h1>
                
                <?php if (is_search()) : ?>
                    <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'genz-clg-theme'); ?></p>
                    <?php get_search_form(); ?>
                <?php else : ?>
                    <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'genz-clg-theme'); ?></p>
                    <?php get_search_form(); ?>
                <?php endif; ?>
            </div>
            
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
