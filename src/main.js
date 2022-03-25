import Vue from "vue"
import App from "./App"
import uView from "uview-ui"
import { globalMixin } from "@/mixin.js"
import "@/utils/interceptor.js"

Vue.use(uView)
Vue.mixin(globalMixin)

Vue.config.productionTip = false

App.mpType = "app"

const app = new Vue({
  ...App,
})
app.$mount()
