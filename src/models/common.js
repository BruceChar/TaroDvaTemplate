import Taro from '@tarojs/taro'

export default {
  namespace: 'common',
  state: {
    token: Taro.getStorageSync('token'),

  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}