app.controller(
  'PlaylistController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Song,
    Album,
    Artist,
    Player,
    Playlist,
    dragulaService
  ) {
    
    $scope.playlist = Playlist;
    $scope.player = Player;
    
    $scope.playSong = function(song, index) {
      Player.song = song;
      Player.songIndex = index;
      Player.play();
    };
    
    $scope.removeSong = function(index) {
      Playlist.list.splice(index, 1);
      if (Player.songIndex == index) {
        Player.songIndex = null;
        Player.song = null;
      }
    };
    
    $scope.clearPlaylist = function() {
      Playlist.list = [];
      Player.pause();
      Player.songIndex = null;
      Player.song = null;
      console.log(Player);
    };
  
});
