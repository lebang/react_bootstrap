/**
 * 测试环境配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const config = require('./webpack.base');
const path = require('path');
const projectRoot = process.cwd();

const baseConfig = config({
    isHash: false,
    isMiniCss: true,
    publicPath: '/',
    outPath: './staging/',
    clean: 'staging',
});


const prodConfig = {
    mode: 'production',
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(projectRoot, `./public/index.html`),
            favicon: './public/favicon.ico',
            title: '<%=name%>',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: "dependency"
        })
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
};

module.exports = merge(baseConfig, prodConfig);