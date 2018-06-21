const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = (...url) => path.resolve(__dirname, ...url)

const config = {
  mode: 'development',
  entry: resolve('src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: resolve('dist'),
  },
  devServer: {
    contentBase: resolve('dist'),
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      { test: /\.js/, loader: 'babel-loader' },
      { test: /\.vue/, loader: 'vue-loader' },
      { test: /\.css/, loader: ['css-loader', 'sass-loader'] },
      { test: /\.html/, loader: 'html-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
    }),
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
  ],
}

module.exports = config
