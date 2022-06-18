const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const dev = process.env.NODE_ENV === 'development'; // to check if the mode is 'development'
let mode = 'development';
let target = 'web';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Boilerplate',
    template: './src/index.html',
  }),
];

if (dev) {
  plugins.push(new ReactRefreshWebpackPlugin());
} else {
  mode = 'production';
  target = 'browserslist';
  plugins.push(
    ...[
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/assets',
            to: 'assets',
            globOptions: {
              ignore: ['*.DS_Store'],
            },
            noErrorOnMissing: true,
          },
        ],
      }),
    ]
  );
}

module.exports = {
  mode,
  plugins,
  target,
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          !dev ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
