<template>
  <view class="write" :style="{ minHeight: windowHeight + 'px' }">
    <u-form labelPosition="left" :model="formModel" :rules="rules" ref="form">
      <!-- 文章标题 -->
      <u-form-item label="标题：" :labelWidth="rpxToPx(100)" prop="title" borderBottom ref="item1">
        <u-input v-model="formModel.title" border="none" placeholder="文章标题"></u-input>
      </u-form-item>

      <!-- 文章内容 -->
      <u-form-item prop="content" ref="item2">
        <u-textarea
          v-model="formModel.content"
          count
          :height="rpxToPx(300)"
          maxlength="200"
          placeholder="文章内容..."
        ></u-textarea>
      </u-form-item>

      <!-- 上传图片 -->
      <u-form-item prop="imgList" ref="item3">
        <u-upload
          :fileList="formModel.imgList"
          @afterRead="afterRead"
          @delete="deletePic"
          name="imgList"
          multiple
          :maxCount="4"
          :previewFullImage="true"
        ></u-upload>
      </u-form-item>

      <!-- 添加标签 -->
      <u-form-item :labelWidth="rpxToPx(160)" prop="tagList" ref="item4">
        <u-input type="text" :maxlength="4" v-model="tagValue" border="bottom" placeholder="最多四个字，至多三个">
          <u-text slot="prefix" text="标签："></u-text>
          <button slot="suffix" type="primary" size="mini" @click="addTag" :disabled="addBtnDisabled">添加</button>
        </u-input>

        <!-- 标签组 -->
        <view class="tag-group" ref="item5">
          <u-tag
            :text="item.text"
            :show="item.close"
            type="success"
            closable
            @close="delTag(index)"
            v-for="(item, index) in formModel.tagList"
            :key="index"
          ></u-tag>
        </view>
      </u-form-item>

      <!-- 提交 -->
      <u-form-item ref="item6">
        <view class="submit">
          <u-button
            type="success"
            :text="submitBtn.text"
            shape="circle"
            :loading="submitBtn.loading"
            :disabled="submitBtn.disabled"
            color="#19be6b"
            @click="submitForm"
          ></u-button>
        </view>
      </u-form-item>
    </u-form>

    <!-- toast组件 -->
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    formModel: {
      title: "",
      content: "",
      imgList: [],
      tagList: [],
    },

    rules: {
      title: {
        type: "string",
        min: 6,
        required: true,
        message: "标题不能少于6个字",
        trigger: ["blur"],
      },
      content: {
        type: "string",
        min: 5,
        required: true,
        message: "内容字数不够,最少50字",
        trigger: ["blur"],
      },
      tagList: [
        {
          validator: (rule, value, callback) => {
            return value.length <= 0 ? false : true
          },
          message: "最少一个标签",
          trigger: "change",
        },
      ],
    },

    tagValue: "",
    addBtnDisabled: false,
    loading: false,

    // 提交按钮
    submitBtn: { text: "提交", loading: false, disabled: false },
  }),
  computed: {},
  watch: {
    formModel: {
      deep: true,
      handler(val) {
        this.addBtnDisabled = val.tagList.length >= 3 ? true : false
      },
    },
  },
  methods: {
    contentFormatter(val) {
      return val.trim()
    },

    // 提交表单
    async submitForm() {
      try {
        const success = await this.$refs.form.validate()
        if (success) {
          // 对象深拷贝，不能拷贝自定义方法
          const form = JSON.parse(JSON.stringify(this.formModel))

          // 去除close属性
          for (let i = 0; i < form.tagList.length; i++) {
            form.tagList[i] = form.tagList[i].text
          }
          console.log(form)

          // 模拟
          this.submitBtn = { text: "提交中", loading: true, disabled: true }
          // this.uploadForm(form)

          setTimeout(() => {
            this.submitBtn = { text: "提交", loading: false, disabled: false }
            this.$refs.uToast.show({ type: "success", message: "已提交，请等待管理员审核" })
            setTimeout(() => {
              uni.navigateBack()
            }, 1000)
          }, 2000)
        }
      } catch (err) {
        // console.log(err)
        this.$refs.uToast.show({ type: "error", message: "请认真填写！" })
      }
    },

    // 发起提交表单请求
    async uploadForm(form) {
      // 上传普通数据
      const { data: res, statusCode } = await uni.request({
        url: "/upload/write",
        data: { title: form.title, content: form.content, tagList: form.tagList },
      })

      // 上传多张图片
      form.tagList.forEach(async (item, index) => {
        const { statusCode } = await uni.uploadFile({
          url: "/upload/img",
          files: item,
          name: `file${index}`,
          fileType: "image",
        })
        if (statusCode === 200 && index === form.tagList.length - 1) return uni.$u.toast("图片上传成功")
      })
    },

    // 新增图片
    afterRead(e) {
      e.file.forEach((imgObj) => {
        this.formModel.imgList.push(imgObj)
      })
    },

    // 移除图片
    deletePic(e) {
      this.formModel.imgList.splice(e.index, 1)
    },

    // 删除标签
    delTag(index) {
      this.formModel.tagList.splice(index, 1)
    },

    // 添加标签
    addTag() {
      if (this.tagValue.trim().length) {
        this.formModel.tagList.unshift({ close: true, text: this.tagValue })
        this.tagValue = ""
      }
    },
  },

  onLoad() {},
  onReady() {
    // 在onReady生命周期调用组件的setRules方法绑定验证规则
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    this.$refs.form.setRules(this.rules)
  },
}
</script>

<style lang="scss" scoped>
.write {
  // background-color: $uni-bg-color-grey;
  box-sizing: border-box;
  padding: 20rpx;
}

.tag-group {
  margin-top: 30rpx;
  display: flex;
  align-items: center;
  &-item {
    margin-right: 20rpx;
  }
}

.submit {
  margin-top: 100rpx;
}
</style>
