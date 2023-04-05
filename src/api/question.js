import request from '@/utils/request'

export function addQuestion(data) {
  return request({
    url: '/pc/tch/question/add',
    method: 'put',
    data
  })
}
export function getQuestionTotal() {
  return request({
    url: '/pc/tch/question/total',
    method: 'get',
  })
}

export function getQuestions(offset,pagesize) {
  return request({
    url: '/pc/tch/question/getQuestion/'+offset+'/'+pagesize,
    method: 'get'
  })
}

export function deleteQuestions(id) {
  return request({
    url: '/pc/tch/question/delete/'+id,
    method: 'delete'
  })
}
export function searchQuestions(offset,pagesize,content) {
  return request({
    url: '/pc/tch/question/search/'+offset+'/'+pagesize+'/'+content,
    method: 'get'
  })
}
