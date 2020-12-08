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
