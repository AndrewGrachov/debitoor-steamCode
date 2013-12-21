(function(){
    'use strict';
    console.log('app loaded');
    tv4.addSchema('customer','https://api.debitoor.com/api/v1.0/schemas/customer');

    var application = angular.module('debitoorSteamCodeApp', ['restangular','ngRoute','angularFileUpload','ui.bootstrap'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
              templateUrl: 'views/main.html',
              controller: 'MainCtrl'
            })
                .when('/contacts', {
              templateUrl: 'views/contacts.html',
              controller: 'ContactsCtrl'
            })
                .otherwise({
              redirectTo: '/'
            });
          }])
        .config(['$locationProvider',function($locationProvider){
            $locationProvider.html5Mode(true);
          }])
        .config(['RestangularProvider',function(RestangularProvider){
            RestangularProvider.setBaseUrl('/api/debitoor/');
          }]);

    application.run(['$rootScope','$location','Restangular',function($rootScope,$location){

        $rootScope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
          };

      }]);
  })();

