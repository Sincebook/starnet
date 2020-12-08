import http from '@/utils/http';
// 微信|QQ登录后手机号绑定
export function bindPhone(obj) {
  return http.post('/api/wechat/checkPhoneCode', obj);
};
// 微信|QQ登录后 获取验证码
export function getBindCode(obj) {
  return http.get('/api/wechat/getPhoneCode', obj);
};
