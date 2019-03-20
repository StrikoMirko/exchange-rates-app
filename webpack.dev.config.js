/**
 * @file
 * Webpack config dev.
 */

var path = require('path');
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');


process.traceDeprecation = true;

module.exports = {
  mode: 'development',
  devtool: "eval",
  context: path.join(__dirname),
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dev-bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WriteFilePlugin({
      test: /dev-bundle/,
      useHashIndex: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc'
        }
      }
    })
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
    extensions:[".js", ".jsx", ".webpack.js", ".web.js","*"]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        enforce: 'pre',
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        use: "css-loader"
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader"},
          { loader: "css-loader"},
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [ require('autoprefixer')({}) ]
            }
          },
          { loader: "sass-loader"}
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
            "transform-class-properties",
            "transform-es2015-object-super",
            "transform-proto-to-assign",
            "transform-es2015-block-scoping",
            ["transform-es2015-classes", { "loose": true }]
          ],
          presets: ["react", "airbnb"]
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        use: ['file-loader']
      },
    ],
  }
};
