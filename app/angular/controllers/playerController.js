app.controller(
  'PlayerController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Player
  ) {
    
    $scope.player = Player;
    
});
