import request from '@/utils/request'

export  function getList() {
  return request({
    url: '/pc/tch/chapter/list',
    method: 'get'
  })
}
export  function getChapters() {
  return request({
    url: '/pc/tch/chapter/chapters',
    method: 'get'
  })
}

export  function deleteChapters(data) {
  return request({
    url: '/pc/tch/chapter/delete',
    method: 'delete',
    data
  })
}

export  function updateChapter(data) {
  return request({
    url: '/pc/tch/chapter/update',
    method: 'post',
    data
  })
}

export  function addChapter(data) {
  return request({
    url: '/pc/tch/chapter/add',
    method: 'put',
    data
  })
}
