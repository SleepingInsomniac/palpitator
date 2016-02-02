app.factory(
'User',
function($resource) {
  
  return $resource('/api/users/:id', {id: '@id'}, {
    save: {
      method: 'POST',
      transformRequest: function(data) {
        return angular.toJson({user: data});
      }
    },
    'get': {
      method: 'GET',
      transformRequest: function(data) {
        return angular.toJson({user: data});
      }
    },
    update: {
      method: 'PUT',
      transformRequest: function(data) {
        return angular.toJson({user: data});
      }
    },
    login: {
      method: 'POST',
      url: '/api/users/login',
      transformRequest: function(data) {
        return angular.toJson({user: data});
      }
    },
    logout: {
      method: 'DELETE',
      url: '/api/users/login',
      transformRequest: function(data) {
        return angular.toJson({user: data});
      }
    }
  });
  
});
