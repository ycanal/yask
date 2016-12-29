var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
    yask: path.resolve(__dirname, 'src', 'js', 'index.prod.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'assets/js/[name].js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!less')
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('https://prod/api')
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
