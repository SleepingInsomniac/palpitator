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
    Player
  ) {
    
    $scope.songs = Song.byArtist({artist_id: 2});
    
    $scope.playSong = function(song) {
      console.log(song);
      $scope.currentSong = song;
      Player.song = song;
      Player.artist = song.artist;
      Player.album = song.album;
    };
    
});
