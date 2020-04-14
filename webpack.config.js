const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: [ '@babel/polyfill', './client/index.js' ],
	mode: isDev ? 'development' : 'production',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-react' ]
					}
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	}
};
