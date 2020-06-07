var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
const minify = require('gulp-minify-css');
const postcss = require('gulp-postcss')
var sasslint = require('gulp-sass-lint');

gulp.task('default', function () {
    return gulp.watch('src/css/*.scss', gulp.series('style', 'mini', 'lint'));
});

function style() {
    return (

		gulp
            .src("src/css/*.scss")
            .pipe(sass())
            .pipe(postcss([ autoprefixer() ]))
            .on("error", sass.logError)
            .pipe(gulp.dest("main/css"))
	
    );
	
}
exports.style = style;

function mini() {
	return(
		gulp
			.src("main/css/*.css")
	    	.pipe(minify())
	    	.pipe(gulp.dest("main/css/minifiles"))
	);
}
exports.mini = mini;

function lint() {
	return(
		gulp
			.src("src/css/*.scss")
			.pipe(sasslint())
			.pipe(sasslint.format())
			.pipe(sasslint.failOnError())
	);
}
exports.lint = lint;
