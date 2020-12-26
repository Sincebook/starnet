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
// 删除企业在招职位
export function deleteJob(obj) {
  return http.post('/api/job/deleteById', obj);
};
// 职位类型
export function getJobType(obj) {
  return http.get('/api/jobtype/findAll', obj);
};
// 发布职位
export function addJob(obj) {
  return http.post('/api/job/add', obj);
};
// 修改职位
export function editJob(obj) {
  return http.post('/api/job/modifyById', obj);
};
// 查找职位下的所有角色
export function getAllRole(obj) {
  return http.get('/api/role/findByJobid', obj);
};
// 添加角色
export function addRole(obj) {
  return http.post('/api/role/add', obj);
};
// 删除角色
export function deleteRole(obj) {
  return http.post('/api/role/deleteById', obj);
};
// 添加企业视频
export function addCompanyVideo(obj) {
  return http.post('/api/companyvideo/add', obj);
};
// 获取企业视频
export function CompanyVideo(obj) {
  return http.get('/api/companyvideo/findAllMyVideos', obj);
};
// 删除企业视频
export function deleteCompanyVideo(obj) {
  return http.post('/api/companyvideo/deleteMine', obj);
};
