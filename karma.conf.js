/**
 * @file
 * Settings for karma plugins.
 */

const webpackConfig = require('./webpack.test.config');

webpackConfig.devtool = 'inline-source-map';

module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    // You can define custom flags.
    customLaunchers: {
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      },
      PhantomJS_debug: {
        base: 'PhantomJS',
        debug: true,
      },
    },
    files: [
      'webpack.tests.js'
    ],
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
    ],
    // Run the bundle through the webpack and sourcemap plugins.
    preprocessors: {
      'webpack.tests.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    singleRun: true,
    // Webpack config object.
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    }
  });
};
