import http from '@/utils/http';

export function getSignBg (options) {
  return http.get('/bingpic/bing?format=js&idx=0&n=1', options);
};
