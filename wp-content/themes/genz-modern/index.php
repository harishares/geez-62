
<?php get_header(); ?>

<main class="container mx-auto px-4 py-8">
    <?php if (have_posts()) : ?>
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('rounded-lg border bg-card text-card-foreground shadow'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="aspect-video overflow-hidden rounded-t-lg">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-full object-cover')); ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="p-6">
                        <h2 class="text-2xl font-semibold tracking-tight mb-2">
                            <a href="<?php the_permalink(); ?>" class="hover:underline">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        
                        <div class="text-sm text-muted-foreground mb-4">
                            <?php echo get_the_date(); ?> | <?php the_category(', '); ?>
                        </div>
                        
                        <div class="text-muted-foreground mb-4">
                            <?php the_excerpt(); ?>
                        </div>
                        
                        <a href="<?php the_permalink(); ?>" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            <?php _e('Read More', 'genz-modern'); ?>
                        </a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        
        <div class="mt-8 flex justify-center">
            <?php the_posts_pagination(array(
                'mid_size'  => 2,
                'prev_text' => __('Previous', 'genz-modern'),
                'next_text' => __('Next', 'genz-modern'),
                'class'     => 'flex gap-2',
            )); ?>
        </div>
    <?php else : ?>
        <div class="text-center py-12">
            <h2 class="text-2xl font-semibold mb-4"><?php _e('No posts found', 'genz-modern'); ?></h2>
            <p class="text-muted-foreground"><?php _e('It seems we can&rsquo;t find what you&rsquo;re looking for.', 'genz-modern'); ?></p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
