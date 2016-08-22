const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, '/app/scripts'),
  entry: {
    mainbar: './mainbar.js',
    commons: [
      './nav.js'
    ]
  },
  output: {
    path: path.join(__dirname, '/dist/scripts'),
    publicPath: '/scripts',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 2
    })
  ],
  debug: true,
  devtool: 'cheap-module-eval-source-map'
}
