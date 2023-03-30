import request from '@/utils/request'

export function get_qiniuToken() {
  return request({
    url: '/stu/getQiNiuUpToken',
    method: 'get'
  })
}

export function upload_pic(data) {
  return request({
    url: 'https://up-z1.qiniup.com',
    method: 'POST',
    data
  })
}
