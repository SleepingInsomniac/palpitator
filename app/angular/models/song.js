app.factory(
'Song',
function($resource) {
  
  return $resource('/songs/:id', {id:'@id'}, {
    byArtist: {
      method: 'GET',
      url: '/artists/:artist_id/songs',
      params: {artist_id:'@artist_id'},
      isArray: true
    },
    byAlbum: {
      method: 'GET',
      url: '/albums/:album_id/songs',
      params: {album_id:'@album_id'},
      isArray: true
    },
    update: {
      method: 'PUT',
      transformRequest: function(data) {
        return angular.toJson({song: data});
      }
    },
    create: {
      method: 'POST',
      transformRequest: function(data) {
        return angular.toJson({song: data});
      }
    }
  });
  
});
