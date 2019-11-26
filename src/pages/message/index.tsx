
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './message.scss'

@connect(({ message }) => ({
    ...message,
}))
class Message extends Component {
  config:Config = {
      navigationBarTitleText: 'message'
  }

  componentDidMount() {}

  render() {
      return (
      <View className='fx-message-wrap'>
          页面内容
      </View>
      )
  }
}
export default Message
