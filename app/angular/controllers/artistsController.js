app.controller(
  'ArtistsController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Artist
  ) {
    
    $scope.artists = Artist.query();
    
});
