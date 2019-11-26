import '@tarojs/async-await'  //没有该依赖会导致页面没注册的问题
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from './utils/dva'
import models from './models'

import Home from './pages/home/index'
import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models
})
const store = dvaApp.getStore()

class App extends Component {

  config = {
    pages: [
      'pages/home/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  

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
