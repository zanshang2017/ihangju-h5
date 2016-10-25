/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({ // Compile into js/build.js
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/app-h5/', //输出目录映射的线上资源url路径
        // publicPath: '//o8bwp9o9p.qnssl.com/app-h5/', //输出目录映射的线上资源url路径
    }, options.output), // Merge with env dependent settings
    module: {
        loaders: [{
            test: /\.js$/, // Transform all .js files required somewhere with Babel
            loader: 'babel',
            exclude: /node_modules/,
            query: options.babelQuery,
        }, {
            // Transform our own .css files with PostCSS and CSS-modules
            test: /\.s?css$/,
            exclude: /node_modules/,
            loader: options.sassLoaders,
        }, {
            // Transform our own .css files with PostCSS and CSS-modules
            test: /\.less/,
            // exclude: /node_modules/,
            loader: options.lessLoaders,
        }, {
            // Do not transform vendor's CSS with CSS-modules
            // The point is that they remain in global scope.
            // Since we require these CSS files in our JS or CSS files,
            // they will be a part of our compilation either way.
            // So, no need for ExtractTextPlugin here.
            test: /\.css$/,
            include: /node_modules/,
            loaders: ['style-loader', 'css-loader'],
        }, {
            test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
            loader: 'url-loader?limit=10000',
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=fonts/[name].[hash].[ext]',
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }],
    },
    plugins: options.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
            // make fetch available
            fetch: 'exports?self.fetch!whatwg-fetch',
        }),

        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        //[ todo 格式有问题！
        //    "antd", { style: "css" }
        //],
    ]),
    resolve: {
        modules: ['app', 'node_modules'],
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: [
            '',
            '.web.js',
            '.js',
            '.json',
            '.jsx',
            '.react.js',
        ],
        packageMains: [
            'jsnext:main',
            'main',
        ],
    },
    postcss: () => options.postcssPlugins,
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true,
});
