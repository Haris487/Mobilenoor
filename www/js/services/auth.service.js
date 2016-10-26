(function(){

  angular.module('psqca')
    .factory('Auth', authFactory);
  authFactory.$inject = ['$q','BaseUrl','$http','localStorageService','User'];

  function authFactory($q, BaseUrl,$http,localStorageService,User){

    return {
      login: function(data){
        var deferred = $q.defer();
        $http.post(BaseUrl+'auth/local', data)
          .success(function(response){
            localStorageService.set('token',response.token);
            deferred.resolve(response);
          })
          .error(function(error){
            deferred.reject(error);
          });
        return deferred.promise;
      }
    }
  }


})();
