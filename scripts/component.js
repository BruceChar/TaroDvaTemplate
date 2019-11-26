/**
 * 组件模版快速生成脚本,执行命令 npm run cmp `组件名`
 */

const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run cmp test');
  process.exit(0);
}

const Dir = titleCase(dirName)

// 页面模版
const indexTep = `
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss';


export default class ${Dir}Cmp extends Component {
  static propTypes = {
    fieldToFill: PropTypes.string
  }

  static defaultProps = {
    fieldToFill: 'default value'
  }

  render() {
    return (
      <View className="${dirName}-cmp">
        ${dirName}
      </View>
    )
  }
}
`

// scss文件模版
const scssTep = 
`
@import "../../styles/mixin;"

.${dirName}-cmp {
  @include wh(100%, 100%)
}
`


fs.mkdirSync(`./src/components/${Dir}`); // mkdir $1
process.chdir(`./src/components/${Dir}`); // cd $1

fs.writeFileSync('index.js', indexTep)
fs.writeFileSync('index.scss', scssTep)

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
