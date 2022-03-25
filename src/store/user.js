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
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
}
