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
	.js("app/scripts/main.js", "dist/js")
	.css("app/styles/main.css", "dist/css")
	.html({
		htmlRoot: 'app/*.html'
	})
	.browserSync({
		server: "./dist/",
		files: ["./**/*.html", "./dist"],
	});
