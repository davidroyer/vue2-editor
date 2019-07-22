/*
 * NOTE:
 *   This file is plugin stub for main.js
 */

import Vue from "vue";
import plugin from "./index";
const { Quill, version } = plugin;

console.log("TCL: plugin", plugin);
console.log("TCL: version", version);
console.log("TCL: Quill", Quill);

Vue.use(plugin);

/*
 * NOTE:
 *   If you want Vue instance of main.js to import something in your plugin as a Vue option,
 *   you need to export it here.
 */
// export default plugin
