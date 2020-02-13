import Taro from '@tarojs/taro'

const setTime = (cb, time) => {
  let t = setTimeout(cb, time)
  return t
}

const timerWraper = (cb, time) => {
  let t = setTime(() => {
    cb()
    clearTimeout(t)
  }, time)
}
let hasShow = false
const loginModal = (cb, tip='') => {
  let str = '需要登录才能进一步操作！'
  if (tip !== '') str = tip
  if (hasShow) return
  hasShow = true
  Taro.showModal({
    title: '系统提示',
    showCancel: true,
    cancelColor: '#999',
    cancelText: '取消',
    content: str,
    
    confirmColor: '#16293E',
    /** 确认按钮的文字，最多 4 个字符 */
    confirmText: '确定',

    complete: (e) => {
      hasShow = false
      if (e.confirm) {
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      } else {
        console.log('login modal:', typeof(cb))
        if (typeof(cb) === 'function') {
          cb() 
        } else {
          Taro.redirectTo({
            url: '/pages/index/index'
          })
        }
      }
      console.log('complete:', e)
    },       
  })
}

const clickHooks = (clickHandle, hook=true) => {
  console.log('click hooks:', clickHandle, hook)
  if (hook) {
    loginModal()
    return
  }
  return ((e) => clickHandle(e))()
}

const getToken = ()=>{ return Taro.getStorageSync('token')}

const isLogin = () => {
  let tok = getToken()
  if (tok === '' || tok === 'Guest') return false
  return true
}

// void call back
const vcb = () => {}

const showToast = (title) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 2000
  })
}

const isFunction = (fun) => {
  return typeof(fun) === 'function'
}

const isIpX = (model) => {
  return model.indexOf('iPhone X') !== -1
}

const getSys = () => {
  let sys = Taro.getSystemInfoSync()
  let botHeight = 0
  let topHeight = sys.statusBarHeight + 38  //38是小程序分享按钮高
  if (isIpX(sys.model)) {
    botHeight = 34
  }
  // screanHeight = windowHeight + navHeight
  return {
    botHeight, // iPhone x系列底部安全高度,
    topHeight,
    navHeight: topHeight + 12,  //navbar底部margin
    wHeight: sys.windowHeight,
    wWidth: sys.windowWidth,
    model: sys.model,
  }
}

const getDistance = (pa, pb) => {
  let dx = pa[0]*Math.PI/180.0 - pb[0]*Math.PI/180.0
  let dy = pa[1]*Math.PI/180.0 - pb[1]*Math.PI/180.0

  let s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(dx / 2), 2) + Math.cos(pa[0]) * Math.cos(pb[0]) * Math.pow(Math.sin(dy / 2), 2)))
  s = s*6378.137
 
  return s.toFixed(2)
}

module.exports = {
  setTimeout: timerWraper,
  loginModal,
  clickHooks,
  getToken,
  isLogin,
  vcb,
  showToast,
  isFunction,
  getSys,
  getDistance,
}