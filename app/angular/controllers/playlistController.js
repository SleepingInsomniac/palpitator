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
    $scope.songs.$promise.then(() => $scope.currentSong = $scope.songs[0]);
    
    
});
