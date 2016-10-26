(function () {
  angular.module('psqca')
    .controller('HomeController', homeCtrl);
  homeCtrl.$inject = ['$scope', '$state','$cordovaCamera' , '$ionicPlatform' , '$ionicHistory'];

  function homeCtrl($scope, $state , $cordovaCamera , $ionicPlatform , $ionicHistory) {


    $scope.logout = function(){
      $state.go("welcome");
      $ionicHistory.clearHistory();


    };
// OR with IONIC
    $scope.scanBarcode = function() {
      $scope.msg = "In Function Scan";
      console.log("In Function scanBarcode");
      $ionicPlatform.ready(function () {
        $scope.msg = "PlatForm Is Ready";
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };

        $scope.scanmsg = $cordovaCamera.getPicture(options).then(function(imageData) {
          var image = document.getElementById('myImage');
          image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });
      });
    };



  }
})();
