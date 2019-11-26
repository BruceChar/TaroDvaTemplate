import request from '../../utils/request'

export const test = () => {
  return request.get({
    url: 'api/test',
  })
}

export const another = () => {

}

