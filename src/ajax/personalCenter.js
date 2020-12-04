import http from '@/utils/http';
export function mineInfo() {
  return http.get('/api/user/findMine');
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
// 修改简历
export function extraInfoDetail(obj) {
  return http.post('/api/userinfo/extra', {
    nickname: obj.nick,
    image: obj.avatarImg,
    contry: obj.country,
    nation: obj.nation,
    sex: obj.sex,
    birthArea: obj.home
  });
};
// 我的私信
export function mineMessage(obj) {
  return http.get('/api/message/findMine', obj);
};
// 我的私信
export function mineOpus(obj) {
  return http.get('/api/opus/findMineOpus', obj);
};
