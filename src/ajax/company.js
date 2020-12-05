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
// 根据多个条件搜索公司
export function findByTwo(params) {
  return http.get('/api/companyinfo/findByTwo', params);
}

export function fingComInfo(params) {
  return http.get('/api/companyinfo/findById', params);
}
// 根据名字搜索公司
export function findComByName(params) {
  return http.get('/api/companyinfo/findByName', params);
}
