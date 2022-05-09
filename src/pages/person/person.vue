<template>
  <view class="person">
    <!-- 头部组件，包含头像，昵称，签名 -->
    <Header :userInfo="userInfo"></Header>
    <!-- 学习记录，关于学习时长 -->
    <StudyRecords></StudyRecords>
    <!-- 中部列表 -->
    <CenterList></CenterList>
    <!-- 创作中心：关于发布的博客和贴子 -->
    <MyCreate></MyCreate>
    <!-- 尾部列表 -->
    <TailList></TailList>
  </view>
</template>
<script>
import Header from "./header.vue"
import StudyRecords from "./studyRecords.vue"
import CenterList from "./centerList.vue"
import MyCreate from "./myCreate.vue"
import TailList from "./tailList.vue"

import { mapState } from "vuex"
export default {
  data() {
    return {}
  },
  components: {
    Header,
    StudyRecords,
    CenterList,
    MyCreate,
    TailList,
  },
  computed: {
    ...mapState("userModule", ["userInfo"]),
  },
  methods: {},

  onLoad() {},
}
</script>
<style lang="scss" scoped>
.person {
  min-height: 100vh;
  background-color: $uni-bg-color-grey;
  box-sizing: border-box;
}
</style>
