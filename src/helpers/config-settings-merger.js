import merge from "lodash.merge";

export function configSettingsMerger(defaultOptions, userOptions) {
  if (
    Object.keys(userOptions).length > 0 &&
    userOptions.constructor === Object
  ) {
    if (
      userOptions.modules &&
      typeof userOptions.modules.toolbar !== "undefined"
    ) {
      // We don't want to merge default toolbar with provided toolbar.
      delete defaultOptions.modules.toolbar;
    }
    return merge(defaultOptions, userOptions);
  }
}
