(function () {
  angular.module('psqca')
    .controller('QRController', qrCtrl);
  qrCtrl.$inject = ['$scope', '$state' , '$ionicHistory'];

  function qrCtrl($scope, $state , $ionicHistory) {
    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  }
})();
