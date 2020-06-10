module.exports = {
    runtimeCompiler: true,
    css: {
        extract: false,
    },
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        output: {
            filename: 'payment-widget.js'
        },
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/widget/payment-widget/'
        : '/'

}
