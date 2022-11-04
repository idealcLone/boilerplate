const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	plugins: [new ReactRefreshWebpackPlugin()],
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		compress: true,
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true, importLoaders: 1, modules: true },
					},
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
		],
	},
});
