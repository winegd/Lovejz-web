import request from '@/utils/request'

export  function deleteOption(id) {
  return request({
    url: '/pc/tch/option/delete/'+id,
    method: 'delete',
  })
}
