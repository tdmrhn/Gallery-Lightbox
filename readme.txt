=== Gallery Lightbox ===
Contributors: dmrhn
Donate link: https://dmrhn.com/
Tags: gallery, lightbox, touch, drag, responsive
Requires at least: 5.0
Tested up to: 6.5
Stable tag: 0.4.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Extremely lightweight yet powerful and touch-friendly, jQuery-free, Lightbox toggle button for core Gallery block and supports custom-coded galleries.

== Description ==

This WordPress Plugin adds Lightbox feature to the core Gallery block with a simple toggle button. Easily enable or disable it for any gallery block by selecting 'media file' under the 'link to' dropdown. Once selected, the Lightbox toggle will appear. It also supports custom coded galleries through a filter (check FAQ).

<a href="https://github.com/tdmrhn/dLightbox.js" target=_blank>dLightbox.js</a> is fully responsive, supporting touch, mousewheel, keyboard, and mouse drag interactions, build-in thumbnails, as well as slide counters and figcaption. With no dependency on jQuery, dLightbox.js ensures optimal viewing experiences across all devices.

Although extremely lightweight at only 6.2kb (2.3kb gzipped) for both dLightbox.js and dLightbox.css, the plugin only loads assets into the page if there is a core Gallery block or custom selectors defined via a filter.

Features:

* Enable/disable with a simple toggle button for each Gallery block individually.
* Custom coded galleries support.
* Supports touch, mousewheel, keyboard, and mouse drag interactions.
* Lightbox thumbnails with an easy toggle button.
* Slide counter and figcaption support.
* jQuery-Free, lightweight at only 6.2kb (2.3kb gzipped) for both dLightbox.js and dLightbox.css
* Fully responsive.

== Installation ==

1. Download the plugin ZIP file from <a href="https://github.com/tdmrhn/Gallery-Lightbox/blob/main/gallery-lightbox.zip" target=_blank>Gallery Lightbox</a>.
2. In your WordPress admin panel, navigate to Plugins -> Add New.
3. Click the "Upload Plugin" button, choose the ZIP file you downloaded, and click "Install Now."
4. After installation, activate the plugin.

== Frequently Asked Questions ==

= How do I enable the Lightbox for the core Gallery block? =
Enable or disable the Lightbox feature for any gallery block by selecting 'media file' under the 'link to' dropdown. Once selected, the Lightbox toggle will appear.

= Can I use Lightbox with my custom galleries? =
Yes, you can use the lightbox with custom galleries by using the provided filter. Example code is provided for reference.

add_filter( 'dLightbox:custom:selectors', function ( $selectors ) {
    $selectors = array_merge( $selectors, array('.my-gallery', '.your-gallery') );
    return $selectors;
});

= Is it mobile touch friendly? =
dLightbox.js supports touch, mousewheel, keyboard, and mouse drag interactions.

= Is it supports thumbnails? =
Yes it supports Lightbox thumbnails with an easy toggle. Also with "dLightbox-thumbnails" class you can easily adapt thumbnails to your custom coded galleries.

= Is the lightbox responsive? =
Yes, the lightbox feature provided by Gallery Lightbox is fully responsive, ensuring optimal viewing experiences across all devices.

= Does it need jQuery? =
No, there is no dependency on jQuery. dLightbox is custom coded from scratch, ensuring efficient performance and compatibility with modern web development practices.

= Does the plugin impact page loading speed? =
Although extremely lightweight at only 6.2kb (2.3kb gzipped) for both dLightbox.js and dLightbox.css, the plugin only loads assets into the page if there is a core Gallery block or custom selectors defined via a filter. This ensures minimal impact on page loading speed.

= What if I encounter any issues or have feature requests? =
If you encounter any issues, have feature requests, or need support, please visit the GitHub repository and create an issue. Our team will be happy to assist you.

== Changelog ==

= 0.4 =
* Improved double click to zoom
* Added double tap to zoom on mobile

= 0.3 =
* Added Zoom to original image size on double click

= 0.2.1 =
* Added Caption Toggle

= 0.2 =
* Added Dynamic Thumbnails

= 0.1 =
* Initial release