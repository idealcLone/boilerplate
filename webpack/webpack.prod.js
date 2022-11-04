const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
		filename: 'js/[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: "/"
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),
	],
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
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: true,
						},
					},
					'postcss-loader',
					'sass-loader',
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
});
