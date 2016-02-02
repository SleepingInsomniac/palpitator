module.exports = function(config) {

  "use strict";

  const gulp          = require('gulp'),
        gulpif        = require('gulp-if'),
        haml          = require('gulp-ruby-haml'),
        browserSync   = require('browser-sync').get('syncBrowser');

        config = config.markup;
  
  let handleError = function(error) {
    console.log(error.message);
    this.emit('end');
  }
  
  gulp.task('markup', () => {
    return gulp.src(config.sources)
      .pipe(haml({doubleQuote: true})).on('error', handleError)
      .pipe(gulp.dest(config.dest));
  });
  
}
