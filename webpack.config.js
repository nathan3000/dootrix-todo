const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
var package = require('./package.json');
const WebpackShellPlugin = require('webpack-shell-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');


var isProd = (process.env.NODE_ENV === 'production');
var isDev = (process.env.NODE_ENV === 'development');

let publicUrl = isDev ? '/public' : ''

require('es6-promise').polyfill();

function getPlugins() {
    var plugins = [];

    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new StringReplacePlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.DedupePlugin(),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl
        })
    );

    // Conditionally add plugins for Production builds.
    if (isProd) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false
                }
            })
        );
    }

    // Conditionally add plugins for Development
    else {
        plugins.push(
            new WebpackShellPlugin({onBuildStart:['echo "Webpack Start -- DEV Build"'], onBuildEnd:['echo "Webpack End"']}),
            new webpack.HotModuleReplacementPlugin()
        );
    }

    return plugins;
}

module.exports = {

    entry: {
        app: isProd ? [
                './src/index.js'
            ] : [
                './src/index.js',
                "webpack-dev-server/client?http://0.0.0.0:7000",
                "webpack/hot/only-dev-server"
            ]
    },

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/'
    },

    resolve: {
        modulesDirectories: ['src', 'node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },

    module: {
        loaders: [
            { test: /(\.jsx?|\.js?)/, exclude: /(node_modules|bower_components)/, loader: 'babel', query: {presets: ['react', 'es2015', 'stage-0'], plugins: ['lodash']}},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.scss$/, loaders: ["style", "css", "postcss-loader", "sass"]},
            { test: /\.(png|gif)$/, loader: 'url-loader?limit=100000&name=./fonts/[hash].[ext]' },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]" }
        ]
    },

    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

    plugins: getPlugins(),

    devtool: isProd ? "cheap-module-source-map" : "inline-source-map",

    devServer: isDev ? require('./webpack.dev.config') : null

};
