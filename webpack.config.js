const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcDir = path.resolve(__dirname, 'app/');

const isProd = process.env.NODE_ENV === 'production';

if (!process.env.UAID && isProd) {
  console.error('env missing during prod build');
  process.exit(1);
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: `${srcDir}/index.tsx`,
  output: {
    path: path.join(__dirname, 'build/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?|\.tsx?/,
      include: srcDir,
      use: {
        loader: 'ts-loader',
      },
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
  resolve: { extensions: ['.js', '.tsx'] },
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
