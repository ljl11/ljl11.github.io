var ExtractTextPlugin = require("extract-text-webpack-plugin");
var _baseConfig = {
	path: "prd",
	filename: "[name]@[chunkhash][ext]"
};

module.exports = {
	plugins: [{
        // 通过对象的方式引入插件，可以传入 options
        name: 'es6',
        options: {
            // 更改 es6 配置
            test: /\.(js)$/, // 默认是 /\.(js|jsx)$/
            exclude: /node_modules/, // 默认是 /node_modules/
            modifyQuery: function(defaultQuery) { // 可查看和编辑 defaultQuery
                defaultQuery.plugins.push('transform-runtime');
                return defaultQuery;
            }
        }
    }],
	config: {
		exports: ["./scripts/index.js", "./styles/index.css"],
		commonChunk: {
			name: "common",
			filename: _baseConfig.filename,
			minChunks: 2
		},
		modifyWebpackConfig: function(baseConfig) {
			// edit ykit's Webpack configs
			baseConfig.output = {
				dev: _baseConfig,
				beta: _baseConfig,
				prd: _baseConfig
			};

			// 替换css-loader和
			baseConfig.module.loaders = baseConfig.module.loaders.map(function(
				loader
			) {
				if (loader.test.toString().match(/css/)) {
					return {
						test: /\.(css)$/,
						loader: ExtractTextPlugin.extract("style-loader", "css-loader")
					};
				}
				return loader;
			});

			var cssNamePattren = "[name]@[md5:contenthash:base36:16].css";
			if (this.env === "local") {
				cssNamePattren = "[name].css";
			}
			baseConfig.plugins.push(new ExtractTextPlugin(cssNamePattren));
			return baseConfig;
		}
	},
	hooks: {},
	commands: []
};
