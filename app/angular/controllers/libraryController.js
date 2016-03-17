app.controller(
  'LibraryController',
  function(
    $scope,
    Artist,
    Album,
    Song,
    SongInfo,
    Playlist,
    Player
  ) {
    
    $scope.artists = Artist.query();
    $scope.selectedArtist = null;
    $scope.songInfo = SongInfo;

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
      if (!album.songs) {
        Song.byAlbum({album_id: album.id}).$promise.then(function(songs) {
          album.songs = songs;
          Playlist.list = Playlist.list.concat(songs);
        });
      } else {
        Playlist.list = Playlist.list.concat(album.songs);
      }
    };
    
    $scope.addSongToPlaylist = function(song) {
      Playlist.list.push(song);
    };
    
});
