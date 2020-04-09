/**
 * webapck基础配置
 */
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageJson = require('../package.json');
const projectRoot = process.cwd();

module.exports = function getBaseConfig(opts) {
    let isHash = opts.isHash || false;
    let isMiniCss = opts.isMiniCss || false;
    let jsFilename = 'js/[name]' + (isHash ? '.[chunkhash:8]' : '') + '.js';
    let commonchunkjsFilename = 'js/[name]' + (isHash ? '.[chunkhash:8]' : '') + '.js';
    let imgFilename = 'images/[name]' + (isHash ? '.[hash:8]' : '') + '.[ext]';
    let publicPath = opts.publicPath || './';
    let outPath = opts.outPath;
    let cleanPath = opts.clean;

    return {
        entry: {
            /* 入口 */
            app: './src/index.tsx'
        },
        output: {
            /* 出口 */
            path: path.resolve(projectRoot, outPath),
            filename: jsFilename,
            chunkFilename: commonchunkjsFilename,
            publicPath: publicPath,
            sourceMapFilename: '[file].map'
        },
        module: {
            /* 模块 */
            rules: [{
                test: /\.(j|t)sx?$/,
                include: [path.resolve('src')],
                use: [{
                    loader: 'cache-loader',
                    options: {
                        cacheDirectory: path.resolve('.cache-loader')
                    },
                }, {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }]
            }, {
                test: /.css$/,
                use: [
                    isMiniCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }, {
                test: /.less$/,
                use: [
                    isMiniCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: packageJson.theme
                        }
                    }
                ]
            }, {
                test: /\.(png|jpe?g|gif|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: imgFilename
                }
            }, {
                test: /\.svg$/,
                loader: '@svgr/webpack'
            }]
        },
        resolve: {
            /* 解析 */
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            modules: [path.resolve('src'), path.resolve('node_modules')],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: path.resolve('tsconfig.webpack.json'),
                    extensions: ['.ts', '.tsx', '.js', '.jsx']
                })
            ]
        },
        plugins: [
            /* 插件 */
            new CleanWebpackPlugin([cleanPath], {
                root: projectRoot
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    APP_ENV: JSON.stringify(process.env.APP_ENV)
                }
            }),
            // new webpack.DllReferencePlugin({
            //     manifest: require('../public/library.json')
            // }),
        ],
        stats: { children: false /* 取消子级信息 */ }
    }
}