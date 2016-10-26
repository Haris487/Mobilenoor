angular.module('psqca', ['ionic', 'LocalStorageModule','ngCordova','ngCookies'])

  .run(function ($ionicPlatform, $rootScope, $cordovaNetwork,$cordovaDialogs) {
    $ionicPlatform.ready(function () {


      if(window.cordova && $cordovaNetwork.isOffline()){

        $cordovaDialogs.alert("Connection Error", 'Connection Error','Ok');



      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeController',
        cache: false
      })
      .state('download', {
        url: '/download',
        templateUrl: 'templates/download.html',
        controller: 'downloadsController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        cache : false
      })
      .state('subscription', {
        url: '/subscription',
        templateUrl: 'templates/subscription.html',
        controller: 'SubscriptionController'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'templates/products.html',
        controller: 'ProductsController'
      })
      .state('qr_code', {
        url: '/qr_code',
        templateUrl: 'templates/qr_code.html',
        controller: 'QRController'
      })
      .state('publication', {
        url: '/publication',
        templateUrl: 'templates/publication.html',
        controller: 'PublicationController'
      })
      .state('links', {
        url: '/links',
        templateUrl: 'templates/links.html',
        controller: 'linksController'
      })
      .state('feedBack', {
        url: '/feedback',
        templateUrl: 'templates/feedback.html',
        controller: 'feedBackController'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'templates/aboutpsqca.html',
        controller: 'aboutController'
      })
      .state('alerts', {
        url: '/alerts',
        templateUrl: 'templates/alerts.html',
        controller: 'AlertsController'
      });

    $urlRouterProvider.otherwise('/welcome');
    $httpProvider.interceptors.push('authInterceptor');
  }])
  .factory('authInterceptor', ['$q', 'localStorageService','$location', function ($q, localStorageService,$location) {

    return {
      request: function (config) {
        //console.log('Run on every request');
        //console.log('config object ', config);
        config.headers = config.headers || {};
        if (localStorageService.get('token')) {
          config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
        }
        return config;
      },
      responseError: function (response) {
        //console.log('response error ', response);
        if (response.status === 401) {
          // remove any stale tokens
          localStorageService.remove('token');
          $location.path('/login')
        }
        return $q.reject(response);
      }
    }


  }]);
