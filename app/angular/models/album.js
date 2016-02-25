app.factory(
'Album',
function($resource) {
  
  return $resource('/albums/:id', {id:'@id'}, {
    byArtist: {
      method: 'GET',
      url: '/artists/:artist_id/albums',
      params: {artist_id:'@artist_id'},
      isArray: true
    },
    update: {
      method: 'PUT',
      transformRequest: function(data) {
        return angular.toJson({artist: data});
      }
    },
    create: {
      method: 'POST',
      transformRequest: function(data) {
        return angular.toJson({artist: data});
      }
    }
  });
  
});