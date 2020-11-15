import http from '@/utils/http'

export function getOtherInfo (options) {
  return http.get('http://127.0.0.1:8360/api/index/index', options)
}
