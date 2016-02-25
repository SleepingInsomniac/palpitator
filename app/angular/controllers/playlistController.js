app.controller(
  'PlaylistController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Song
  ) {
    
    $scope.songs = Song.byArtist({artist_id: 2});
    
});
