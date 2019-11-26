/** 
 *  pages 页面快速生成脚本
 *  
 *  npm run page '文件名‘
*/

const fs = require('fs')
const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);

if (!dirName) {
    console.log('文件名不能为空');
    console.log('用法：npm run page your_page_name_to_create');
    process.exit(0);
}

// 页面模板构建
const indexTep =
`
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './${dirName}.scss'

@connect(({ ${dirName} }) => ({
    ...${dirName},
}))
class ${capPirName} extends Component {
  
  componentDidMount() {}

  config:Config = {
    navigationBarTitleText: '${dirName}'
  }
  
  render() {
      return (
      <View className='fx-${dirName}-wrap'>
          页面内容
      </View>
      )
  }
}
export default ${capPirName}
`

// scss 文件模板

const scssTep = ``
// `
//     @import "../../assets/scss/variables";
//     .#{$prefix} {
//         &-${dirName}-wrap {
//             width: 100%;
//             min-height: 100Vh;
//         }
//     }
// `


// 接口请求模板
const serviceTep =
`
import Api from '../../utils/request'
`

// model 模板
const modelTep = 
`
import * as ${dirName}Api from './service';
export default {
    namespace: '${dirName}',
    state: {
    },
    
    effects: {},
    
    reducers: {}
}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1
fs.writeFileSync(`index.tsx`, indexTep); //jsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync('service.ts', serviceTep); // service
fs.writeFileSync('model.ts', modelTep); // model
process.exit(0);