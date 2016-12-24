var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

var config = {
  devServer: {
    contentBase: "www",
    historyApiFallback: true,
    port: 8080,
  },
  devtool: 'cheap-module-eval-source-map',
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
      loaders: ['react-hot', 'babel'],
    }, {
      test: /\.less$/,
      loader: extractLESS.extract('style', 'css-loader?sourceMap!less-loader?sourceMap'),
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
    extractLESS,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'html', 'index.template.ejs'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('http://localhost:8080')
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
    colors: true
  },
};
module.exports = config;
