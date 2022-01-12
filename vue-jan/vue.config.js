module.exports = {
    devServer: {
        proxy:{
            '^/api':{
                target: ' https://still-dawn-01227.herokuapp.com/',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/'}

            }
        }
    }
}
