"use strict";
require("./node_modules/vue/dist/vue.runtime.esm-bundler.js");
require("./style.css.js");
const App = require("./App.vue.js");
const runtimeDom_esmBundler = require("./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js");
runtimeDom_esmBundler.createApp(App).mount("#app");
