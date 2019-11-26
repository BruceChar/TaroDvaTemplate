
import Taro from '@tarojs/taro'

const HEADURL = 'application/x-www-form-urlencoded'
const HEADJSON = 'application/json'

const http = ({
  url = '',
  header = {},
  param = {},
  ...other
} = {}) => {

  // Taro.showLoading({
  //   title: '拼命加载中..'
  // });
  var head = {
    "content-type": ""
  }
  if (header["content-type"] != undefined) {
    head = header
  }

  var tempPromise = new Promise((resolve, reject) => {
    Taro.request({
      url: getUrl(url),
      data: param,
      header: head,
      ...other, //method bind
      complete: (res) => {
        // Taro.hideLoading();    //要和showLoading配对使用

        if (res.statusCode >= 200 && res.statusCode < 300) {
          let code = parseInt(res.data.code)
          switch (code) {
            case 0:

              break
            case 501:
              log.w('网络请求501 url', url)
              log.i('header', header)
              getApp().globalData.isGuest = true
              // require('../utils/util.js').showGuest()
              break
            case 700:

              break

            default:
              break
          }

          resolve(res.data)
        } else {
          reject(res)
        }

        if (res.statusCode == 404) {
          log.a('------------------------404------------------------')
        }
        if (res.errMsg == "request:fail timeout") {
          wx.showToast({
            title: '请求超时',
            icon: 'none'
          })
        }
      },

      fail: (res) => {
        var rs = res.errMsg.substring(8, 12)
        if (rs == "fail") {
          Taro.showToast({
            title: '哎呀!服务器跑丢了>_<',
            icon: 'none'
          })
        }
      }
    })
  })
  return tempPromise
}

const getUrl = (url) => {
  // if (url.indexOf('://') == -1) {
  //   url = baseUrl + url;
  // }
  return url
}

// get方法
const _get = (url, param = {}, header = {}) => {
  return http({
    url,
    header,
    param,
  })
}

const _post = (url, param = {}, header = {}) => {
  return http({
    url,
    header,
    param,
    method: 'POST'
  })
}

const _put = (url, param = {}, header = {}) => {
  return http({
    url,
    header,
    param,
    method: 'PUT'
  })
}

const _delete = (url, param = {}, header = {}) => {
  return http({
    url,
    header,
    param,
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
  // baseUrl,
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
  coordinates: _coordinates
}