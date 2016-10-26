(function () {
  angular.module('psqca')
    .controller('LoginController', loginCtrl);
  loginCtrl.$inject = ['$scope', '$state','Auth','User','$ionicPopup','$ionicLoading','$cookies'];

  function loginCtrl($scope, $state, Auth, User ,$ionicPopup, $ionicLoading, $cookies) {
    $scope.subscribe = function(){
      $state.go('subscription');
    };

    $scope.user = {};


    $scope.user.email = $cookies.get('email');
    $scope.user.password = $cookies.get('pass');

$scope.storeCookie = function(user, pass){

$cookies.put('email', user);
$cookies.put('pass', pass);


};
console.log($scope.user,"my login");
    $scope.message = '';
    $scope.showPopup = function() {
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="email" ng-model="data.email" placeholder="Enter email"> ' + '<br/>' +
                  '<input type="password" ng-model="data.newPassword" placeholder="Enter new password"> ',
        title: 'Update password',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.email) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.email;
              }
            }
          }
        ]
      });
      myPopup.then(function() {
        User.updatePassword($scope.data)
          .then(function(response){
            console.log('response ', response);

          },function(error){
            console.log('Error ', error);
          });
        //console.log('Tapped!', $scope.data);
      });

    };
    $scope.login = function(){
      $ionicLoading.show({template: '<ion-spinner icon="spiral"></ion-spinner>'});
      Auth.login($scope.user).then(function(response){
        $ionicLoading.hide();
        $scope.user = {};
        if(response.token){
          $state.go('home');
        }
      },function(error){
        $ionicLoading.hide();
        console.log('error ',error);
        $scope.message = error.message;
      })

    }

  }
})();
