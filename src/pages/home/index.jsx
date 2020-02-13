import Taro, { Component } from '@tarojs/taro'
import {connect} from '@tarojs/redux'
import { View } from '@tarojs/components'


@connect(({ home }) => ({
  ...home,
}))
class Home extends Component {

  componentDidMount () { 

  }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const {} = this.props
    return (
      <View className='index'>
      </View>
    )
  }
}
export default Home