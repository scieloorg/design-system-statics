'use strict';

const {src, dest, watch, series, parallel} = require('gulp');

const sass 			= require('gulp-sass');
const sourcemaps 	= require('gulp-sourcemaps');
const minify        = require('gulp-minify');
const include       = require('gulp-include');
const webserver     = require('gulp-webserver');
const cleanCSS      = require('gulp-clean-css');

let sassSources = {
    "article": [
            "./src/bootstrap/scss/article.scss",
    ],
    "bootstrap": [
            "./src/bootstrap/scss/bootstrap.scss",
            "./src/bootstrap/scss/bootstrap-grid.scss",
            "./src/bootstrap/scss/bootstrap-reboot.scss",
            "./src/bootstrap/scss/bootstrap-utilities.scss",
    ],
    "examples": ["./src/common/examples/scss/examples.scss"],
    "watch": ["./src/bootstrap/scss/*.scss","./src/bootstrap/scss/**/*.scss","./src/common/scss/**/*.scss"],
    "examplesWatch": ["./src/common/examples/scss/examples.scss","./src/common/scss/**/*.scss"],
    "outputArticle": ["./dist/css/"],
    "outputBootstrap": ["./dist/css/"],
    "outputExamples": ["./examples/"],
}, jsSources = {
    "bootstrap": ["./node_modules/bootstrap/dist/js/*"],
    "resources": ["./src/common/js/*.js"],
    "watch": ["./node_modules/bootstrap/dist/js/*","./src/common/js/*.js","./src/common/js/**/*.js"],
    "outputBootstrap": ["./dist/js/"],
    "outputResources": ["./dist/js/scielo/"],
    "bootstrapPlugins": [
        "./node_modules/nouislider/distribute/nouislider.min.js",
        "./node_modules/wnumb/wNumb.min.js",
        "./node_modules/chart.js/dist/Chart.min.js",
        "./node_modules/pickadate/lib/compressed/picker.js",
        "./node_modules/pickadate/lib/compressed/picker.date.js",
        "./node_modules/datatables.net/js/jquery.dataTables.min.js"
    ],
    "outputPluginsBootstrap": ["./dist/js/plugins/"],
}, htmlSources = {
    bootstrap: [
        "./src/bootstrap/examples/*.html",
        "./src/bootstrap/examples/**/*.html",
        "!./src/bootstrap/examples/_*.html",
        "!./src/bootstrap/examples/**/_*.html"],
    watch: [
        "./src/bootstrap/examples/*.html",
        "./src/bootstrap/examples/**/*.html",
        "./src/common/examples/*.html",
        "./src/common/examples/**/*.html",
    ],
    examples: [
        "./src/common/examples/*.html"
    ],
    outputBootstrap: ['./examples/bootstrap'],
    outputExamples: ['./examples']
};

function processArticleCSS() {
	return src(sassSources.article)
			.pipe(sourcemaps.init())
            
			.pipe(
				sass({ 
                    outputStyle: 'nested'
                })
            )
            
            .pipe(include())
            .pipe(cleanCSS())
			.pipe(sourcemaps.write('./'))
			.pipe(dest(sassSources.outputArticle));
}

function processBootstrapCSS() {
	return src(sassSources.bootstrap)
			.pipe(sourcemaps.init())
			.pipe(
				sass({ 
                    outputStyle: 'nested',
                    includePaths: ['./node_modules/bootstrap/']
                })
            )
            .pipe(include())
            .pipe(cleanCSS())
			.pipe(sourcemaps.write('./'))
			.pipe(dest(sassSources.outputBootstrap));
}

function processExamplesCSS() {
	return src(sassSources.examples)
			.pipe(sourcemaps.init())
			.pipe(
				sass({ 
                    outputStyle: 'compressed'
                })
            )
			.pipe(sourcemaps.write('./'))
			.pipe(dest(sassSources.outputExamples));
}

function watchCSS() {
	return watch(sassSources.watch,series(processBootstrapCSS,processArticleCSS));

}
/*
function watchCSSArticle() {
	return watch(sassSources.watch,processArticleCSS);
}
*/
function watchExamplesCSS() {
	return watch(sassSources.examplesWatch,processExamplesCSS);
}


function processResourcesJS() {
    return src(jsSources.resources)
            .pipe(include())
            .pipe(sourcemaps.init())
            .pipe(minify())
            .pipe(sourcemaps.write('./'))
            .pipe(dest(jsSources.outputResources[0]));
}

function processBootstrapJS() {
	return src(jsSources.bootstrap)
			.pipe(dest(jsSources.outputBootstrap));
}

function copyBootstrapPlugins() {
    return src(jsSources.bootstrapPlugins)
            .pipe(dest(jsSources.outputPluginsBootstrap))
}

function watchJS() {
	return watch(jsSources.watch,series(processBootstrapJS,processResourcesJS));
}

function processBootstrapHTML() {
    return src(htmlSources.bootstrap)
        .pipe(include())
        .pipe(dest(htmlSources.outputBootstrap));
}

function processExamplesHTML() {
    return src(htmlSources.examples)
        .pipe(include())
        .pipe(dest(htmlSources.outputExamples));
}

function watchHTML() {
	return watch(htmlSources.watch,series(processBootstrapHTML,processExamplesHTML));
}

function devserver() {
    return src('./')
            .pipe(webserver({
                host: '0.0.0.0',
                livereload: true,
                directoryListing: true,
                open: 'http://localhost:8000/examples/index.html',
              }));
}

exports.default = series(
                    processArticleCSS,
                    processBootstrapCSS,
                    processExamplesCSS,
                    copyBootstrapPlugins,
                    processBootstrapJS,
                    processResourcesJS,
                    processBootstrapHTML,
                    parallel(
                        devserver,
                        watchCSS,
                       // watchCSSArticle,
                        watchExamplesCSS,
                        watchJS,
                        watchHTML
                    )
                );

exports.bootstrap = processBootstrapCSS;

exports.article = processArticleCSS;

