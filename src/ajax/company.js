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

export function getComInfoById(params) {
  return http.get('/api/companyinfo/findById', params);
}
export function getComVideoByUserId(params) {
  return http.get('api/companyvideo/findByUserid', params);
};
export function getComPhotosByUserId(params) {
  return http.get('api/opus/findByTypeAndUserId', params);
}
export function getComGradeByUserId(params) {
  return http.get('api/companygrade/findByUserid', params);
}
export function showFunsNumsByUserId(params) {
  return http.get('api/funs/findByUserid', params);
}
export function attentionByStarId(params) {
  return http.get('api/funs/add`', params);
}
export function sendMessageToId(params) {
  return http.post('api/message/add', params);
}
export function fingComInfo(params) {
  return http.get('/api/companyinfo/findById', params);
}
// 根据名字搜索公司
export function findComByName(params) {
  return http.get('/api/companyinfo/findByName', params);
}
// 得到公司，人才，工作三个页面的背景
export function getBackGroundImgs() {
  return http.get('/api/company/findMine');
}
// 根据单个公司类别搜索公司
export function findByOneType(params) {
  return http.get('/api/companyinfo/findByCategory', params);
}
