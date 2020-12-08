module.exports = {
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        port: 8080,
        // 端口号
        https: false,
        // https:{type:Boolean}
        open: false,
        //配置自动启动浏览器
        hotOnly: true,
        proxy: { 
            //配置跨域
            "/api": {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api": "/"
                }
            },
            //测试跨域
            "/getman": {
                target: process.env.VUE_APP_WS_API,
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/getman": "/"
                }
            },
        }
    }
}