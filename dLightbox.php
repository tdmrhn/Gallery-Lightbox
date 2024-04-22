<?php 
/**
 * Plugin Name:         Gallery Lightbox - dLightbox
 * Plugin URI:          https://github.com/tdmrhn/gallery-block-lightbox
 * Description:         Simple yet powerful jQuery-free Lightbox toggle button for the core Gallery block and custom code galleries.
 * Version:             0.1
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
add_action( 'wp_enqueue_scripts', function () {
    global $post;
    $plugin_version = get_file_data( __FILE__, array( 'Version' ) )[0];
    $custom_selectors = apply_filters( 'dLightbox:custom:selectors', array() );
    $all_selectors = array_merge( $custom_selectors, array( '.wp-block-gallery', '.gallery' ) );

    $resources_enqueued = false;
    $the_post_content = $post->post_content;

    foreach ( parse_blocks( $the_post_content ) as $block ) {
        if ( $block['blockName'] === 'core/gallery' ) {
            $is_lightbox_enabled = isset( $block['attrs']['isLightboxEnabled'] ) ? $block['attrs']['isLightboxEnabled'] : false;
            $link_to_media = isset( $block['attrs']['linkTo'] ) && $block['attrs']['linkTo'] === 'media';

            if ( $is_lightbox_enabled && $link_to_media ) {
                $resources_enqueued = true;
                break;
            }
        }
    }

    foreach ( $custom_selectors as $selector ) {
        if ( stripos( $the_post_content, ltrim( $selector, '.' ) ) !== false ) {
            $resources_enqueued = true;
            break;
        }
    }

    if ( !$resources_enqueued ) {
        return;
    }

    wp_enqueue_script( 'gallery-dlightbox', plugins_url( '/assets/dLightbox.js', __FILE__ ), array(), $plugin_version, true );
    wp_enqueue_style( 'gallery-dlightbox', plugins_url( '/assets/dLightbox.css', __FILE__ ), array(), $plugin_version );
    wp_add_inline_script( 'gallery-dlightbox', 'document.addEventListener("DOMContentLoaded", function() { var selectors = ' . json_encode( $all_selectors ) . '; selectors.forEach(function(selector) { document.querySelectorAll(selector).forEach(function(element) { element.classList.add("dhn-lightbox"); }); }); });','before');
}, 10 );

?>