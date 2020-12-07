import http from '@/utils/http.js';
// 根据id请求工作详情
export function getJobById(params) {
  return http.get('/api/job/findById', params);
}
// 根据id请求用户信息---主要是头像和公司名称
export function getUserNH(params) {
  return http.get('/api/user/findById', params);
}
// 判断该用户是否关注了该明星
export function isFun(params) {
  return http.post('/api/funs/identify', params);
}
// 查找一个工作的所有role
export function getAllRoles(params) {
  return http.get('/api/role/findByJobid', params);
}
// 投递简历
export function applyJob(params) {
  return http.post('/api/information/applyJob', params);
}
// 判断是否已投递该角色
export function isApply(params) {
  return http.post('/api/information/isApply', params);
}
