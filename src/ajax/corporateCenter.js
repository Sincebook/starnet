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
// 添加带封面企业视频
export function addCompanyCoverVideo(obj) {
  return http.post('/api/companyvideo/addVideo', obj);
};
// 获取企业视频
export function CompanyVideo(obj) {
  return http.get('/api/companyvideo/findAllMyVideos', obj);
};
// 删除企业视频
export function deleteCompanyVideo(obj) {
  return http.post('/api/companyvideo/deleteMine', obj);
};
// 获取所有投递记录
export function findAllDeliver(obj) {
  return http.get('/api/information/findAllApplysByJobid', obj);
};
// 查看简历
export function viewCv(obj) {
  return http.post('/api/information/browse', obj);
};
// 拒绝录用
export function refuseUser(obj) {
  return http.post('/api/information/refuse', obj);
};
// 意向面试
export function intentionUser(obj) {
  return http.post('/api/information/consider', obj);
};
// 确认录用
export function offerUser(obj) {
  return http.post('/api/information/offer', obj);
};
// 获取企业类型
export function getCompanyType(obj) {
  return http.get('/api/companytype/findAll', obj);
};
// 我的系统消息
export function comNotice(obj) {
  return http.get('/api/news/findMine', obj);
}
// 删除某条消息
export function deletecomNotice(obj) {
  return http.post('/api/news/deleteById', obj);
}
// 判读是否有新消息
export function iscomNews(obj) {
  return http.get('/api/news/news', obj);
}
