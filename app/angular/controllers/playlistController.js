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
    
    $scope.playSong = function(song) {
      console.log(song);
      $scope.currentSong = song;
      Player.song = song;
      Player.artist = song.artist;
      Player.album = song.album;
    };
    
    $scope.removeSong = function(index) {
      Playlist.list.splice(index, 1);
    };
    
});
