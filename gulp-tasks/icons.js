module.exports = function(config) {

  "use strict";

  const gulp          = require('gulp'),
        exec          = require('child_process').exec,
        concat        = require('gulp-concat'),
        browserSync   = require('browser-sync').get('syncBrowser');
  
  gulp.task('icons', () => {
    
    var savage = exec(`savage-fontgen ${config.icons.source} -o tmp/icons -c ${config.icons.config} -q`);
    
    savage.stdout.on('data', (data) => {
      console.log(data)
    });
    
    savage.on('exit', () => {
      
      gulp.src('tmp/icons/fonts/*')
        .pipe(gulp.dest(config.icons.dest.fonts));

      gulp.src('tmp/icons/*.css')
        .pipe(concat(config.icons.concat))
        .pipe(gulp.dest(config.icons.dest.stylesheet));

    });
      
  });

};
