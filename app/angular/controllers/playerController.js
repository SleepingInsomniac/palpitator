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
    
    $scope.audio = {
      timeElapsed: 0
    };
    
    $scope.player = Player;
    
    $scope.playPause = function() {
      Player.playing = !Player.playing;
      if (Player.playing && !Player.song) {
        Player.song = Playlist.list[0];
        Player.songIndex = 0;
      }
      Player.playing ? Player.play() : Player.pause();
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
