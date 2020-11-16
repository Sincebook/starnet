module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "semi": [2, "always"], // 强制语句分号结尾
    "no-var": 0, //使用let和const代替var
    'no-tabs': 'off',
    "space-before-function-paren": 0, //方法名和后面的括号之间不能出现空格
    "indent": ["off", 2]
  }
}
