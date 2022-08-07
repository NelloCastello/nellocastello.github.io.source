let { src, dest, series } = require('gulp');
let tinypng = require('gulp-tinypng-compress');
let svgo = require('gulp-svgo');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify-es').default;
let htmlminify = require('gulp-html-minify');
let cleancss = require('gulp-clean-css');
let ahex = require('gulp-ahex');
let autoprefixer = require('gulp-autoprefixer');


function png() {
    return src('app/images/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: "fhdtWn1CPNQw9tb0zCD1s0LYfLdkmv3Z"
        }))
        .pipe(dest('dist/images'));
}

function svg() {
    return src('app/images/**/*.svg')
        .pipe(svgo())
        .pipe(dest('dist/images'))
}

function js() {
    return src('app/scripts/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest('dist/scripts'))
}

function html() {
    return src('app/**/*.html')
        .pipe(htmlminify())
        .pipe(dest('dist'))
}

function css() {
    return src('app/styles/**/*.css')
        .pipe(ahex())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleancss({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest('dist/styles'))
}


exports.images = series(svg, png);
exports.scripts = js;
exports.pages = html;
exports.styles = css;

exports.build = series(svg, png, js, html, css);