(function () {
  angular.module('psqca')
    .controller('SubscriptionController', subscriptionCtrl);
  subscriptionCtrl.$inject = ['$scope', '$state','User','localStorageService'];

  function subscriptionCtrl($scope, $state, User, localStorageService) {
    $scope.user = {};
    $scope.subscribe = function(){
      console.log('user ', $scope.user);
      User.subscribe($scope.user).then(function(response){
        $scope.user = {};
        if(response.token){
          localStorageService.set("token", response.token);
          $state.go('login');
        }
      },function(error){
        console.log('error',error);
      })
    };
    $scope.loginPage = function(){
      $state.go('login');
    }
  }
})();
