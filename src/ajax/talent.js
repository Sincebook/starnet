import http from '@/utils/http';
// 获取最新人才
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
// 请求热门人才
export function findHotTalent(params) {
  return http.get('/api/userinfo/findHotTalents', params);
}
// 根据职业搜索人才
export function findByVocation(params) {
  return http.get('/api/userinfo/findByVocation', params);
}
