var path = require('path'),
    webpack = require('webpack');

var paths = require('./paths.js');

module.exports = {
    entry: {
        // Split code into three chunks: app, vendors and polyfills 
        // These files will be automatically included in the index.html by HtmlWebpackPlugin
        app: path.join(paths.srcDir, 'app/main.js'),
        vendors: path.join(paths.srcDir, 'app/vendors.js'),
        polyfills: path.join(paths.srcDir, 'app/polyfills.js')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // Aliases for common api, components and containers
            // (https://webpack.js.org/configuration/resolve/#resolve-alias)
            api: path.join(paths.srcDir, 'app/api'),
            components: path.join(paths.srcDir, 'app/components'),
            containers: path.join(paths.srcDir, 'app/containers')
        }
    },
    module: {
        rules: [
            // Process .js and .jsx files
            // Use babel-loader to transform ES2015+ to ES5
            {
                test: /\.jsx?$/,
                include: [
                    path.join(paths.srcDir, 'app')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env', 'react'],
                        plugins: [
                            'syntax-dynamic-import',
                            'transform-class-properties',
                            'transform-object-rest-spread'
                        ]
                    }
                }
            },
            // Process .css files
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // Put common modules in vendors chunk
        new  webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendors' 
        })
    ]
};