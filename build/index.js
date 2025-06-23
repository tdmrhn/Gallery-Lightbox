(() => {
  // Module definitions
  var modules = {
    184: (module, exports) => {
      var defineModule;
      (function() {
        "use strict";
        var hasOwnProperty = {}.hasOwnProperty;

        /**
         * Combines class names into a single string.
         * Accepts multiple arguments of varying types (strings, numbers, arrays, objects).
         * Filters and processes each argument to construct a space-separated class name string.
         * 
         * @returns {string} Combined class names.
         */
        function combineClassNames() {
          var classes = [];
          for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (arg) {
              var argType = typeof arg;
              if (argType === "string" || argType === "number") {
                classes.push(arg);
              } else if (Array.isArray(arg)) {
                if (arg.length) {
                  var innerClasses = combineClassNames.apply(null, arg);
                  if (innerClasses) {
                    classes.push(innerClasses);
                  }
                }
              } else if (argType === "object") {
                if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
                  classes.push(arg.toString());
                  continue;
                }
                for (var key in arg) {
                  if (hasOwnProperty.call(arg, key) && arg[key]) {
                    classes.push(key);
                  }
                }
              }
            }
          }
          return classes.join(" ");
        }

        module.exports = combineClassNames;
      })();
    }
  };

  // Module cache
  var moduleCache = {};

  /**
   * Requires a module by ID. Caches the module after the first load.
   * 
   * @param {number} moduleId - The ID of the module to load.
   * @returns {object} The exports of the module.
   */
  function requireModule(moduleId) {
    var cachedModule = moduleCache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }

    var module = moduleCache[moduleId] = { exports: {} };
    modules[moduleId](module, module.exports, requireModule);
    return module.exports;
  }

  /**
   * Retrieves the default export of a module if available.
   * 
   * @param {object} module - The module to get the default export from.
   * @returns {function} The getter function for the default export.
   */
  requireModule.getDefaultExport = (module) => {
    var getter = module && module.__esModule ? () => module.default : () => module;
    requireModule.defineProperty(getter, { a: getter });
    return getter;
  };

  /**
   * Defines properties on an export object.
   * 
   * @param {object} exports - The export object to define properties on.
   * @param {object} definition - The properties to define.
   */
  requireModule.defineProperty = (exports, definition) => {
    for (var key in definition) {
      if (requireModule.hasOwn(definition, key) && !requireModule.hasOwn(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };

  /**
   * Checks if an object has a property.
   * 
   * @param {object} obj - The object to check.
   * @param {string} prop - The property to check for.
   * @returns {boolean} True if the property exists on the object.
   */
  requireModule.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

  (() => {
    "use strict";
    const React = window.React;
    const combineClassNames = requireModule(184);
    const { __ } = window.wp.i18n;
    const { addFilter } = window.wp.hooks;
    const { InspectorControls } = window.wp.blockEditor;
    const { ToggleControl } = window.wp.components;

    /**
     * Adds custom attributes to the core/gallery block type.
     * 
     * @param {object} settings - The block settings.
     * @returns {object} The modified block settings.
     */
    addFilter("blocks.registerBlockType", "easy-gallery-lightbox/add-attributes", (settings) => {
      if (settings.name !== "core/gallery") return settings;

      return {
        ...settings,
        attributes: {
          ...settings.attributes,
          isLightboxEnabled: { type: "boolean", default: false },
          showLightboxThumbnails: { type: "boolean", default: false },
          showLightboxCaptions: { type: "boolean", default: false },
          linkTo: { type: "string", default: "none" },
        },
      };
    });

    /**
     * Adds inspector controls to the core/gallery block.
     * 
     * @param {function} BlockEdit - The original BlockEdit component.
     * @returns {function} The modified BlockEdit component.
     */
    addFilter("editor.BlockEdit", "easy-gallery-lightbox/add-inspector-controls", (BlockEdit) => (props) => {
      if (props.name !== "core/gallery") return <BlockEdit {...props} />;

      const { attributes, setAttributes } = props;
      const { isLightboxEnabled, showLightboxThumbnails, showLightboxCaptions, linkTo } = attributes;

      if (linkTo !== "media") return <BlockEdit {...props} />;

      return (
        <React.Fragment>
          <BlockEdit {...props} />
          <InspectorControls>
            <div className="enable-lightbox-container">
              <ToggleControl
                label={__("Lightbox", "easy-gallery-lightbox")}
                checked={isLightboxEnabled}
                onChange={() => setAttributes({ isLightboxEnabled: !isLightboxEnabled })}
                hidden={linkTo !== "media"}
              />
              {isLightboxEnabled && (
                <>
                  <ToggleControl
                    label={__("Lightbox: Thumbnails", "easy-gallery-lightbox")}
                    checked={showLightboxThumbnails}
                    onChange={() => setAttributes({ showLightboxThumbnails: !showLightboxThumbnails })}
                  />
                  <ToggleControl
                    label={__("Lightbox: Captions", "easy-gallery-lightbox")}
                    checked={showLightboxCaptions}
                    onChange={() => setAttributes({ showLightboxCaptions: !showLightboxCaptions })}
                  />
                </>
              )}
            </div>
          </InspectorControls>
        </React.Fragment>
      );
    });

    /**
     * Adds custom classes to the core/gallery block.
     * 
     * @param {function} BlockListBlock - The original BlockListBlock component.
     * @returns {function} The modified BlockListBlock component.
     */
    addFilter("editor.BlockListBlock", "easy-gallery-lightbox/add-classes", (BlockListBlock) => (props) => {
      const { name, attributes } = props;
      if (name !== "core/gallery" || !attributes?.isLightboxEnabled) return <BlockListBlock {...props} />;

      const className = combineClassNames(props?.className, { "dhn-lightbox": attributes?.isLightboxEnabled });
      return <BlockListBlock {...props} className={className} />;
    });
  })();
})();
