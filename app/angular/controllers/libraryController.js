app.controller(
  'LibraryController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Artist,
    Album,
    Song
  ) {
    
    $scope.artists = Artist.query();

    $scope.getAlbums = function(artist) {
      if (!artist.albums) {
        artist.albums = Album.byArtist({artist_id: artist.id});
      }
    };
    
});
