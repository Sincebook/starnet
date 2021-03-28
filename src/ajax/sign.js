import http from '@/utils/http';
// 壁纸
export function getSignBg(options) {
  return http.get('/api/company/findMine', options);
};
// 获取验证码
export function getCode(options) {
  return http.post('/api/user/code', options);
};
// 手机号注册
export function registerUser(options) {
  return http.post('/api/user/register', options);
};
// 手机号登录
export function loginUser(options) {
  return http.post('/api/user/login', options);
};
// 密码登录
export function passwordUser(options) {
  return http.post('/api/user/password', options);
}
// 邮箱登录
export function emailLogin(options) {
  return http.post('/api/user/email', options);
}
// 微信登录
export function wxLogin(obj) {
  return http.get('/api/wechat/login', obj);
};
// 微博登录
export function wbLogin(obj) {
  return http.get('/api/weibo/login', obj);
};
// 获取登录后的个人信息
export function getMyinfo(params) {
  return http.get('/api/user/findMine', params);
}
export function changePassword(options) {
  return http.post('/api/user/change', options);
}
