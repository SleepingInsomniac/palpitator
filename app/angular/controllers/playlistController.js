app.controller(
  'PlaylistController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams
  ) {
    
    // bleh
    $scope.songs = [
      {
        id: 1,
        track: 1,
        title: 'Song Title'
      },
      {
        id: 2,
        track: 2,
        title: 'Song Title'
      },
      {
        id: 3,
        track: 3,
        title: 'Song Title'
      },
      {
        id: 4,
        track: 4,
        title: 'Song Title'
      },
      {
        id: 5,
        track: 5,
        title: 'Song Title'
      },
      {
        id: 6,
        track: 6,
        title: 'Song Title'
      }
    ];
    
});
