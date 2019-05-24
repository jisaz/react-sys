const path = require('path');

module.exports = function override(config, env) {
  config.entry.unshift(
    'babel-polyfill'
  );

  config.resolve.alias = Object.assign(config.resolve.alias, {
    '-': path.resolve(__dirname, './src'),
    '@': path.resolve(__dirname, './src'),
  });

  if (env === 'development') {
    // 相对路径
    config.output.publicPath = '';
    config.output.filename = './static/js/bundle.js';
    config.output.chunkFilename = './static/js/[name].chunk.js';
  }
  return config;
};
