var pulpApp = angular.module('pulpApp', []);

pulpApp.controller('AppController', function($scope, $http) {
    
    $http.get('/artists').success(function(data) {
        $scope.artists = data;
    });
    
    $scope.getAlbums = function(id) {
        $http.get('/artists/'+id+'/albums').success(function(data) {
            $scope.albums = data;
        });
        $http.get('/artists/'+id+'/songs').success(function(data) {
            $scope.songs = data;
        });
    }
    
    $scope.getSongs = function(id) {
        $http.get('/albums/'+id+'/songs').success(function(data) {
            $scope.songs = data;
        });
    }
    
});
