/**
 * @file
 * Webpack config test.
 */

const path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.webpack.js', '.web.js', '*', '.scss', '.json']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './src')
        ],
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-class-properties',
            'transform-es2015-object-super',
            'transform-proto-to-assign',
            'transform-es2015-block-scoping',
            ['transform-es2015-classes', { loose: true }]
          ],
          presets: ["react", "airbnb"]
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        use: ['file-loader']
      },
    ],
  },
  externals: {
    jsdom: 'window',
    google: 'window.google',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  }
};
