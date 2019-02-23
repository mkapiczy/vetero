import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import { languages } from "@/i18n";
import { defaultLocale } from "@/i18n";
const messages = Object.assign(languages);

Vue.config.productionTip = false;

var i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: "de",
  messages
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");

import "fomantic-ui-less/semantic.less";
