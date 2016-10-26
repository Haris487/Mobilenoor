(function () {
  angular.module('psqca')
    .controller('PublicationController', publicationCtrl);
  publicationCtrl.$inject = ['$scope', '$state' , '$ionicHistory'];

  function publicationCtrl($scope, $state , $ionicHistory) {
    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  }
})();
