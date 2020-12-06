import http from '@/utils/http';
// 获取个人卡片资料
export function mineInfo() {
  return http.get('/api/user/findMine');
};
// 修改个人资料
export function extraInfo(obj) {
  return http.post('/api/user/modify', obj);
};
// 实名认证
export function celebrity(obj) {
  return http.post('/api/userinfo/add', {
    name: obj.name,
    idcard: obj.idcard,
    image: obj.imageFile
  });
};
// 获取详细简历
export function mineInfoDetail() {
  return http.get('/api/userinfo/findMyInfo');
};
// 修改简历(带图片)
export function extraInfoDetail(obj) {
  return http.post('/api/userinfo/modify', obj);
};
// 修改简历(不带图片)
export function extraInfoDetail1(obj) {
  return http.post('/api/userinfo/extra', obj);
};
// 我的私信
export function mineMessage(obj) {
  return http.get('/api/message/findMine', obj);
};
// 我的作品
export function mineOpus(obj) {
  return http.get('/api/opus/findMineOpus', obj);
};
// 添加作品
export function addOpus(obj) {
  return http.post('/api/opus/add', obj);
};
// 删除作品
export function deleteOpus(obj) {
  return http.post('/api/opus/deleteById', obj);
};
// 我的所有投递
export function mineDeliver(obj) {
  return http.get('/api/information/findAll', obj);
};
// 取消投递
export function cancelDeliver(obj) {
  return http.post('/api/information/cancel', obj);
};
// 回复私信
export function replayMessage(obj) {
  return http.post('/api/message/add', obj);
};
// 删除私信
export function deteleMessage(obj) {
  return http.post('/api/message/deleteById', obj);
};
// 我的所有收藏
export function mineCollect(obj) {
  return http.get('/api/collect/findMyCollect', obj);
};
// 取消收藏
export function cancelCollect(obj) {
  return http.post('/api/collect/delete', obj);
};
// 我的所有关注
export function mineFollow(obj) {
  return http.get('/api/funs/findMyStar', obj);
};
// 取消收藏
export function cancelFollow(obj) {
  return http.post('/api/funs/deleteById', obj);
};
// 举报
export function report(obj) {
  return http.post('/api/report/add', obj);
};
