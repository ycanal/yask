const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const OUTPUT = process.env.OUTPUT || path.resolve(__dirname, 'www');

const isProduction = NODE_ENV === 'production';

const config = {
  devServer: {
    contentBase: OUTPUT,
    historyApiFallback: true,
    port: 8080,
  },
  devtool: 'cheap-module-source-map',
  entry: {
    yask: path.resolve(__dirname, 'src', 'js', 'index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: isProduction ? 'noop-loader' : 'react-hot-loader'
      }, {
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: ['es2015', 'react'],
          compact: true,
        }
      }]
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader'],
      })
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, 'src', 'images', 'logo.svg')),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'templates', 'index.ejs'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(isProduction ? 'https://prod' : 'http://dev'),
      DEVTOOLS: !isProduction,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src', 'js'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  stats: {
    children: false,
    colors: true,
  },
};

module.exports = config;
