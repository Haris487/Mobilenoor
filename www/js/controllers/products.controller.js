(function () {
  angular.module('psqca')
    .controller('ProductsController', productsCtrl);
  productsCtrl.$inject = ['$scope', '$state','$http' , '$ionicHistory'];

  function productsCtrl($scope, $state, $http , $ionicHistory) {
    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

    $scope.logout = function(){
      $state.go("welcome");
      $ionicHistory.clearHistory();



    };
    $scope.item = {
      select : $scope.select
    };
    $http.get('js/data.json').success(function(response){

      $scope.data = response;
      console.log($scope.data.length,"mg");

    });
    $scope.searchData=[];
    $scope.selecttion={option:""};
    $scope.notFound=false;

    $scope.search = function(){
      $scope.notFound=true;

      $scope.searchData=[];
      for (var i = 0; i < $scope.data.length; i++) {
        var product = $scope.data[i].ProductByDivision.toLowerCase();
        var category = $scope.data[i].ProductCategoryPSS.toLowerCase();
        var licenseNo = $scope.data[i].LicenseNo.toLowerCase();
        var unitName = $scope.data[i].UnitName.toLowerCase();
        var brand = $scope.data[i].Brand.toLowerCase();


        var pro = product.indexOf($scope.item.select.toLowerCase());
        var lis = licenseNo.indexOf($scope.item.select.toLowerCase());
        var name = unitName.indexOf($scope.item.select.toLowerCase());
        var br = brand.indexOf($scope.item.select.toLowerCase());
        var cat = category.indexOf($scope.item.select.toLowerCase());


        if ((pro >= 0) || (lis >= 0) || (name >= 0) || (br >= 0) || (cat >= 0) ) {

          $scope.searchData.push($scope.data[i]);
          console.log("nn",$scope.searchData.length);
          $scope.matchData='';
          $scope.notFound=false;
        }

        else {
          $scope.matchData='';
          console.log("ggg",$scope.notFound);
        }

      }
    };


    $scope.match = function(obj){
      $scope.searchData.length="";
      for (var j=0; j < $scope.data.length; j++ ){
        var licenseNo = $scope.data[j].LicenseNo;

        if(licenseNo==obj){

          $scope.matchData=$scope.data[j];
          console.log($scope.matchData,"hi hello");

        }




      }


    };








  }
})();
