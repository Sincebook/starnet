import http from '@/utils/http';

export function findByTalentNew(params) {
  return http.get('/api/userinfo/findByUptime', params);
}
// 根据多个条件搜索人才
export function findByThree(params) {
  return http.get('/api/userinfo/findByThree', params);
}
// 根据名字查询
export function findByName(params) {
  return http.get('/api/userinfo/findByName', params);
}
// 请求热门工作
export function findHotTalent(params) {
  return http.get('/api/userinfo/findHotTalents', params);
}
// 获取每个用户的背景
export function getUserBg(params) {
  return http.get('/api/banner/findByUserId', params);
}
