import Vue from "vue"
import App from "./App"
import uView from "uview-ui"
import store from "@/store/index.js"
import { globalMixin } from "@/mixin.js"

import "@/utils/interceptor.js"

Vue.use(uView)
Vue.mixin(globalMixin)

Vue.config.productionTip = false

App.mpType = "app"

const app = new Vue({
  ...App,
  store,
})
app.$mount()
