var pulpApp = angular.module('pulpApp', []);

pulpApp.controller('ArtistsController', function($scope, $http) {
    
    $http.get('/artists').success(function(data) {
        $scope.artists = data;
    });
    
    // $http.get('/artists/1/albums').success(function(data) {
    //     $scope.albums = data;
    // });
    
    $scope.getAlbums = function(id) {
        $http.get('/artists/'+id+'/albums').success(function(data) {
            $scope.albums = data;
        });
    }
    
});

// pulpApp.controller('AlbumsController', function($scope) {
//
//
//
//
// });