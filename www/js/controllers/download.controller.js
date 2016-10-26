

(function () {
  angular.module('psqca')
    .controller('downloadsController', downloadCtrl);
  downloadCtrl.$inject = ['$scope', '$state','$ionicPopup','$ionicPlatform','$timeout','$cordovaFileTransfer', '$ionicHistory'];

  function downloadCtrl($scope, $state,$ionicPopup,$ionicPlatform, $timeout, $cordovaFileTransfer , $ionicHistory)
  {
    $scope.error = "Some Error";
    $scope.success = "Sucessfull";

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

    $scope.logout = function(){
      $state.go("welcome");
      $ionicHistory.clearHistory();


    };

    $scope.itemsn = [
      {id:0, name: 'Application form for Certification Marks Licence' , url : 'http://pakalerts.net/file/feedback.doc' , file : 'wall_paper.jpg'},
      {id:1, name: 'Application for grant of licence ' , url : 'http://www.psqca.com.pk/downloads//Download%203-2011/Form%20I.pdf' , file : 'form1.pdf'},
      {id:2, name: 'Self evaluation-cum-declaration for licence' , url : 'http://www.psqca.com.pk/downloads/Download%203-2011/Form%20II.pdf' ,file : 'form2.pdf'},
      {id:3, name: 'Application for renewal of licence' , url : 'http://www.psqca.com.pk/downloads/Download%203-2011/Form%20II.pdf' , file : 'form4.pdf'},
      {id:4, name: 'SROs and Gazette Notifications' , url : 'http://www.psqca.com.pk/downloads/PSQCA-SRO.pdf' , file : 'psqca_sqo.pdf'},
      {id:5, name: 'Application Form for Registration of Inspection Agency' , url : 'http://www.psqca.com.pk/downloads/PSQCA-App-form-inspec-agencies.pdf' , file : 'agencies.pdf'},
      {id:6, name: 'Documents Required' , url : 'http://www.psqca.com.pk/downloads/test2/Download/2016/June/Import%20export/DOCUMENTS_REQUIRED.doc' , file : 'required.doc'},
      {id:7, name: 'Complete Information of Consignee' , url : 'http://www.psqca.com.pk/downloads/test2/Download/2016/June/Import%20export/complete_information_of_consignee.doc' , file : 'consignee.doc'}


    ];

    $scope.downloadFile = function(id){
      console.log("Function download file called");

      $ionicPlatform.ready( function () {
        console.log("platform is ready");

        var url = encodeURI($scope.itemsn[id].url);
        var targetPath = cordova.file.documentsDirectory + $scope.itemsn[id].file;
        var trustHosts = true;
        var options = {};
        var myPopup_faliure = $ionicPopup.show({
          template: '<p style="color:white">'+$scope.itemsn[id].name+' has Failed to download <br/> Server Responded with error 404 (File Not Found)</p>',
          title: 'Download Failed',
          scope: $scope,
          buttons: [
            {
              text: '<b>OK</b>',
              type: 'button-positive',
            }
          ]
        });
        var myPopup_success = $ionicPopup.show({
          template: '<p style="color : white">'+$scope.success+'</p>',
          title: 'Downloading',
          scope: $scope,
          buttons: [
            {
              text: '<b>OK</b>',
              type: 'button-positive',
            }
          ]
        });


       $scope.status =  $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function(result) {
            console.log("In sucess",result);

          }, function(err) {
            console.log("In error",err);
            $scope.error = 'Error :'+err;
            // Error
            myPopup_faliure.then(function(res) {
              console.log('Tapped!', res);
            });
          }, function (progress) {
            console.log(progress);
            $timeout(function () {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
          });

      }, false);






    }


  }

})();


