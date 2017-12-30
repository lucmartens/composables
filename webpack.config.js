const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: `${__dirname}/lib/`,
    filename: `react-helpers.js`,
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  externals: {
    react: 'commonjs react'
  }
};
