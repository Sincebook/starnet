import http from '@/utils/http';

// 根据id获取简历信息
export function userinfoById(params) {
  return http.get('/api/userinfo/findById', params);
}
// 关注他
export function watchIt(params) {
  return http.post('/api/funs/add', params);
}
// 取消关注
export function noWatch(params) {
  return http.post('/api/funs/deleteById', params);
}
// 添加一个留言
export function addMsg(params) {
  return http.post('/api/message/add', params);
}
// 查找一个用户的粉丝量
export function getFuns(params) {
  return http.get('/api/funs/findByUserid', params);
}
// 搜索某个用户的图片
export function getUserImg(params) {
  return http.get('/api/opus/findByTypeAndUserId', params);
}
// 查找用户的所有workinfo
export function getUserWork(params) {
  return http.get('/api/workinfo/findByUserid', params);
}
// 查找给这个用户的所有留言
export function getAllMomes(params) {
  return http.get('/api/memos/findByToid', params);
}
// 给用户添加一个留言
export function addMemos(params) {
  return http.post('/api/memos/add', params);
}
