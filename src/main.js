import Vue from "vue"
import App from "./App"

import uView from "uview-ui"
Vue.use(uView)

import "@/utils/interceptor.js"

Vue.config.productionTip = false

App.mpType = "app"

const app = new Vue({
  ...App,
})
app.$mount()
