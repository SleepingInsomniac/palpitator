module.exports = function(config) {

  "use strict";

  const gulp          = require('gulp'),
        gulpif        = require('gulp-if'),
        concat        = require('gulp-concat'),
        sourcemaps    = require('gulp-sourcemaps');
        
        config = config.vendor
  
  gulp.task('vendor', () => {
    return gulp.src(config.sources)
    .pipe(gulpif(!!config.sourcemap, sourcemaps.init()))
    .pipe(gulpif(!!config.concat, concat(config.concat)))
    .pipe(gulpif(!!config.sourcemap, sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest));
  });

}
