app.controller(
  'LibraryController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Artist,
    Album,
    Song,
    Playlist
  ) {
    
    $scope.artists = Artist.query();
    $scope.selectedArtist = null;

    $scope.getAlbums = function(artist) {
      if (!artist.albums) {
        artist.albums = Album.byArtist({artist_id: artist.id});
      }
      $scope.selectedArtist = artist;
    };
    
    $scope.getSongs = function(album) {
      if (!album.songs) {
        album.songs = Song.byAlbum({album_id: album.id});
      }
      $scope.selectedAlbum = album;
    };
    
    $scope.addArtistToPlaylist = function(artist) {
      artist.songs = Song.byArtist({artist_id: artist.id}).$promise.then(function(songs) {
        Playlist.list = Playlist.list.concat(songs);
      });
    };
    
    $scope.addAlbumToPlaylist = function(album) {
      album.songs = Song.byAlbum({album_id: album.id}).$promise.then(function(songs) {
        Playlist.list = Playlist.list.concat(songs);
      });
    };
    
    $scope.addSongToPlaylist = function(song) {
      Playlist.list.push(song);
    };
    
});
