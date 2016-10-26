(function(){

  angular.module('psqca')
    .service('form', feedBackform);
  feedBackform.$inject = ['$http'];

  function feedBackform($http){

    return {

      mailSend : function(senddata){


console.log(senddata,"jjj");
        return  $http({
          method: 'POST',
          url: 'http://pakalerts.net/mail/feedbackform.php',
          headers: {
            'Content-Type': undefined
          },
          data : {maildata: senddata}
        });
      }
    }
  }


})();
