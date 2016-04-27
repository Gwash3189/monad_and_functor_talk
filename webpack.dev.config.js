var webpack = require('webpack');

module.exports = {
  entry: './src/client/main.js',
  output: {
    path: __dirname + '/dist/server/public',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: __dirname + '/src/client'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]"
      }
    ]
  }
};
