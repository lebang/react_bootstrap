const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, '../public'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, '../public/[name].json')
        })
    ]
}