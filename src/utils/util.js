// 时间戳转换方法    date:时间戳数字
function formatDate(date1) {
  let date = new Date(parseInt(date1));
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  // let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  // let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  // let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD;
}
export {
  formatDate
};
