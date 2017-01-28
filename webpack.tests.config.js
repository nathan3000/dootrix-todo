var config = require('./webpack.config');
var nodeExternals = require('webpack-node-externals');

config.target = 'node';  // in order to ignore built-in modules like path, fs, etc.
config.externals = [nodeExternals(), { 'config/config': 'IAR_CONFIG_TEST'}]; // in order to ignore all modules in node_modules folder
config.output = {
    // sourcemap support for IntelliJ/Webstorm
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
};
config.devtool = "cheap-module-source-map"; // faster than 'source-map'

module.exports = config;
