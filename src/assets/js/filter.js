// 数字过滤器 大于1w +万字
let setNum = function (val) {
  if (!val) return 0;
  let num = val;
  if (val >= 10000) {
    num = (num / 10000).toFixed(1) + '万';
    return num;
  } else {
    return num;
  }
};
export {
  setNum
};
