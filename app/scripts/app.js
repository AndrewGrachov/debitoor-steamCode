'use strict';

angular.module('debitoorSteamCodeApp', [])
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
    .config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('/api/debitoor');

    }]);
