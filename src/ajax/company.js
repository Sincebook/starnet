import http from '@/utils/http';
export function findHotCompany() {
  return http.get('/api/companyinfo/findHotCompany');
};

export function findByUptime(params) {
  return http.get('/api/companyinfo/findByUptime', params);
}

export function findByCategory(params) {
  return http.get('/api/companyinfo/findByCategory', params);
}

export function findByTwo(params) {
  return http.get('/api/companyinfo/findByTwo', params);
}
