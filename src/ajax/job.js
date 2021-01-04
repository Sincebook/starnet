import http from '@/utils/http';

// 获取热门工作
export function findHotJob(params) {
  return http.get('/api/job/findHotJob', params);
}
// 根据名字搜索项目
export function findJobByName(params) {
  return http.get('/api/job/findByTitle', params);
}
// 请求最新工作
export function findJobUptime(params) {
  return http.get('/api/job/findByUptime', params);
}
// 多个条件匹配公司
export function findJobByThree(params) {
  return http.get('/api/job/findByThree', params);
}
// 根据类别搜索项目
export function findJobByType(params) {
  return http.get('/api/job/findByJob', params);
}
