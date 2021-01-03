module.exports = {
    devServer: {
        proxy: {
            '/artifakt': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '/artifakt': '/',
                },
            },
        },
    },
}