/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2021-09-16 09:17:51
 * @LastEditors: zouwenqin
 * @LastEditTime: 2021-10-12 00:20:36
 */
// const port = '3000';
// const registerRouter = require('./backend/router');
module.exports = {
    publicPath: './', // 基本路径
    outputDir: 'dist', // 输出文件目录
    assetsDir: "static", //放置生成的静态文件目录（js css img）
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    css: {
        loaderOptions: {
            sass: {
                // 全局引入变量和 mixin
                additionalData: `@import "@/assets/scss/variable.scss";
                @import "@/assets/scss/mixin.scss";`
            }
        }
    },
    devServer: { // 前端服务设置代理处理跨域问题
        port: 3000,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `${process.env["VUE_APP_SERVE_REQUESTTYPE"]}${process.env["VUE_APP_SERVE_REQUESTURL"]}:${process.env["VUE_APP_SERVE_REQUESTPORT"]}`,
                changeOrigin: true,
                pathRewrite: {
                    [`^${process.env.VUE_APP_BASE_API}`]: ''
                }
            }
        }
    },
    configureWebpack: { // 设置打包环境的大小
        performance: {
            hints: 'warning',
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000
        }
    }
}