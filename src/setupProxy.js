const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.ly.gov.tw',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // 這裡應該是空字符串，因為我們在請求中已經包含了完整的路徑
      },
    })
  );
};
