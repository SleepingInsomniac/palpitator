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

    $scope.selectArtist = function(artist) {
      $scope.selectedArtist = artist;
      if (!artist.albums) {
        artist.albums = Album.byArtist({artist_id: artist.id});
      }
      console.log(artist);
    };
    
});
