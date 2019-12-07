// vue.config.js
module.exports = {
    // options...
    devServer: {
        useLocalIp: false,
        public: 'arduiknow.net:8080',
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: 'http://arduiknow.net:4209',
            },
        },
    }
}