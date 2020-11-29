import http from '@/utils/http';
export function findHotCompany() {
  return http.get('/companyinfo/findHotCompany');
};

export function findByUptime(params) {
  return http.get('/companyinfo/findByUptime', params);
}

export function findByCategory(params) {
  return http.get('/companyinfo/findByCategory', params);
}

export function findByTwo(params) {
  return http.get('/companyinfo/findByTwo', params);
}
