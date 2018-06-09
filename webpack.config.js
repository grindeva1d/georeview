let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let rules = require('./webpack.config.rules')();
let path = require('path');

rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
    })
});

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('dist')
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    },
    performance: {
        hints: false
    },
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    devtool: 'source-map',
    module: { rules },
    // optimization: {
    //     minimize: true
    // },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlPlugin({
            title: 'Геоотзыв',
            template: './src/index.hbs'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
