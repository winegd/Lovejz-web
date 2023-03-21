import request from '@/utils/request'

export function add_ucrelation(data) {
  return request({
    url: '/pc/admin/uc/add',
    method: 'post',
    data
  })
}
export function delete_ucrelation(data) {
  return request({
    url: '/pc/admin/uc/delete',
    method: 'post',
    data
  })
}

