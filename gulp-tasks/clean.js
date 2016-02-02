module.exports = function(config) {

  "use strict";

  const gulp          = require('gulp'),
        rm            = require('gulp-rm');
        
  gulp.task('clean', () => {
    return gulp.src('./public/**/*')
      .pipe(rm());
  });

}
