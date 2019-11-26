import Taro from '@tarojs/taro'
import {baseUrl} from '../config'

const HEADURL = {'Content-Type': 'application/x-www-form-urlencoded'}
const HEADJSON = {'Content-Type': 'application/json'}

const http = ({url = '', param = {}, isJson = true, ...method }) => {
  let head = HEADJSON
  if (!isJson) {
    head = HEADURL
  }
  return Taro.request({
    url: baseUrl + url,
    data: param,
    header: head,
    ...method,  //method bind
  }).then(res => {
    const { statusCode, data } = res
    if (statusCode >= 200 && statusCode < 300) {
      return data
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`)
    }
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

/**
 * 对外接口get/post/put/delete
 * @url 请求的url，非空
 * @param 请求数据参数，对象类型，可空
 * @return Promise对象
 */
module.exports = {
  get,
  post,
  put
} 