app.controller(
  'PlayerController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams
  ) {
    
    $scope.currentSong = {
      id: 1,
      track: 1,
      title: 'Song Title'
    };
    
});
