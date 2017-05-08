const path = require('path');

const srcDir = path.resolve(__dirname, 'app/');

module.exports = {
  entry: `${srcDir}/index.jsx`,
  output: {
    path: path.resolve(__dirname, 'bin/'),
    filename: 'bundle.js',
    publicPath: '/bin/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: srcDir,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
