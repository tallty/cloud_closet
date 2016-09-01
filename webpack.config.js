// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const escapeRegExp = require('lodash/escapeRegExp');

module.exports = function (webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['antd', {
    style: true,  // if true, use less
  }]);

  // Enable this if you have to support IE8.
  // webpackConfig.module.loaders.unshift({
  //   test: /\.jsx?$/,
  //   loader: 'es3ify-loader',
  // });

  // Parse all less files as css module.
  // webpackConfig.module.loaders.forEach(function(loader, index) {
  //   if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
  //     loader.test = /\.dont\.exist\.file/;
  //   }
  //   if (loader.test.toString() === '/\\.module\\.less$/') {
  //     loader.test = /\.less$/;
  //   }
  // });
  
  // less files in "node_modules" folders and files named "global.less" or "*-global.less"
  const globalLessMatch = new RegExp('(?:/node_modules/.+|/global/.+-global)\\.less$');
  // less files in project "src" folder
  const localLessMatch = new RegExp('^' + escapeRegExp(__dirname) + '/src/.+\\.less$');
  webpackConfig.module.loaders.forEach(function(loader) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      // Parse these as global CSS
      loader.test = globalLessMatch;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      // Parse these as local-scoped CSS modules. Global CSS matches are excluded
      loader.test = function(pth) {
        return localLessMatch.test(pth) && !globalLessMatch.test(pth);
      };
    }
  });

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entries/*.js');
  const newEntries = files.reduce(function(memo, file) {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);

  return webpackConfig;
};
