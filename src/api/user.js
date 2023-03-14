import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/pc/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/pc/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/pc/logout',
    method: 'post'
  })
}
