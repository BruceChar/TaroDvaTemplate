import '@tarojs/async-await'  //没有该依赖会导致页面没注册的问题
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from './utils/dva'
import models from './models'

import Home from './pages/home/index'

const dvaApp = dva.createApp({
  initState: {},
  models: models
})
const store = dvaApp.getStore()

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/home/index',
      'pages/note/index',
      'pages/user/index',
      'pages/message/index',
      // 'pages/login/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'CoolPlayer',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './assets/images/tabbar/home.png',
          selectedIconPath: './assets/images/tabbar/home-active.png',
        },
        {
          pagePath: 'pages/note/index',
          text: '笔记',
          iconPath: './assets/images/tabbar/note.png',
          selectedIconPath: './assets/images/tabbar/note-active.png',
        },
        {
          pagePath: 'pages/message/index',
          text: '消息',
          iconPath: './assets/images/tabbar/message.png',
          selectedIconPath: './assets/images/tabbar/message-active.png',
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './assets/images/tabbar/user.png',
          selectedIconPath: './assets/images/tabbar/user-active.png',
        },
      ],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: 'white',
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
      
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
