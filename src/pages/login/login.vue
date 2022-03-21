<template>
  <view class="login" :style="{ paddingTop: navHeight + 'px', height: windowHeight + 'px' }">login</view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
export default {
  components: {},
  data: () => ({}),
  mixins: [systemInfo],
  computed: {},
  methods: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getSystemInfo()
  },
}
</script>

<style lang="scss">
.login {
  box-sizing: border-box;
  background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
}
</style>
