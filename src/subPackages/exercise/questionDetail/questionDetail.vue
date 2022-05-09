/**
 * @author lan
 * @page 刷题页
 */
<template>
  <view class="question-container">
    <!-- 导航条 -->
    <view class="question-nav" :style="{ height: navHeight + 'px' }"></view>

    <!-- main -->
    <view class="question-main" :style="{ paddingTop: navHeight + 'px' }">
      <!-- 进度条 -->
      <view class="question-main-line-progress">
        <u-line-progress
          :percentage="lineProgressPer"
          activeColor="#19be6b"
          :height="rpxToPx(16)"
          :showText="false"
        ></u-line-progress>
        <view class="qmlp-text">
          <text class="qmlp-text-up">{{ lineProgress }}</text>
          <text class="qmlp-text-fill">{{ "/" + questionInfoList.length }}</text>
        </view>
      </view>

      <!-- 题目信息 -->
      <u-transition :show="show" mode="fade-left">
        <view class="question-main-info">
          <!-- 题目类型 -->
          <my-tag
            class="type"
            :type="questionInfoList[activeIndex].question_type === '单选题' ? 'success' : 'error'"
            size="mini"
            :circle="false"
          >
            {{ questionInfoList[activeIndex].question_type }}
          </my-tag>

          <!-- 题目 -->
          <view class="desc">{{ questionInfoList[activeIndex].content }}</view>

          <!-- 选项卡 -->
          <view class="option-group">
            <view
              class="option-group-item"
              :class="[getMapValue(activeIndex + 1, item.key, questionInfoList[activeIndex].question_type) ? 'active' : '']"
              v-for="(item, index) in questionInfoList[activeIndex].choices"
              :key="item.key"
              @click="selectOption(item, index, questionInfoList[activeIndex].question_type)"
            >
              <view class="key">{{ item.key + "." }}</view>
              <view class="option-group-item-text">{{ item.choice }}</view>
            </view>
          </view>
        </view>
      </u-transition>

      <!-- route button-->
      <view class="question-main-route">
        <!-- 上一题 -->
        <u-button text="上一题" :disabled="prevBtnDisabled" type="info" shape="circle" @click="switchQuestion('prev')"></u-button>
        <!-- 下一题 -->
        <u-button
          :text="nextBtn.text"
          :disabled="nextBtn.disabled"
          :loading="nextBtn.loading"
          type="success"
          color="#19be6b"
          shape="circle"
          @click="switchQuestion('next')"
        ></u-button>
      </view>
    </view>

    <!-- 模态框 -->
    <u-modal
      :show="showModal"
      @confirm="commitAnswerCard"
      @cancel="closeModal"
      title="确认提交？"
      showCancelButton
      :asyncClose="true"
    ></u-modal>

    <!-- 加载页 -->
    <u-loading-page :loading="loading"></u-loading-page>
  </view>
</template>

<script>
import { systemInfo } from "@/mixin.js"
import { questionInfoList } from "@/mock/questionList.js"
export default {
  components: {},
  mixins: [systemInfo],
  data: () => ({
    questionGroupId: "",
    questionInfoList: [{}],

    // 索引
    activeIndex: 0,

    // 进度条
    lineProgress: 1,
    lineProgressPer: 10,

    // btn
    prevBtnDisabled: true,
    nextBtn: { text: "下一题", loading: false, disabled: false },

    show: false,
    showModal: false,
    loading: true,

    answerMap: new Map(),
  }),
  computed: {},
  methods: {
    // 建立答案map
    createAnswerMap() {
      // 初始化map
      this.questionInfoList.forEach((item, index) => {
        if (item.question_type === "单选题") {
          this.answerMap.set(index + 1, null)
        } else if (item.question_type === "多选题") {
          this.answerMap.set(index + 1, [])
        }
      })

      console.log(this.answerMap)
    },

    // 获取题组
    async getQuestionList() {
      this.loading = true

      const { data: res } = await uni.request({
        url: "/question/get/set/questions",
        method: "GET",
        data: { QuestionSetId: this.questionGroupId },
      })
      // console.log(res)
      this.loading = false
      if (res.status !== "200") return uni.$u.toast("获取题组失败")
      this.questionInfoList = res.data
      this.createAnswerMap()
      this.lineProgressPer = this.questionInfoList.length
      this.show = true
    },

    // 选中选项
    selectOption(item, index, type) {
      // this.optionActiveIndex = index

      if (type === "单选题") {
        // 寻找key,设置value
        this.answerMap.set(this.activeIndex + 1, item.key)
      } else if (type === "多选题") {
        // 拿到选项卡
        const optionArr = this.answerMap.get(this.activeIndex + 1)

        // 没有则添加，有则去除
        if (!optionArr.includes(item.key)) {
          optionArr.push(item.key)
        } else {
          optionArr.splice(optionArr.indexOf(item.key), 1)
        }
      }

      // 手动更新、渲染数据
      this.$forceUpdate()
      // console.log(this.answerMap)
    },

    // 切换题目
    switchQuestion(type) {
      if (type === "next") {
        // 最后一题，转为提交
        if (this.activeIndex === this.questionInfoList.length - 1) {
          const unFinishedArr = []
          for (const [key, value] of this.answerMap) {
            if (value === null || !value.length) unFinishedArr.push(key)
          }
          // 提示题目未完成
          if (unFinishedArr.length) return uni.$u.toast(`你还有题目未完成：${JSON.stringify(unFinishedArr)}`)
          return (this.showModal = true)
        }

        // 切换下一题

        // 防抖
        if (!this.show) return
        this.show = false
        setTimeout(() => {
          this.activeIndex++
          this.lineProgress++
          this.show = true
        }, 300)
        this.lineProgressPer += 10
      } else if (type === "prev") {
        // 切换上一题

        // 防抖
        if (!this.show) return
        this.show = false
        setTimeout(() => {
          this.activeIndex--
          this.lineProgress--
          this.lineProgressPer -= 10
          this.show = true
        }, 300)
      }
    },

    // 用于判断选中option如何添加样式
    getMapValue(key, value, type) {
      /**
       * @key: 题号，第几题 如1 2 3 4...
       * @value: 题目的选项，如A B C D
       * @type: 题目的类型 如单选题 多选题
       */

      if (type === "单选题") return this.answerMap.get(key) === value
      // 多选，判断包含
      return this.answerMap.get(key).includes(value)
    },

    closeModal() {
      this.showModal = false
    },

    // 提交答题卡
    async commitAnswerCard() {
      // map转obj
      let answerObj = {}
      for (const [key, value] of this.answerMap) {
        answerObj[key] = value
      }
      // console.log(answerObj)

      // 提交
      try {
        const { data: res } = await uni.request({
          url: "/question/user/correcting",
          data: { QuestionSetId: this.questionGroupId, answerObj: answerObj },
        })
        console.log(res)
        if (res.status !== "200") {
          this.showModal = false
          return uni.$u.toast("提交失败")
        }
        const answerReport = res.data
        uni.redirectTo({
          url: `/subPackages/exercise/resultPage/resultPage?answerReport=${JSON.stringify(
            answerReport
          )}&answerSheet=${JSON.stringify(answerObj)}`,
        })
      } catch (err) {
        console.error(err)
        uni.$u.toast("请求异常")
      } finally {
        this.showModal = false
      }
    },
  },
  watch: {
    // 把控btn开禁
    lineProgress(value) {
      this.prevBtnDisabled = value === 1 ? true : false
      if (value >= this.questionInfoList.length) {
        this.nextBtn = { text: "提交", loading: false, disabled: false }
      } else {
        this.nextBtn = { text: "下一题", loading: false, disabled: false }
      }
    },
  },

  onLoad(options) {
    this.questionGroupId = options.id
    this.getQuestionList()
  },
}
</script>

<style lang="scss" scoped>
@mixin vertical_center($mode: flex-start) {
  display: flex;
  justify-content: $mode;
  align-items: center;
}

.question-container {
  min-height: 100vh;
  // background-color: $uni-bg-color-grey;
}

.question-nav {
  position: fixed;
  width: 100%;
  background-image: linear-gradient(120deg, #96e6a1 0%, #d4fc79 100%);
}

.question-main {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100vh;
  &-line-progress {
    @include vertical_center();
    padding: 20rpx;

    .qmlp-text {
      @include vertical_center();
      margin-left: 30rpx;

      &-up {
        color: #71d5a1;
      }
      &-fill {
        color: $uni-text-color-disable;
      }
    }
  }

  &-info {
    padding: 20rpx;

    .desc {
      margin-top: 20rpx;
      font-size: 35rpx;
      color: $uni-color-paragraph;
    }

    .option-group {
      display: flex;
      flex-direction: column;
      margin-top: 40rpx;

      &-item {
        display: flex;

        box-sizing: border-box;
        width: 100%;
        background-color: #f3f4f6;
        border-radius: 20rpx;
        padding: 20rpx;
        margin-bottom: 30rpx;
        color: $uni-text-color-grey;

        &:last-of-type {
          margin: 0;
        }

        &.active {
          background-image: linear-gradient(to right, #19be6b 0%, #71d5a1 100%);
          color: #fff;
        }

        .key {
          width: 50rpx;
        }

        &-text {
          flex: 1;
          font-size: 32rpx;
        }
      }
    }
  }

  &-route {
    @include vertical_center(space-evenly);
    height: 200rpx;
    margin: auto 0 100rpx;

    ::v-deep .u-button {
      width: 40%;
    }
  }
}
</style>
