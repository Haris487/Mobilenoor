(function(){

  angular.module('psqca')
    .factory('User', userFactory);
  userFactory.$inject = ['$q','BaseUrl','$http'];

  function userFactory($q, BaseUrl,$http){

    return {
      subscribe: function(data){
        var deferred = $q.defer();
        $http.post(BaseUrl+'users/subscribe',data)
          .success(function(response){
            deferred.resolve(response);
          })
          .error(function(error){
            deferred.reject(error);
          });
        return deferred.promise;
      },
      getUser: function(){
        var deferred = $q.defer();
        $http.get(BaseUrl+'users/me')
          .success(function(response){
            deferred.resolve(response);
          })
          .error(function(error){
            deferred.reject(error);
          });
        return deferred.promise;
      },
      updatePassword: function(data){
        var deferred = $q.defer();
        $http.put(BaseUrl+'users/updatePassword', data)
          .success(function(response){
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
