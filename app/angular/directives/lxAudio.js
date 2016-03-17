app.directive(
"lxAudio",
function(Player) {
  return {
    restrict: 'A',
    scope: {
      audio: "=lxAudio"
    },
    link: function(scope, element, attrs) {
      
      element.on("timeupdate", function() {
        var time = element[0].currentTime;
        scope.audio.timeElapsed = time;
        Player.playedPercent = scope.audio.playedPercent = Math.round((time / scope.audio.song.length * 100) * 10) / 10;
        scope.$apply();
      });
      
      element.on("ended", function() {
        Player.forward();
      });
      
      scope.audio.play = function() {
        element[0].play();
        scope.audio.playing = true;
      };
      
      scope.audio.pause = function() {
        element[0].pause();
        scope.audio.playing = false;
      };
      
      Player.currentTime = function(value) {
        if (value) {
          element[0].currentTime = value;
        }
        return element[0].currentTime;
      }
      
      Player.timePercent = function(value) {
        if (value) {
          element[0].currentTime = scope.audio.song.length * value;
        }
        return element[0].currentTime / scope.audio.song.length;
      }
      
    }
  };
});
