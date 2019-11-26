import Taro, { Component } from '@tarojs/taro'
import {connect} from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import './home.scss'

@connect(({ home }) => ({
  ...home,
}))
class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  }


  componentDidMount () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
export default Home