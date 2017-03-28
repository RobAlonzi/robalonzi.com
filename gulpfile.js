let gulp = require("gulp");
let path = require("path");
let rimraf = require("rimraf");

const $ = require("gulp-load-plugins")();
const argv = require('yargs').argv;

const stylesFolder = path.join(__dirname, "public", "assets", "css");



//--------------------------------
// Utility Tasks
gulp.task("clean", cb => {
	clean(cb);
});

function clean(cb, folder){
	rimraf(`${stylesFolder}/*.scss`, () => cb());
}


//--------------------------------
// CSS
gulp.task("clean:css", cb => {
	clean(cb);
});

gulp.task("build:css",
	gulp.series(
		"clean:css",
		compileCSS
	)
);


function compileCSS(){
	return gulp.src(`./src/css/style.scss`)
	.pipe($.if(!argv.prod, $.sourcemaps.init()))
	.pipe($.sass())
	.pipe($.autoprefixer())
	.pipe($.if(!argv.prod, $.sourcemaps.write()))
	.pipe($.concat('style.css'))
	.pipe($.if(argv.prod, $.cleanCss()))
	.pipe(gulp.dest(`${stylesFolder}/`));
}


//--------------------------------
// Build Tasks
gulp.task("build", gulp.parallel("build:css"));
gulp.task("watch", gulp.series("clean", "build:css", watch));

function watch(){
	gulp.watch(`./src/css/**/*.scss`, gulp.series("build:css"));
}
