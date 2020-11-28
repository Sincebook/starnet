module.exports = {
  publicPath: './',
  // 跨域代理
  devServer: {
    proxy: {
      '/': {
        target: 'http://star.ti01.cn/',
        changeOrigin: true
      }
      // '/bingpic': {
      //   target: 'https://qnets.cn/bingpic/', // API服务器的地址
      //   ws: true, // 代理websockets
      //   changeOrigin: true, // 虚拟的站点需要更管origin
      //   pathRewrite: { // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
      //     '^/bingpic': ''
      //   },
      //   headers: { // header设置
      //     referer: 'https://qnets.cn/', // referer
      //     origin: 'https://qnets.cn/'
      //   }
      // }
    }
  },
  configureWebpack: {
    externals: 'hls.js'
  }
};
