var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

var config = {
  devServer: {
    contentBase: "www",
    historyApiFallback: true,
    port: 8080,
  },
  entry: {
    yask: path.resolve(__dirname, 'src', 'js', 'index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: isProduction ? ['babel'] : ['react-hot', 'babel'],
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', isProduction ? 'css!less' : 'css?sourceMap!less?sourceMap'),
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }],
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, 'src', 'images', 'logo.svg')),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'templates', 'index.ejs'),
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(NODE_ENV === 'production' ? 'https://prod' : 'http://dev'),
      DEVTOOLS: !isProduction,
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      path.resolve(__dirname, 'src', 'js'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  stats: {
    children: false,
    colors: true
  },
};

if (isProduction) {
  config.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ].concat(config.plugins);
}

module.exports = config;
