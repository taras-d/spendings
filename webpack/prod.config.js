var webpack = require('webpack'),
    merge = require('webpack-merge'),
    path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin")
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

var paths = require('./paths.js'),
    baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    output: {
        filename: '[name].[hash].min.js',
        chunkFilename: '[name].chunk.[hash].min.js',
        path: path.join(paths.buildDir)
    },
    module: {
        rules: [
            // Process .less files and extract to single file
            // Use:
            // - css-loader to process css @imports and minify
            // - postcss-loader to add vendor prefixes
            // - less-loader to process less
            {
                test: /\.less$/,
                include: [
                    path.join(paths.srcDir, 'app'),
                    path.join(paths.srcDir, 'styles')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader', 
                            options: { 
                                url: false,
                                minimize: {
                                    discardComments: { removeAll: true }
                                }
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
                                paths: [ path.join(paths.srcDir, 'styles') ]
                            }
                        }
                    ]
                })
            }
        ]
    },
    stats: {
        maxModules: 0,
        children: false
    },
    plugins: [
        // Remove previous build
        new CleanWebpackPlugin('build', {
            root: path.join(__dirname, '..')
        }),
        // Enable production mode
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // Minify js bundles
        new webpack.optimize.UglifyJsPlugin({ 
            comments: false 
        }),
        // Extract css to single file
        new ExtractTextPlugin({
            filename: 'styles.[hash].min.css'
        }),
        // Include bundles in the index.html and save in build folder
        new HtmlWebpackPlugin({
            template: path.join(paths.srcDir, 'index.html'),
            filename: path.join(paths.buildDir, 'index.html')
        }),
        // Copy assets to build folder
        new CopyWebpackPlugin([{ 
            from: path.join(paths.srcDir, 'assets'),
            to: path.join(paths.buildDir, 'assets')
        }])
    ]
});