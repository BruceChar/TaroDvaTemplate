
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './note.scss'

@connect(({ note }) => ({
    ...note,
}))
class Note extends Component {
  config:Config = {
      navigationBarTitleText: 'note'
  }

  componentDidMount() {}

  render() {
      return (
      <View className='fx-note-wrap'>
          页面内容
      </View>
      )
  }
}
export default Note
