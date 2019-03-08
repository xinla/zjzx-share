// const vuxLoader = require('vux-loader');
const path = require("path");
module.exports = {
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'dist',
    pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, "./src/assets/styles/base.less")
      ]
    }
  }/*,
	configureWebpack: config => {
		require('vux-loader').merge(config, {
			options: {},
			plugins: ['vux-ui']
		})        
	},*/
}
