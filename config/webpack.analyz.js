/**
 * 项目分析
 */
var merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var baseConfig = process.env.APP_ENV === 'staging'
    ? require('./webpack.staging.js') : require('./webpack.prod.js');

var analyzConfig = {
    plugins: [
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ]
};

analyzConfig = merge(baseConfig, analyzConfig);

module.exports = analyzConfig;