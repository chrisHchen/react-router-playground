const webpack = require('webpack')
const path = require('path')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const buildPath = path.resolve(__dirname, 'build');


var plugins = [
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

module.exports = {
  entry:{
    app:path.join(__dirname, 'src/app.js')
  },
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js',
    chunkFilename: '[name].js'
  },
  devtool: 'eval',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader',
        ],
      },
    ],
  }
}
