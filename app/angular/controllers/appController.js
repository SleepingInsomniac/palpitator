app.controller(
  'AppController',
  function(
    $scope,
    $http,
    $routeParams,
    $location,
    User,
    Player
  ) {
  
    $scope.player = Player;
  
});
