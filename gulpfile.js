// CONST

const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const include = require('gulp-file-include')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
// FUNCTION

function html() {
    return src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist:  ['last 2 versions'],
        cascade: false
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })
    
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}

// EXPORTS
exports.build = series(clear, scss, html)
exports.default = series(clear, scss, html, serve)
exports.clear = clear