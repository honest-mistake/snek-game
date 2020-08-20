const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const resolve = path.resolve.bind(null, __dirname);
const buildPath = resolve('build');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/js/index.js',
    resolve: {
        extensions: ['.js', '.json', '.scss'],
        alias: {}
    },
    output: {
        filename: 'main.js',
        path: buildPath
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new CopyPlugin({
            patterns: [
                {from: resolve('src/html/index.html'), to: buildPath}
            ]
        })
    ],
    devServer: {
        contentBase: buildPath,
        port: 9000,
        hot: true,
        open: {
            apps: ['Google Chrome', '---incognito']
        }
    }
};