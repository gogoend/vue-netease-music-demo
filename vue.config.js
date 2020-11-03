module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://120.77.146.86:3000",
                ws: true, 
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
};