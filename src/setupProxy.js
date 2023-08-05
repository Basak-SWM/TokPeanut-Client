const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "http://api.tokpeanut.com:8080",
      changeOrigin: true,
    })
  );
};
