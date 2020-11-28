import http from '@/utils/http';
export function findHotCompany() {
  return http.get('/companyinfo/findHotCompany');
};
