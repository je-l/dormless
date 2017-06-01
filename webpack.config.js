const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const logger = require('winston');

const srcDir = path.resolve(__dirname, 'app/');

if (!process.env.UAID) {
  logger.error('env missing');
  process.exit(1);
}

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
      uaId: process.env.UAID,
      template: './index.ejs',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
  ],
};
