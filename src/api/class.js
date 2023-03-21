import request from '@/utils/request'


export function getList() {
  return request({
    url: '/pc/admin/class/list',
    method: 'get'
  })
}
export function add_class(data) {
  return request({
    url: '/pc/admin/class/add',
    method: 'post',
    data
  })
}

export function update_class(data) {
  return request({
    url: '/pc/admin/class/update',
    method: 'post',
    data
  })
}

export function delete_class(data) {
  return request({
    url: '/pc/admin/class/delete',
    method: 'post',
    data
  })
}
export function addOrUpdate_class(data) {
  return request({
    url: '/pc/admin/class/addOrUpdate',
    method: 'post',
    data
  })
}

