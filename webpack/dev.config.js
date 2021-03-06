const path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge')
    
const HtmlWebpackPlugin = require('html-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require('./paths.js'),
    baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            // Process .less files
            // Use:
            // - style-loader to insert <style> tags in the DOM
            // - css-loader to process css @imports
            // - postcss-loader to add vendor prefixes
            // - less-loader to process less
            {
                test: /\.less$/,
                include: [
                    path.join(paths.srcDir, 'app'),
                    path.join(paths.srcDir, 'styles')
                ],
                use: [
                    { loader: 'style-loader' }, 
                    { 
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [ require('autoprefixer') ]
                        }
                    }, 
                    { 
                        loader: 'less-loader',
                        options: {
                            // Include 'styles' folder to simplify import for styles
                            // "@import '../../../styles/variables'" => "@import 'variables'"
                            paths: [ path.join(paths.srcDir, 'styles') ]
                        }
                    },
                ]
            }
        ]
    },
    devServer: {
        contentBase: paths.srcDir,
        overlay: true,
        stats: 'minimal',
        port: 8070
    },
    plugins: [
        // Include bundles in the index.html
        new HtmlWebpackPlugin({
            template: path.join(paths.srcDir, 'index.html')
        })
    ]
});