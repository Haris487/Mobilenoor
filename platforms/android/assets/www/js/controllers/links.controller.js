(function () {
  angular.module('psqca')
    .controller('linksController', homeCtrl);
  homeCtrl.$inject = ['$scope', '$state','$ionicHistory' ];

  function homeCtrl($scope, $state ,$ionicHistory) {
    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

    $scope.logout = function(){
      $state.go("welcome");
      $ionicHistory.clearHistory();


    };
  }
})();
