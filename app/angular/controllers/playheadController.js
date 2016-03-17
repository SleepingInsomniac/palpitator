app.controller(
  'PlayheadController',
  function(
    $scope,
    Player
  ) {
    
    $scope.player = Player;

    $scope.mousedown = function($event) {
      var node = $event.currentTarget;
      var rect = node.getBoundingClientRect()
      Player.timePercent($event.offsetX / rect.width);
      
      var setWidth = function(event) {
        Player.timePercent(event.offsetX / rect.width);
      };
      
      var clearListeners = function () {
        document.removeEventListener('mousemove', setWidth, false);
        document.removeEventListener('mouseup', clearListeners, false);
      };
      
      document.addEventListener('mousemove', setWidth, false);
      document.addEventListener('mouseup', clearListeners, false);
    }
    
    
    
});
