import request from '@/utils/request'

export function updateKnowledge(data) {
  return request({
    url: '/pc/tch/knowledge/update',
    method: 'post',
    data
  })
}

export function addKnowledge(data) {
  return request({
    url: '/pc/tch/knowledge/add',
    method: 'put',
    data
  })
}

export function deleteKnowledge(data) {
  return request({
    url: '/pc/tch/knowledge/delete',
    method: 'delete',
    data
  })
}

export function get_chapterid(id) {
  return request({
    url: '/pc/tch/knowledge/getChapterId/'+id,
    method: 'get',
  })
}
