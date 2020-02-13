import api from './http'
import { isLogin, getToken } from './util'

let http = ({url, param, login=true, isJson=true, ...method}) => {
  //need login 
  // console.log('-------login--isLogin-----', url, login, isLogin())
  let hasLogin = isLogin()
  if (login && !hasLogin) {
    return {stat: 1, msg: '需要登录才能操作', data: {}}
  }
  let token = 'Guest'
  if (hasLogin) token = getToken()
  return api({url, param, token, isJson, ...method})
}

const get = ({url = '', param = {}, login}) => {
  return http({
    url,
    param,
    login,
    method: 'GET'
  })
}

const post = ({url = '', param = {}, login}) => {
  // let token = Taro.getStorageSync('token')
  return http({
    url,
    param,
    login,
    method: 'POST'
  })
}

module.exports = {
  get,
  post,
}