<?php 
/**
 * Plugin Name:         Gallery Lightbox - dLightbox.js
 * Plugin URI:          https://github.com/tdmrhn/Gallery-Lightbox/
 * Description:         Simple yet powerful jQuery-free Lightbox toggle button for the core Gallery block and custom code galleries.
 * Version:             0.2.1
 * Requires at least:   6.3
 * Requires PHP:        7.4
 * Author:              dmrhn
 * Author URI:          https://dmrhn.com/
 * License:             GPLv2
 * License URI:         https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain:         gallery-lightbox
 *
 * @package enable-gallery-lightbox
 */

defined( 'ABSPATH' ) || exit;

/* Backend assets */
add_action( 'enqueue_block_editor_assets', function () {
	$plugin_version = get_file_data( __FILE__, array( 'Version' ) )[0];
    //$dependencies  = array('react', 'wp-block-editor', 'wp-components', 'wp-hooks', 'wp-i18n');
    $dependencies  = array('wp-block-editor', 'wp-components');

    wp_enqueue_script('gallery-dlightbox-editor', plugins_url( '/assets/index.js', __FILE__ ), $dependencies, $plugin_version, true );
    wp_enqueue_style( 'gallery-dlightbox-editor', plugins_url( '/assets/editor.css', __FILE__ ), array(), $plugin_version );
});

/* Frontend assets */
add_filter( 'render_block_core/gallery', function ( $block_content, $block ) {
    $is_lightbox_enabled = isset( $block['attrs']['isLightboxEnabled'] ) ? $block['attrs']['isLightboxEnabled'] : false;
    $show_lightbox_thumbnails = isset( $block['attrs']['showLightboxThumbnails'] ) ? $block['attrs']['showLightboxThumbnails'] : false;
    $show_lightbox_captions = isset( $block['attrs']['showLightboxCaptions'] ) ? $block['attrs']['showLightboxCaptions'] : false;
	
    $link_to_media = isset( $block['attrs']['linkTo'] ) && $block['attrs']['linkTo'] === 'media';

    if ( ! $is_lightbox_enabled || ! $link_to_media ) {
        return $block_content;
    }

    if ( preg_match( '/<[^>]*>/', $block_content ) ) {
        $p = new WP_HTML_Tag_Processor( $block_content );
        if ( $p->next_tag() ) {
            $p->add_class( 'dhn-lightbox' );
            if ( $show_lightbox_thumbnails ) {
                $p->add_class( 'dLightbox-thumbnails' );
            }
            if ( $show_lightbox_captions ) {
                $p->add_class( 'dLightbox-captions' );
            }
            $block_content = $p->get_updated_html();
        }
    }

    enqueue_dLightbox_gallery_assets();

    return $block_content;
}, 10, 2 );



add_action( 'wp_footer', function () {
    $custom_selectors = apply_filters( 'dLightbox:custom:selectors', array() );

    if ( empty( $custom_selectors ) ) {
        return;
    }

	ob_start();
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var html = document.documentElement.innerHTML;
            var selectors = <?php echo wp_json_encode( $custom_selectors ); ?>;
            var found = false;

            selectors.forEach(selector => {
    			if (html.includes(selector)) {
        			found = true;
        			return;
    			}
			});

            if (found) {
                <?php 
					enqueue_dLightbox_gallery_assets();
        			enqueue_dLightbox_gallery_inline_asset( $custom_selectors ); 
				?>
            }
        });
    </script>
    <?php
    $html = ob_get_clean();
    
}, 10, 2 );

function enqueue_dLightbox_gallery_assets() {
    static $resources_enqueued = false;
    if ( ! $resources_enqueued ) {		
        $plugin_version = get_file_data( __FILE__, array( 'Version' ) )[0];
        wp_enqueue_script( 'gallery-dlightbox', plugins_url( '/assets/dLightbox.min.js', __FILE__ ), array(), $plugin_version, true );
        wp_enqueue_style( 'gallery-dlightbox', plugins_url( '/assets/dLightbox.min.css', __FILE__ ), array(), $plugin_version );
        $resources_enqueued = true;		
    }
}

function enqueue_dLightbox_gallery_inline_asset( $custom_selectors ) {
    wp_add_inline_script( 'gallery-dlightbox', 'document.addEventListener("DOMContentLoaded", function() { var selectors = ' . wp_json_encode( $custom_selectors ) . '; selectors.forEach(function(selector) { document.querySelectorAll(selector).forEach(function(element) { element.classList.add("dhn-lightbox"); }); }); });', 'before' );
}

?>