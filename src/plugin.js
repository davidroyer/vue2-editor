/*
 * NOTE:
 *   This file is plugin stub for main.js
 */

import Vue from "vue";
import plugin from "./index";
console.log("TCL: plugin", plugin);
import { VueEditor, Quill, version } from "./index";
console.log("TCL: version", version);
console.log("TCL: Quill", Quill);
console.log("TCL: VueEditor", VueEditor);

Vue.use(plugin);

/*
 * NOTE:
 *   If you want Vue instance of main.js to import something in your plugin as a Vue option,
 *   you need to export it here.
 */
// export default plugin
