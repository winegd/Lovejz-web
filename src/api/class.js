import request from '@/utils/request'

export function getList () {
  return request({
    url: '/pc/class_list',
    method: 'get'
  })
}