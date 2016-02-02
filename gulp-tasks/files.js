module.exports = function(config) {

  "use strict";

  const gulp          = require('gulp'),
        gulpif        = require('gulp-if'),
        browserSync   = require('browser-sync').get('syncBrowser');
        
        config = config.files;
    
  gulp.task('files', () => {
    return gulp.src(config.sources)
      .pipe(gulp.dest(config.dest));
  });

}
