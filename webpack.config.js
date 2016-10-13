const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const escapeRegExp = require('lodash/escapeRegExp');

module.exports = function(webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');

  webpackConfig.babel.plugins.push(['antd', {
    style: true,  // use less if true
  }]);

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