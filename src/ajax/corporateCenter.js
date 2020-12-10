import http from '@/utils/http';
// 获取企业信息
export function companyInfo() {
  return http.get('/api/companyinfo/findMyInfo');
};
// 添加企业荣誉
export function addGrade(obj) {
  return http.post('/api/companygrade/add', obj);
};
// 删除企业荣誉
export function deleteGrade(obj) {
  return http.post('/api/companygrade/deleteById', obj);
};
// 获取所有企业荣誉
export function getGrade(obj) {
  return http.get('/api/companygrade/findByUserid', obj);
};
// 企业认证
export function celebrityCompany(obj) {
  return http.post('/api/companyinfo/modifyById', obj);
};
// 企业在招职位
export function companyJob(obj) {
  return http.get('/api/job/findMine', obj);
};
