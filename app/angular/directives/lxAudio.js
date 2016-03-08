app.directive(
"lxAudio",
function() {
  return {
    restrict: 'A',
    scope: {
      audio: "=lxAudio"
    },
    link: function(scope, element, attrs) {
      
      element.on("timeupdate", function(){
        scope.audio.timeElapsed = parseInt(element[0].currentTime);
        scope.$apply();
      });
      
      scope.audio.play = function() {
        element[0].play();
        scope.audio.playing = true;
      };
      
      scope.audio.pause = function() {
        element[0].pause();
        scope.audio.playing = false;
      };
      
    }
  };
});
