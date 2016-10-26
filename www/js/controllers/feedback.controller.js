(function () {   angular.module('psqca')
  .controller('feedBackController', loginCtrl);
  loginCtrl.$inject = ['$scope', '$state','$http','form','$ionicHistory'];

  function loginCtrl($scope, $state, $http, form, $ionicHistory) {

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

    $scope.logout = function(){
      $state.go("welcome");
      $ionicHistory.clearHistory();


    };
    $scope.mail = {};

    $scope.maildone = function () {


    form.mailSend($scope.mail).then(function success(response) {

        $scope.mail = {};
        $scope.send = "Mail Send Successfully";
        console.log(response.data);


        //return response.data;
      },
      function errorCallback(error) {
        console.log(error);
        $scope.mail = {};
        $scope.send = "Mail not Send Successfully";
      });


  }

  }

})();
