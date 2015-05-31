//= require angular.js
//= require Lx-dev.js
//= require controllers.js

Lx(window).on('load', function() {
    
    var player = Lx.select('#player');
    var timeline = Lx.select('#timeline');
    var progressbar = Lx.select('#progressbar');
    
    var timelineWidth = timeline.e.getBoundingClientRect().width;
    var setProgress = function(e) {
        player.e.currentTime = (e.pageX / timelineWidth) * player.e.duration;
        e.preventDefault();
    }
    
    player.on('timeupdate', function(e) {
        progressbar.styles({ width: (player.e.currentTime / player.e.duration)*100+'%' });
    });
    
    timeline.on('click', setProgress);
    timeline.on('mousedown', function(e) {
        Lx(window).on('mousemove', setProgress);
        Lx(window).waitFor('mouseup', function(e) {
            Lx(window).off('mousemove', setProgress);
        });
        e.preventDefault();
    });
    
});