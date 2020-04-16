/**
 * 开发环境配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = config({
    isHash: false,
    isMiniCss: false,
    publicPath: '/',
    outPath: './dev/',
    clean: 'dev',
});

const devConfig = {
    mode: 'development',
    devServer: {
        historyApiFallback: false,
        disableHostCheck: true,
        progress: true,
        hot: true,
        inline: true,
        contentBase: false,
        // port: 8081,
        open: true
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            inject: true
        }),
    ],
    stats: {
        warnings: false, // 取消警告信息
        children: false, // 取消子级信息
        modules: false, // 取消模块构建信息
        // entrypoints: false // 不显示入口起点
    }
}

module.exports = merge(baseConfig, devConfig);