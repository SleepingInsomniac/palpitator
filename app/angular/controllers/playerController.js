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
      if (Player.playing && !Player.song) {
        Player.song = Playlist.list[0];
        Player.songIndex = 0;
      }
    };
    
    $scope.previous = function() {
      if (Player.songIndex <= 0) {
        Player.song = Player.songIndex = null;
      } else {
        Player.song = Playlist.list[--Player.songIndex];
      }
    };
    
    $scope.forward = function() {
      if (Player.songIndex >= Playlist.list.length) {
        Player.song = Player.songIndex = null;
      } else {
        Player.song = Playlist.list[++Player.songIndex];
      }
    };
    
});
