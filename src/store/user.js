export default {
  namespaced: true,
  state: {
    userInfo: {
      nickName: "",
      avatarUrl: "",
    },
  },
  getters: {},
  actions: {},
  mutations: {
    // 获取用户信息
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },

    // 更新用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
}
