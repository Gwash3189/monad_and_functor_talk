var webpack = require('webpack');

module.exports = {
  entry: './client/main.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        'drop_console': true,
        'drop_debugger': true,
        'warnings': false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: __dirname + '/client'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]"
      }
    ]
  }
};
