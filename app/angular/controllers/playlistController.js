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
    
    $scope.playlist = Playlist; //Song.byArtist({artist_id: 2});
    $scope.player = Player;
    
    $scope.playSong = function(song, index) {
      $scope.currentSong = song;
      Player.song = song;
      Player.songIndex = index;
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
      Player.songIndex = null;
      Player.song = null;
    };
  
});
