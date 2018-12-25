const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const logger = require('winston');

const srcDir = path.resolve(__dirname, 'app/');

if (!process.env.UAID && process.env.NODE_ENV === 'production') {
  logger.error('env missing');
  process.exit(1);
}

module.exports = {
  entry: `${srcDir}/index.jsx`,
  output: {
    path: path.join(__dirname, 'build/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      include: srcDir,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(jpg|png|svg)$/,
      loader: 'file-loader',
      include: path.join(__dirname, 'assets'),
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
      favicon: './assets/favicon.png',
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
