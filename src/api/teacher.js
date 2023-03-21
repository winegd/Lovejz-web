import request from '@/utils/request'


export function getTchList() {
  return request({
    url: '/pc/admin/tch/list',
    method: 'get'
  })
}
export function add_Tch(data){
  return request({
    url: '/pc/admin/tch/add',
    method: 'post',
    data
  })
}

export function update_tch(data) {
  return request({
    url: '/pc/admin/tch/update',
    method: 'post',
    data
  })
}

export function delete_tch(data) {
  return request({
    url: '/pc/admin/tch/delete',
    method: 'post',
    data
  })
}


