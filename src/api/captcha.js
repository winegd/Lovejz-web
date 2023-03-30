import request from '@/utils/request'

export function get_captcha() {
  return request({
    url: '/pc/get_captcha',
    method: 'get'
  })
}
export function verify_captcha(data) {
  return request({
    url: '/pc/verify_captcha',
    method: 'post',
    data
  })
}
