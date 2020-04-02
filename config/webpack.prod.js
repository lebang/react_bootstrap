/**
 * 线上环境配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.base');
const path = require('path');
const projectRoot = process.cwd();

const baseConfig = config({
    isHash: true,
    isMiniCss: true,
    publicPath: '/', /* cdn地址 */
    outPath: './dist/',
    clean: "dist"
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
            chunksSortMode: 'dependency'
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ],
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
    stats: {
        warnings: false, // 取消警告信息
    }
};

module.exports = merge(baseConfig, prodConfig);