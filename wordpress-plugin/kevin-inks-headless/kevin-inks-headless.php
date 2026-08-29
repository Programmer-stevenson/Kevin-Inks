<?php
/**
 * Plugin Name: Kevin Inks Headless Content
 * Description: Provides portfolio and available-design content to the Kevin Inks React website.
 * Version: 1.0.0
 * Author: Kevin Inks
 */

if (!defined('ABSPATH')) {
    exit;
}

function ki_register_content_types() {
    register_post_type('ki_work', array(
        'labels' => array('name' => 'Portfolio Work', 'singular_name' => 'Portfolio Piece'),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-format-image',
        'supports' => array('title', 'thumbnail', 'page-attributes'),
    ));

    register_post_type('ki_design', array(
        'labels' => array('name' => 'Available Designs', 'singular_name' => 'Design'),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-art',
        'supports' => array('title', 'thumbnail', 'page-attributes'),
    ));
}
add_action('init', 'ki_register_content_types');

function ki_add_meta_boxes() {
    add_meta_box('ki_work_details', 'Portfolio Details', 'ki_work_meta_box', 'ki_work', 'normal', 'high');
    add_meta_box('ki_design_details', 'Design Details', 'ki_design_meta_box', 'ki_design', 'normal', 'high');
}
add_action('add_meta_boxes', 'ki_add_meta_boxes');

function ki_field($name, $label, $value, $type = 'text') {
    printf(
        '<p><label for="%1$s"><strong>%2$s</strong></label><br><input class="widefat" type="%3$s" id="%1$s" name="%1$s" value="%4$s"></p>',
        esc_attr($name), esc_html($label), esc_attr($type), esc_attr($value)
    );
}

function ki_work_meta_box($post) {
    wp_nonce_field('ki_save_meta', 'ki_meta_nonce');
    ki_field('ki_number', 'Display number', get_post_meta($post->ID, 'ki_number', true));
    ki_field('ki_style', 'Tattoo style', get_post_meta($post->ID, 'ki_style', true));
    ki_field('ki_alt', 'Image alt text', get_post_meta($post->ID, 'ki_alt', true));
    echo '<p>Use the <strong>Featured Image</strong> panel for the portfolio photograph.</p>';
}

function ki_design_meta_box($post) {
    wp_nonce_field('ki_save_meta', 'ki_meta_nonce');
    $status = get_post_meta($post->ID, 'ki_status', true) ?: 'available';
    echo '<p><label for="ki_status"><strong>Status</strong></label><br><select class="widefat" id="ki_status" name="ki_status">';
    foreach (array('available' => 'Available', 'one-of-one' => '1 of 1 — Available', 'reserved' => 'Reserved') as $key => $label) {
        printf('<option value="%s" %s>%s</option>', esc_attr($key), selected($status, $key, false), esc_html($label));
    }
    echo '</select></p>';
    ki_field('ki_placement', 'Recommended placement', get_post_meta($post->ID, 'ki_placement', true));
    ki_field('ki_size', 'Recommended size', get_post_meta($post->ID, 'ki_size', true));
    ki_field('ki_alt', 'Image alt text', get_post_meta($post->ID, 'ki_alt', true));
    echo '<p>Use the <strong>Featured Image</strong> panel for the design artwork.</p>';
}

function ki_save_meta($post_id) {
    if (!isset($_POST['ki_meta_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['ki_meta_nonce'])), 'ki_save_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $fields = array('ki_number', 'ki_style', 'ki_alt', 'ki_status', 'ki_placement', 'ki_size');
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field(wp_unslash($_POST[$field])));
        }
    }
}
add_action('save_post', 'ki_save_meta');

function ki_site_fields() {
    return array(
        'brand'=>array('Brand name','KEVIN.INKS'), 'nav1'=>array('Navigation: Home','Home'), 'nav2'=>array('Navigation: My Craft','My Craft'), 'nav3'=>array('Navigation: Available Designs','Available Designs'), 'nav4'=>array('Navigation: Experience','Experience'), 'nav5'=>array('Navigation: About','About'),
        'hero_eyebrow'=>array('Hero eyebrow','Artist First. Tattooer Second.'), 'hero_line1'=>array('Hero heading line 1','Original Tattoos.'), 'hero_line2'=>array('Hero heading line 2','Lasting Stories.'), 'hero_subtext'=>array('Hero subtext','Custom artwork designed with meaning.'), 'hero_primary'=>array('Hero primary button','Book Consultation'), 'hero_secondary'=>array('Hero secondary button','Browse Designs'), 'hero_handle'=>array('Instagram handle','@Kevin.inks'), 'hero_location'=>array('Studio location','Las Vegas, NV'), 'hero_note'=>array('Appointment note','By Appointment Only'), 'hero_image'=>array('Hero image','/hero.png','image'), 'hero_alt'=>array('Hero image alt text','Kevin tattooing a client in the studio'),
        'work_eyebrow'=>array('Portfolio eyebrow','Portfolio'), 'work_heading'=>array('Portfolio heading','Selected Work'), 'work_link'=>array('Portfolio link label','View Portfolio'),
        'designs_eyebrow'=>array('Designs eyebrow','The Design Vault'), 'designs_heading'=>array('Designs heading','New Designs'), 'designs_accent'=>array('Designs accent heading','Available.'), 'designs_intro'=>array('Designs introduction',"Each piece in the vault is an original composition, drawn once and tattooed once. When a design is claimed, it's retired — your tattoo stays yours alone. Tap any design to take a closer look.",'textarea'), 'designs_button'=>array('Designs button','Explore All Designs'), 'designs_note'=>array('Design member note','List members see every drop 48 hours early. Most designs are claimed before they reach this page.','textarea'),
        'experience_eyebrow'=>array('Experience eyebrow','The Experience'), 'experience_line1'=>array('Experience heading line 1','From First Idea'), 'experience_line2'=>array('Experience heading line 2','To Lasting Artwork'), 'experience_cta'=>array('Experience button','Start Yours'),
        'step1_label'=>array('Experience step 1 label','Where It Starts'), 'step1_title'=>array('Experience step 1 title','The Spark'), 'step1_copy'=>array('Experience step 1 copy',"No forms, no flash books. Just you, me, and the reason you walked in. Tell me the story — I'll find the image hiding inside it.",'textarea'), 'step2_label'=>array('Experience step 2 label','The Artwork'), 'step2_title'=>array('Experience step 2 title','Drawn From Nothing'), 'step2_copy'=>array('Experience step 2 copy',"Your piece doesn't exist yet. That's the point. I design it from a blank page — one composition, built for your body, refined until neither of us can imagine it any other way.",'textarea'), 'step3_label'=>array('Experience step 3 label','The Day'), 'step3_title'=>array('Experience step 3 title','The Session'), 'step3_copy'=>array('Experience step 3 copy','A private studio. No crowd, no clock. Music you choose, a pace your body sets. The kind of day you end up telling people about along with the tattoo.','textarea'), 'step4_label'=>array('Experience step 4 label','Decades Later'), 'step4_title'=>array('Experience step 4 title','Made To Outlast'), 'step4_copy'=>array('Experience step 4 copy','Linework engineered to hold its shape. Healing guidance that comes with follow-up, not a pamphlet. This piece should look deliberate at year one and year thirty.','textarea'),
        'about_eyebrow'=>array('About eyebrow','About Kevin'), 'about_heading'=>array('About heading','Art Is'), 'about_accent'=>array('About accent heading','Personal.'), 'about_quote'=>array('About quote',"I'm Kevin, a tattoo artist who believes every tattoo should carry meaning, and every client deserves the best experience.",'textarea'), 'about_image'=>array('About portrait','/kev.jpg','image'), 'about_alt'=>array('About image alt text','Portrait of Kevin in his studio'), 'about_caption'=>array('About image caption','Est. Studio Practice'), 'about_cta'=>array('About button','Read My Story'),
        'stat1_n'=>array('About stat 1 value','10+'), 'stat1_l'=>array('About stat 1 label','Years Tattooing'), 'stat2_n'=>array('About stat 2 value','100%'), 'stat2_l'=>array('About stat 2 label','Original Designs'), 'stat3_n'=>array('About stat 3 value','1:1'), 'stat3_l'=>array('About stat 3 label','Private Sessions'),
        'email_eyebrow'=>array('Email section eyebrow','The Inner Circle'), 'email_line1'=>array('Email heading line 1','New Designs.'), 'email_line2'=>array('Email heading line 2','Exclusive Access.'), 'email_line3'=>array('Email heading line 3','Early Booking.'), 'email_copy'=>array('Email section copy',"Instagram decides who sees my work. The list doesn't. Members get every design drop 48 hours early, first access to booking openings, and the stories behind each piece — straight to your inbox, nothing else.",'textarea'), 'email_placeholder'=>array('Email placeholder','YOUR EMAIL ADDRESS'), 'email_button'=>array('Email button','Join The List'), 'email_success'=>array('Email success message',"You're in. Watch your inbox for the next drop."), 'email_note'=>array('Email fine print','One or two emails a month. No noise. Unsubscribe anytime.'), 'email_image'=>array('Email section image','/sexy.jpg','image'),
        'cta_line1'=>array('Final CTA heading line 1','Ready To Start'), 'cta_line2'=>array('Final CTA heading line 2','Your Next Piece?'), 'cta_copy'=>array('Final CTA copy',"Consultations are free, unhurried, and obligation-free. Bring an idea — even a half-formed one — and we'll find the artwork inside it.",'textarea'), 'cta_button'=>array('Final CTA button','Book Consultation'),
        'contact_email'=>array('Contact email','hello@kevininks.com'), 'contact_instagram'=>array('Instagram URL','https://instagram.com'), 'contact_threads'=>array('Threads URL','https://threads.net'), 'contact_tiktok'=>array('TikTok URL','https://tiktok.com'), 'contact_google'=>array('Google Business URL','https://g.page/'),
        'footer_tagline'=>array('Footer tagline','Original Tattoos. Lasting Stories.'), 'footer_copyright'=>array('Footer copyright','© 2026 Kevin Inks ● Original artwork only'), 'footer_location'=>array('Footer location line','Private Studio — By Appointment — Las Vegas, NV'), 'footer_designer'=>array('Footer designer label','Plexura'), 'footer_designer_url'=>array('Footer designer URL','https://plexura.net'),
    );
}

function ki_register_site_settings() {
    foreach (ki_site_fields() as $key => $field) register_setting('ki_site_content', 'ki_' . $key, array('sanitize_callback'=>'sanitize_text_field'));
}
add_action('admin_init', 'ki_register_site_settings');

function ki_add_content_page() {
    add_menu_page('Website Content', 'Website Content', 'edit_posts', 'ki-site-content', 'ki_render_content_page', 'dashicons-edit-page', 22);
}
add_action('admin_menu', 'ki_add_content_page');

function ki_render_content_page() {
    if (!current_user_can('edit_posts')) return;
    wp_enqueue_media();
    echo '<div class="wrap"><h1>Kevin Inks Website Content</h1><p>Edit text and replace images here. Layout, containers, styling, and animations are locked in the React website.</p><form method="post" action="options.php">';
    settings_fields('ki_site_content');
    foreach (ki_site_fields() as $key => $field) {
        $name = 'ki_' . $key; $value = get_option($name, $field[1]); $type = isset($field[2]) ? $field[2] : 'text';
        echo '<div style="max-width:900px;margin:18px 0"><label for="'.esc_attr($name).'"><strong>'.esc_html($field[0]).'</strong></label><br>';
        if ($type === 'textarea') echo '<textarea class="large-text" rows="4" id="'.esc_attr($name).'" name="'.esc_attr($name).'">'.esc_textarea($value).'</textarea>';
        else echo '<input class="regular-text" style="width:75%" id="'.esc_attr($name).'" name="'.esc_attr($name).'" value="'.esc_attr($value).'">';
        if ($type === 'image') echo ' <button type="button" class="button ki-media" data-target="'.esc_attr($name).'">Choose from Media Library</button>';
        echo '</div>';
    }
    submit_button('Save Website Content'); echo '</form></div>';
    echo "<script>jQuery(function($){$('.ki-media').on('click',function(){const target=$('#'+$(this).data('target'));const frame=wp.media({title:'Choose image',multiple:false,library:{type:'image'}});frame.on('select',function(){target.val(frame.state().get('selection').first().toJSON().url)});frame.open()})})</script>";
}

function ki_opt($key) { $fields=ki_site_fields(); return get_option('ki_'.$key, $fields[$key][1]); }

function ki_site_content() {
    $steps = array(); for ($i=1;$i<=4;$i++) $steps[]=array('label'=>ki_opt('step'.$i.'_label'),'title'=>ki_opt('step'.$i.'_title'),'copy'=>ki_opt('step'.$i.'_copy'));
    return array(
        'brand'=>ki_opt('brand'), 'navLabels'=>array(ki_opt('nav1'),ki_opt('nav2'),ki_opt('nav3'),ki_opt('nav4'),ki_opt('nav5')),
        'hero'=>array('eyebrow'=>ki_opt('hero_eyebrow'),'line1'=>ki_opt('hero_line1'),'line2'=>ki_opt('hero_line2'),'subtext'=>ki_opt('hero_subtext'),'primaryCta'=>ki_opt('hero_primary'),'secondaryCta'=>ki_opt('hero_secondary'),'instagramHandle'=>ki_opt('hero_handle'),'location'=>ki_opt('hero_location'),'desktopNote'=>ki_opt('hero_note'),'image'=>ki_opt('hero_image'),'imageAlt'=>ki_opt('hero_alt')),
        'work'=>array('eyebrow'=>ki_opt('work_eyebrow'),'heading'=>ki_opt('work_heading'),'linkLabel'=>ki_opt('work_link')),
        'designs'=>array('eyebrow'=>ki_opt('designs_eyebrow'),'heading'=>ki_opt('designs_heading'),'accentHeading'=>ki_opt('designs_accent'),'intro'=>ki_opt('designs_intro'),'button'=>ki_opt('designs_button'),'memberNote'=>ki_opt('designs_note')),
        'experience'=>array('eyebrow'=>ki_opt('experience_eyebrow'),'headingLine1'=>ki_opt('experience_line1'),'headingLine2'=>ki_opt('experience_line2'),'cta'=>ki_opt('experience_cta'),'steps'=>$steps),
        'about'=>array('eyebrow'=>ki_opt('about_eyebrow'),'heading'=>ki_opt('about_heading'),'accentHeading'=>ki_opt('about_accent'),'quote'=>ki_opt('about_quote'),'image'=>ki_opt('about_image'),'imageAlt'=>ki_opt('about_alt'),'imageCaption'=>ki_opt('about_caption'),'cta'=>ki_opt('about_cta'),'stats'=>array(array('n'=>ki_opt('stat1_n'),'l'=>ki_opt('stat1_l')),array('n'=>ki_opt('stat2_n'),'l'=>ki_opt('stat2_l')),array('n'=>ki_opt('stat3_n'),'l'=>ki_opt('stat3_l')))),
        'email'=>array('eyebrow'=>ki_opt('email_eyebrow'),'line1'=>ki_opt('email_line1'),'line2'=>ki_opt('email_line2'),'line3'=>ki_opt('email_line3'),'copy'=>ki_opt('email_copy'),'placeholder'=>ki_opt('email_placeholder'),'button'=>ki_opt('email_button'),'success'=>ki_opt('email_success'),'note'=>ki_opt('email_note'),'image'=>ki_opt('email_image')),
        'finalCta'=>array('line1'=>ki_opt('cta_line1'),'line2'=>ki_opt('cta_line2'),'copy'=>ki_opt('cta_copy'),'button'=>ki_opt('cta_button')),
        'contact'=>array('email'=>ki_opt('contact_email'),'instagram'=>ki_opt('contact_instagram'),'threads'=>ki_opt('contact_threads'),'tiktok'=>ki_opt('contact_tiktok'),'googleBusiness'=>ki_opt('contact_google')),
        'footer'=>array('tagline'=>ki_opt('footer_tagline'),'copyright'=>ki_opt('footer_copyright'),'locationLine'=>ki_opt('footer_location'),'designerLabel'=>ki_opt('footer_designer'),'designerUrl'=>ki_opt('footer_designer_url')),
    );
}

function ki_image_url($post_id) {
    $image = get_the_post_thumbnail_url($post_id, 'full');
    return $image ?: '';
}

function ki_content_endpoint() {
    $work_posts = get_posts(array('post_type' => 'ki_work', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'menu_order date', 'order' => 'ASC'));
    $design_posts = get_posts(array('post_type' => 'ki_design', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'menu_order date', 'order' => 'ASC'));

    $work = array_map(function ($post) {
        return array(
            'num' => get_post_meta($post->ID, 'ki_number', true),
            'title' => get_the_title($post),
            'tag' => get_post_meta($post->ID, 'ki_style', true),
            'img' => ki_image_url($post->ID),
            'alt' => get_post_meta($post->ID, 'ki_alt', true) ?: get_the_title($post),
        );
    }, $work_posts);

    $designs = array_map(function ($post) {
        $status = get_post_meta($post->ID, 'ki_status', true) ?: 'available';
        $labels = array('available' => 'Available', 'one-of-one' => '1 of 1 — Available', 'reserved' => 'Reserved');
        return array(
            'title' => get_the_title($post),
            'status' => $status,
            'statusLabel' => isset($labels[$status]) ? $labels[$status] : 'Available',
            'placement' => get_post_meta($post->ID, 'ki_placement', true),
            'size' => get_post_meta($post->ID, 'ki_size', true),
            'img' => ki_image_url($post->ID),
            'alt' => get_post_meta($post->ID, 'ki_alt', true) ?: get_the_title($post),
        );
    }, $design_posts);

    return rest_ensure_response(array('work' => $work, 'designs' => $designs, 'site' => ki_site_content()));
}

function ki_register_endpoint() {
    register_rest_route('kevin-inks/v1', '/content', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'ki_content_endpoint',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'ki_register_endpoint');
