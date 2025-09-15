const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8085, // 将此处的3000改为你想要的端口号:cite[1]:cite[4]
    // 其他devServer配置...
  },
});
