import http from '@/utils/http';

// 获取热门工作
export function findHotJob(params) {
  return http.get('api/job/findHotJob', params);
}
