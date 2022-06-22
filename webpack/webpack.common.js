const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
	new HtmlWebpackPlugin({
		title: 'Boilerplate',
		template: './src/index.html',
		filename: 'index.html',
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
];

module.exports = {
	plugins,
	entry: './src/index.tsx',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: "/",
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
		],
	},
};
