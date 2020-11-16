import http from '@/utils/http';

export function getOtherInfo (options) {
  return http.get('https://v1.hitokoto.cn/?c=i', options);
};
