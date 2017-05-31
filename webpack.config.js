const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcDir = path.resolve(__dirname, 'app/');

module.exports = {
  entry: `${srcDir}/index.jsx`,
  output: {
    path: path.join(__dirname, 'bin/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: srcDir,
      loader: 'babel-loader',
    },
    {
      test: /\.(jpg|png|svg)$/,
      loader: 'file-loader',
      include: path.join(__dirname, './assets'),
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
  ],
};
