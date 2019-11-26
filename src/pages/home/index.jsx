import Taro, { Component } from '@tarojs/taro'
import {connect} from '@tarojs/redux'
import { View, Text } from '@tarojs/components'

import SwiperCmp from '../../components/Swiper'
import * as api from './service'
import './home.scss'

@connect(({ home }) => ({
  ...home,
}))
class Home extends Component {

  componentDidMount () { 

    this.props.dispatch({
      type: 'home/testMock'
    }).then(re => {
      console.log("dispatch then:", re)
      console.log(this.props)
    })
    // api.test().then(res => {
    //   console.log("result: ", res)
    //   let user = Taro.getUserInfo()
    //   console.log("user:", user)
    // })
    // .catch(err => {
    //   console.error("catch:", err)
    // })
    
    

  }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const { banner } = this.props
    return (
      <View className='index'>
        <SwiperCmp banner={banner} home></SwiperCmp>
      </View>
    )
  }
}
export default Home