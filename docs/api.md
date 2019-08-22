# API

## Props

| Name                  | Type    | Default                                              | Description                                                                            |
| --------------------- | ------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| id                    | String  | quill-container                                      | Set the id (necessary if multiple editors in the same view)                            |
| v-model               | String  | -                                                    | Set v-model to the the content or data property you wish to bind it to                 |
| useCustomImageHandler | Boolean | false                                                | Handle image uploading instead of using default conversion to Base64                   |
| placeholder           | String  | -                                                    | Placeholder text for the editor                                                        |
| disabled              | Boolean | false                                                | Set to true to disable editor                                                          |
| customModules         | Array   | -                                                    | Declare Quill modules to register                                                      | Use a custom toolbar |
| editorToolbar         | Array   | \*\* _Too long for table. See toolbar example below_ | Use a custom toolbar                                                                   |
| editorOptions         | Object  | -                                                    | Offers object for merging into default config (add formats, custom Quill modules, ect) |

<!-- ## Props

| Name                  | Type                         | Description                                                                       |
| --------------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| id                    | file, Editor, cursorLocation | Emitted when useCustomImageHandler is true and photo is being added to the editor |
| v-model               | quill                        | Emitted on `focus` event                                                          |
| placeholder           | quill                        | Emitted on `blur` event                                                           |
| useCustomImageHandler | range, oldRange, source      | Emitted on Quill's `selection-change` event                                       |
| editorOptions         | delta, oldDelta, source      | Emitted on Quill's `text-change` event                                            | -->

## Events

| Name             | Parameters                   | Description                                                                         |
| ---------------- | ---------------------------- | ----------------------------------------------------------------------------------- |
| focus            | quill                        | Emitted on `focus` event                                                            |
| blur             | quill                        | Emitted on `blur` event                                                             |
| selection-change | range, oldRange, source      | Emitted on Quill's `selection-change` event                                         |
| text-change      | delta, oldDelta, source      | Emitted on Quill's `text-change` event                                              |
| image-added      | file, Editor, cursorLocation | Emitted when `useCustomImageHandler` is true and photo is being added to the editor |
| image-removed    | image                        | Emitted when `useCustomImageHandler` is true and photo has been deleted             |

<!-- Emitted when the default save button is clicked -->
