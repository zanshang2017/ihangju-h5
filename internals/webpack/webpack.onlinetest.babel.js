// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = require('./webpack.base.babel')({
    // In production, we skip all hot-reloading stuff
    entry: [
        path.join(process.cwd(), 'app/app.js'),
    ],

    publicPath: 'https://o8bwp9o9p.qnssl.com/app-h5-test/',

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].chunk.js',
    },

    // We use ExtractTextPlugin so we get a seperate CSS file instead
    // of the CSS being in the JS and injected as a style tag
    cssLoaders: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules&importLoaders=1!postcss-loader'
    }),
    sassLoaders: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules&importLoaders=1!sass-loader'
    }),
    lessLoaders: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules&importLoaders=1!less-loader'
    }),

    // In production, we minify our CSS with cssnano
    postcssPlugins: [
        postcssFocus(),
        cssnext({
            browsers: ['last 2 versions', 'IE > 10'],
        }),
        postcssReporter({
            clearMessages: true,
        }),
    ],
    plugins: [

        // OccurrenceOrderPlugin is needed for long-term caching to work properly.
        // See http://mxs.is/googmv
        new webpack.optimize.OccurrenceOrderPlugin(true),

        // Merge all duplicate modules
        new webpack.optimize.DedupePlugin(),

        // Minify and optimize the JavaScript
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false, // ...but do not show warnings in the console (there is a lot of them)
            },
        }),

        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),

        // Extract the CSS into a seperate file
        new ExtractTextPlugin('css/[name].[contenthash].css'),

    ],
});
