var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  devServer: {
    contentBase: "www",
    historyApiFallback: true,
    port: 8080,
  },
  devtool: 'cheap-module-eval-source-map',
  entry: {
    yask: path.resolve(__dirname, 'src', 'js', 'index.dev.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'assets/js/[name].js',
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
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!less?sourceMap'),
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&name=assets/fonts/[name].[ext]&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&name=assets/fonts/[name].[ext]&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=assets/fonts/[name].[ext]'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&name=assets/fonts/[name].[ext]&mimetype=image/svg+xml'
    }],
  },
  plugins: [
    new ExtractTextPlugin('assets/css/[name].css', {
      allChunks: true
    }),
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
    children: false,
    colors: true
  },
};
module.exports = config;
