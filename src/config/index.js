let URL = 'https://cmechat.xyz'

if (process.env.NODE_ENV === 'development') {
  URL = 'http://localhost:3721/'
}
// 请求连接前缀
export const baseUrl = URL

// 输出日志信息
export const noConsole = false