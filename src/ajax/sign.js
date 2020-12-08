import http from '@/utils/http';
// 必应每日壁纸
export function getSignBg(options) {
  return http.get('/bingpic/bing?format=js&idx=0&n=1', options);
};
// 获取验证码
export function getCode(options) {
  return http.post('/api/user/code', options);
};
// 手机号注册
export function registerUser(options) {
  return http.post('/api/user/add', options);
};
// 手机号登录
export function loginUser(options) {
  return http.post('/api/user/login', options);
};
// 微信登录
export function wxLogin(obj) {
  return http.get('http://120.53.246.144:9091/login', obj);
};
