import http from '@/utils/http';

// 获取热门工作
export function findHotJobs(params) {
  return http.get('api/job/findHotJob', params);
}

// 获取热点人才
export function findHotTalents(params) {
  return http.get('/api/userinfo/findHotTalents', params);
}
