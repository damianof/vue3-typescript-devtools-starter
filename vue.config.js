const path = require('path');

module.exports = {
	devServer: {
		port: 8080
	},
	productionSourceMap: true,
	outputDir: 'dist',
	publicPath: './',

	chainWebpack: config => {
		config.resolve.alias.set('@', path.resolve(__dirname, 'src'));

		config.optimization.minimize(false);
		config.plugin('html')
		.tap(args => {
			args[0].title = 'Attribute Reporter';
			args[0].minify = false;
			return args;
		});
		// this is to give custom names to the built .css files, if any (these get build if we use SCSS contained within the .vue components within the tag <style lang="scss">)
		if (config.plugins.has('extract-css')) {
			const extractCSSPlugin = config.plugin('extract-css');
			extractCSSPlugin && extractCSSPlugin.tap(() => [{
				filename: '[name].css',
				chunkFilename: '[name].css'
			}])
		}
	},
	configureWebpack: {
		output: {
			filename: '[name].min.js',
			//sourceMapFilename: '[name].js.map',
			chunkFilename: '[name].min.js'
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			}
		},
		plugins: [
		]
	}
}
