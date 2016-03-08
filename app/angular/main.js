var app = angular.module('pulpitator', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  angularDragula(angular)
]);


app.config(function($httpProvider) {
    
  $httpProvider.interceptors.push(function($q, $rootScope) {
    $rootScope.requestCount = $rootScope.requestCount || 0;
    
    return {
      'request': function(config) {
        $rootScope.requestCount++;
        // $rootScope.$broadcast('loading-started');
        return config || $q.when(config);
      },
      'response': function(response) {
        $rootScope.requestCount--;
        // $rootScope.$broadcast('loading-complete');
        return response || $q.when(response);
      }
    };
  });
    
});
