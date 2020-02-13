import Taro from '@tarojs/taro'
import {baseUrl} from '../config'
import {Stat, Msg} from '../config/error'
import {loginModal} from './util'

const HEADURL = {'Content-Type': 'application/x-www-form-urlencoded'}
const HEADJSON = {'Content-Type': 'application/json'}

const http = ({url = '', param = {}, token = 'Guest', isJson = true, ...method }) => {
  let head = HEADJSON
  if (!isJson) {
    head = HEADURL
  }
  head = {...head, 'Authorization': token }
  // Taro.showLoading({
  //   title: '拼命加载中...'
  // })
  // console.log('----------------request-----------------:', token, url, param)
  let burl = baseUrl

  // local mock api
  if (url.indexOf('api') !== -1) {
    burl =  'http://localhost:3721'
  }

  return Taro.request({
    url: burl + url,
    data: param,
    header: head,
    ...method,  //method bind
  }).then(res => {
    // Taro.hideLoading()
    const { statusCode, data } = res
    // console.log('request status===========:', res)
    if (statusCode >= 200 && statusCode < 300) {
      
      return {stat: Stat.ok, msg: Msg.ok, data}
    } else {
      
      console.error('request error:', res)
      const {code, message} = data
      if (code === 401) {
        //TODO: token 失效，统一处理
        console.warn('token失效请重新登录：', message)
        Taro.setStorageSync('token', 'Guest')
        loginModal('', 'token失效或已登出，请重新登录！')
        return {stat: Stat.reqFail, msg: '需要登录才能操作'}
      }

      if (code === 500) {
        //笔记活动不存在或已删除，上报具体处理
        console.error('网络请求错误：', message)
        return {stat: Stat.reqError, msg: message}
      }

      if (code === 400) {
        //参数错误，直接throw
        console.error(`网络请求错误: ${message}, 状态码： ${statusCode}`)
        throw new Error(`网络请求错误: ${message}, 状态码： ${statusCode}`)
      }
      
      return {stat: Stat.unknow, msg: Msg.unknow, data}
    }
  })
  .catch(e => {
    //网络连接失败，网络不存在,连接超时
    // Taro.hideLoading()
    console.error('catch request error:', e.errMsg)
    Taro.showToast({
      title: '网络请求超时',
      icon: 'none',
      duration: 1500,
    })
    return { stat: Stat.reqFail, msg: Msg.reqFail }
  })
}

const get = ({url = '', param = {}, isJson = true}) => {
  return http({
    url,
    param,
    isJson,
    method: 'GET'
  })
}

const post = ({url = '', param = {}, isJson = true}) => {
  // let token = Taro.getStorageSync('token')
  return http({
    url,
    param,
    isJson,
    method: 'POST'
  })
}

const put = ({url = '', param = {}, isJson = true}) => {
  return http({
    url,
    param,
    isJson,
    method: 'PUT'
  })
}

export default http