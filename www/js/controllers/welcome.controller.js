(function () {
  angular.module('psqca')
    .controller('WelcomeController', welcomeCtrl);
  welcomeCtrl.$inject = ['$rootScope','$scope', '$state','$interval','$ionicHistory'];

  function welcomeCtrl($rootScope ,$scope, $state ,$interval , $ionicHistory) {
    $ionicHistory.clearHistory();

    console.log($ionicHistory.viewHistory(),"mmm");

    $scope.progress = 0;
    var progressInc = 0;
    var stop;
    $scope.callAtInterval = function() {
      
      progressInc += 1;
      if(progressInc > 100){
        
      }
      else{
        $scope.progress = progressInc;
      }
      if(progressInc > 100){
        $state.go('welcome');
        $rootScope.notFirstTime = true;
      }
    };

    if(!$rootScope.notFirstTime) {
      stop = $interval($scope.callAtInterval, 30 , 130);
    }

    $scope.isLoaded = 'false';
    //
    // if($scope.route == 'welcome'){
    //
    // }

    $scope.loadingBoxes = [1,2,3,4,5,6,7];


    $scope.loginPage = function(){
      $state.go('login');
    };
    $scope.subscribe = function(){
      $state.go('subscription');
    };
  }
})();
