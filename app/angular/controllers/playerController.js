app.controller(
  'PlayerController',
  function(
    $scope,
    $http,
    $resource,
    $routeParams,
    Player,
    Playlist
  ) {
    
    $scope.audio = {
      timeElapsed: 0
    };
    
    $scope.player = Player;
    Player.playlist = Playlist;
    
});
