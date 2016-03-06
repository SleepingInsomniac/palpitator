app.controller(
  'PlayerController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Player,
    Playlist
  ) {
    
    $scope.player = Player;
    
    $scope.playPause = function() {
      Player.playing = !Player.playing;
      
      if (Player.playing && !Player.song) Player.song = Playlist.list[0];
    };
    
    $scope.previous = function() {
      var songIndex = Playlist.list.indexOf(Player.song);
      if (songIndex <= 0) {
        Player.song = null;
      } else {
        Player.song = Playlist.list[songIndex - 1];
      }
    };
    
    $scope.forward = function() {
      var songIndex = Playlist.list.indexOf(Player.song);
      if (songIndex >= Playlist.list.length) {
        Player.song = null;
      } else {
        Player.song = Playlist.list[songIndex + 1];
      }
    };
    
});
