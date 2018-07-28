import merge from "lodash.merge";

export function configSettingsMerger(defaultOptions, customizedOptions) {
  if (
    Object.keys(customizedOptions).length > 0 &&
    customizedOptions.constructor === Object
  ) {
    if (
      customizedOptions.modules &&
      typeof customizedOptions.modules.toolbar !== "undefined"
    ) {
      // We don't want to merge default toolbar with provided toolbar.
      delete defaultOptions.modules.toolbar;
    }
    merge(customizedOptions, defaultOptions);
  }
}
