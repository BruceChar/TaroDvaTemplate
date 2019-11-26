
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './user.scss'

@connect(({ user }) => ({
    ...user,
}))
class User extends Component {
  config:Config = {
      navigationBarTitleText: 'user'
  }

  componentDidMount() {}

  render() {
      return (
      <View className='fx-user-wrap'>
          页面内容
      </View>
      )
  }
}
export default User
