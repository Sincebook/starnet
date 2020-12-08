import http from '@/utils/http';

export function findByTalentNew(params) {
  return http.get('/api/userinfo/findByUptime', params);
}
