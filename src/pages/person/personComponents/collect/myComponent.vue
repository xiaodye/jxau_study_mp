<template>
  <!-- 封装一个组件用于显示收藏等处的内容: -->
  <!-- 收藏中暂时为贴子: -->
  <view class="packComp">
    <!-- 调用头部组件: -->
    <!-- 如果展示的是收藏页，则进入先显示收藏夹 -->
    <u-sticky offset-top="200">
      <u-navbar fixed="true" :title="tittle" @rightClick="rightClick" :autoBack="true"></u-navbar>
    </u-sticky>
    <!-- <u-subsection v-if="tittle==='我的收藏'" :class="mysub" :list="list" :current="current" @change="changeCurrent"></u-subsection> -->

    <!-- 包括的即为自己创建的收藏夹: -->
    <view class="favorite">
      <text class="favorite-num" :style="{ fontWeight: 'bold', marginLeft: 15 + 'rpx' }">{{ myFavority.length }}个收藏夹</text>
      <!-- 跳转到指定的收藏夹的方法: -->
      <view class="favorite-single" v-for="(item, index) in myFavority" :key="index" @click="goMyFavority(index)">
        <view class="name">
          <view class="name_icon">
            <text class="_name">{{ item.name }}</text>
            <view
              :style="{ width: 20 + 'rpx', marginTop: 5 + 'rpx', marginLeft: 10 + 'rpx' }"
              class="icon iconfont icon-shoucangjia"
            ></view>
          </view>
          <text :style="{ color: 'silver', fontSize: 35 + 'rpx', fontWeight: 'bold' }">{{ item.num }}个收藏内容</text>
        </view>
        <!-- 删除图标: -->
        <!-- 带有一个点击删除事件: -->
        <view class="icon iconfont icon-shanchu delete" @click.stop="deleteFavorite(index)"></view>
      </view>
    </view>
    <!-- 新建一个收藏夹的图标: -->
    <view class="addNewCollect" @click="createNewCollect">
      <image class="_img" src="https://s2.loli.net/2022/04/23/a1RiyeXzgnG3tVN.png" mode=""></image>
    </view>
    <!-- <u-overlay :show="show">
			<u--input placeholder="请输入内容" border="surround" v-model="value" @change="change"></u--input>
		</u-overlay> -->
    <u-popup :show="show" :round="10" mode="center" @close="close" @open="open">
      <view class="popIpt">
        <u--input placeholder="请输入收藏夹名称" border="surround" v-model="value" @confirm="showIpt"></u--input>
      </view>
    </u-popup>
  </view>
</template>


<script>
// 导入跳转的方法:
import { goDetail } from "@/utils/utils.js"
// 导入封装的方法:
import { myRequest } from "@/utils/utils.js"
export default {
  // 导入封装的单个贴子组件:
  data() {
    return {
      show: false,
      value: "",
      tittle: "",
      mt: 160,
      list: ["收藏夹", "我的关注"],
      current: 0,
      delete: "delete",
      // 单个收藏夹包括的即为标题和收藏的数量:
      myFavority: [
        {
          id: 1,
          name: "默认收藏夹",
          num: 666,
        },
        {
          id: 2,
          name: "前端",
          num: 26,
        },
      ],
    }
  },
  components: {},
  onLoad(option) {
    this.tittle = JSON.parse(option.Obj)
    // 返回所有的收藏夹的结果L:
    this.getAllCollects()
  },
  methods: {
    // 返回上一页:
    rightClick() {
      uni.navigateBack({
        delta: 1,
      })
    },
    // 获取所有收藏夹:
    getAllCollects() {
      let myreq = new Promise((resolve, reject) => {
        uni.request({
          url: "/user/get/all/favorites",
          method: "GET",
          header: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNzEyNjk4MDM5LFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInN0YXRlXCI6MX19IiwiaWF0IjoxNjUwNzEyNjk4LCJleHAiOjE2NTQzMTI2OTgsImp0aSI6IjU0NDlhNjRiLWIyZTctNDExNC04YzRiLWFkYjA3ZGM2MWFkNiJ9.daWMdZ-H1qOJqXKRVLNP-sXciFp8ThHYldOpMIHOcBmlqYdZfNTDPARQix0lGtKELlHS_cYoiMjVpfuRMk2AFw",
          },
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
          },
        })
      })
      myreq
        .then(res => {
          console.log("返回所有的收藏夹的结果", res.data.data)
          this.myFavority = res.data.data
          // 返回id放入缓存中:
          try {
            uni.setStorageSync("id", res.data.data.id)
          } catch (e) {
            //TODO handle the exception
            console.log("存入缓存发生错误:", e)
          }
        })
        .catch(err => {
          console.log("返回错误:", err)
        })
    },
    deleteACollects(index, id) {
      let myreq = new Promise((resolve, reject) => {
        uni.request({
          url: "/user/delete/favorites",
          method: "DELETE",
          data: {
            favoritesId: id,
          },
          header: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNzEyNjk4MDM5LFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInN0YXRlXCI6MX19IiwiaWF0IjoxNjUwNzEyNjk4LCJleHAiOjE2NTQzMTI2OTgsImp0aSI6IjU0NDlhNjRiLWIyZTctNDExNC04YzRiLWFkYjA3ZGM2MWFkNiJ9.daWMdZ-H1qOJqXKRVLNP-sXciFp8ThHYldOpMIHOcBmlqYdZfNTDPARQix0lGtKELlHS_cYoiMjVpfuRMk2AFw",
          },
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
          },
        })
      })
      myreq
        .then(res => {
          console.log("返回删除的结果:", res)
          if (res.data.result === "SUCCESS") {
            this.myFavority.splice(index, 1)
          }
          // this.myFavority=res.data.data;
          // 返回id放入缓存中:
          // try{
          // 	uni.setStorageSync('id',res.data.data.id)
          // }catch(e){
          // 	//TODO handle the exception
          // 	console.log('存入缓存发生错误:',e);
          // }
        })
        .catch(err => {
          console.log("返回错误:", err)
        })
    },
    // 删除某个收藏夹的事件:
    deleteFavorite(index) {
      // 弹出提示:
      let that = this
      uni.showModal({
        title: "提示",
        content: "确认删除该收藏夹吗",
        success: function (res) {
          if (res.confirm) {
            // 用户点击确认之后触发请求:
            that.deleteACollects(index, that.myFavority[index].id)
          } else if (res.cancel) {
          }
        },
      })
    },
    // 跳转到指定的收藏夹的方法:
    goMyFavority(index) {
      goDetail("./singleFavorite", 1, this.myFavority[index])
    },
    // 创建新的收藏夹:
    createNewCollect() {
      if (this.value !== "") {
        this.value = ""
      }
      // 执行允许显示一个遮罩层，其中嵌套输入框，输入新建的收藏夹的名称:
      this.show = true
    },
    open() {
      // console.log('open');
    },
    showIpt(e) {
      // console.log('显示内容:',e);
      let name = this.value
      let contents = 0
      let newCollect = {
        name,
        contents,
      }
      this.myFavority.push(newCollect)
      this.show = false
      let myreq = new Promise((resolve, reject) => {
        uni.request({
          url: "/user/save/favorites",
          method: "POST",
          data: {
            collectName: name,
          },
          header: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNzEyNjk4MDM5LFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInN0YXRlXCI6MX19IiwiaWF0IjoxNjUwNzEyNjk4LCJleHAiOjE2NTQzMTI2OTgsImp0aSI6IjU0NDlhNjRiLWIyZTctNDExNC04YzRiLWFkYjA3ZGM2MWFkNiJ9.daWMdZ-H1qOJqXKRVLNP-sXciFp8ThHYldOpMIHOcBmlqYdZfNTDPARQix0lGtKELlHS_cYoiMjVpfuRMk2AFw",
          },
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
          },
        })
      })
      myreq
        .then(res => {
          console.log("返回结果", res.data.data)
        })
        .catch(err => {
          console.log("返回错误:", err)
        })
    },
    close() {
      this.show = false
      // console.log('close');
    },
  },
}
</script>

<style lang="scss" scoped>
.packComp {
  display: flex;
  flex-direction: column;

  ::v-deep .u-subsection {
    top: 150rpx;
  }

  .favorite {
    width: 100%;
    display: flex;
    flex-direction: column;
    // background-color: skyblue;
    justify-content: space-around;
    // 下方为隔开自定义导航头部分的高度:
    margin-top: 150rpx;

    &-num {
      padding: 10rpx;
      border-bottom: 1rpx solid #ede3e7;
    }

    &-single {
      display: flex;
      margin: 10rpx 20rpx 10rpx 20rpx;
      flex-direction: column;
      border-radius: 20rpx;
      position: relative;
      padding: 10rpx 0 10rpx 10rpx;
      box-shadow: 5rpx 5rpx 5rpx rgba(0, 0, 0, 0.3);

      .name {
        display: flex;
        flex-direction: column;
        padding-left: 20rpx;

        .name_icon {
          display: flex;
          flex-direction: row;

          ._name {
            font-weight: bold;
            margin-bottom: 15rpx;
          }
        }
      }

      .delete {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .addNewCollect {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    display: flex;
    top: 60%;
    position: fixed;
    right: 5%;
    z-index: 2;
    box-shadow: 5rpx 10rpx 10rpx rgba(255, 85, 127, 0.2);

    ._img {
      width: 100%;
      height: 100%;
    }
  }

  .popIpt {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20rpx;
    height: 120rpx;
    padding: 30rpx;
    justify-content: center;

    .btns {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
