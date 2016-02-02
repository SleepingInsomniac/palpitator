app.config(function($routeProvider, $locationProvider) {
  
  $locationProvider.html5Mode(true);
  
  $routeProvider
  .when('/', {
    templateUrl: '/views/player.html',
    controller: 'playerCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
  
});
