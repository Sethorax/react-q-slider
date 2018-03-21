const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

/**
 * WEBPACK CONFIG
 */
module.exports = env => {
    return {
        entry: {
            index: (env === 'production') ? './src/index.js' : './build/entry.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: new RegExp(`node_modules`),
                    use: {
                        loader: 'babel-loader'
                    }
                }, {
                    test: /\.(css|sass|scss)$/,
                    exclude: /(bower_components)/,
                    use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: (env === 'dev')
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: (env === 'dev'),
                            minimize: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: (env === 'dev')
                        }
                    }]
                }
            ]
        },
        mode: (env === 'dev') ? 'development' : 'production',
        plugins: [],
        externals: (env === 'dev') ? {} : nodeExternals(),
        output: {
            filename: 'react-q-slider.js',
            chunkFilename: '[name].js',
            path: path.resolve('./dist')
        }
    };
};