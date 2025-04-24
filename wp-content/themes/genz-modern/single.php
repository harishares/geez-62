
<?php get_header(); ?>

<main class="container mx-auto px-4 py-8">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('max-w-3xl mx-auto'); ?>>
            <?php if (has_post_thumbnail()) : ?>
                <div class="aspect-video overflow-hidden rounded-lg mb-8">
                    <?php the_post_thumbnail('large', array('class' => 'w-full h-full object-cover')); ?>
                </div>
            <?php endif; ?>
            
            <h1 class="text-4xl font-bold tracking-tight mb-4">
                <?php the_title(); ?>
            </h1>
            
            <div class="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span><?php echo get_the_date(); ?></span>
                <span>|</span>
                <span><?php the_category(', '); ?></span>
            </div>
            
            <div class="prose prose-stone dark:prose-invert max-w-none">
                <?php the_content(); ?>
            </div>
            
            <?php
            wp_link_pages(array(
                'before' => '<div class="page-links mt-8">' . __('Pages:', 'genz-modern'),
                'after'  => '</div>',
            ));
            ?>
            
            <?php if (comments_open() || get_comments_number()) : ?>
                <div class="mt-12 pt-8 border-t">
                    <?php comments_template(); ?>
                </div>
            <?php endif; ?>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
