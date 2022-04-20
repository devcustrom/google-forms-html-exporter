const path = require("path");
const mix = require("laravel-mix");
require("mix-html-builder");

mix
	.setPublicPath(path.resolve("./"))
	.webpackConfig({
		resolve: {
			modules: [path.resolve(__dirname, "node_modules")],
		},
	})
	.js("app/scripts/main.js", "docs/js")
	.css("app/styles/main.css", "docs/css")
	.html({
		output: './docs',
		htmlRoot: 'app/*.html'
	})
	.copy('app/*.txt', 'docs')
	.browserSync({
		server: "./docs",
		files: ["./**/*.html", "./docs"],
	});
