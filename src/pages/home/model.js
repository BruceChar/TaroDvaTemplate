import * as homeApi from './service'

export default {
  namespace: 'home',
  state: {
    banner: [
      {
        text: 'swiper text 1'
      },
      {},
    ],
    msg: '',
    page: 1
  },
  effects: {
    *testMock({payload}, {put, call, select}) {
      return 'Ok'
      const re = yield call(homeApi.test, {})
      if (re !== undefined) {
        console.log("yield result:", re)
        yield put({
          type: 'test',
          payload: re
        })
      }
      
    }
  },

  reducers: {
    test(state, {payload}) {
      console.log("payload:", payload)
      return {...state, ...payload}
    }
  },
}