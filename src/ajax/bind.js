import http from '@/utils/http';
// 微信登录后手机号绑定
export function bindPhone(obj) {
  return http.post('/api/wechat/checkPhoneCode', obj);
};
// 微信登录后 获取验证码
export function getBindCode(obj) {
  return http.get('/api/wechat/getPhoneCode', obj);
};
// 微博登录后手机号绑定
export function bindWbPhone(obj) {
  return http.post('/api/weibo/checkPhoneCode', obj);
};
// 微博登录后 获取验证码
export function getBindWbCode(obj) {
  return http.get('/api/weibo/getPhoneCode', obj);
};
// 退出登录
export function getOutLogin() {
  return http.post('/api/user/logout');
}
