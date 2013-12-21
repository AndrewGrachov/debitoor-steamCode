'use strict';

describe('Controller: ContactsCtrl', function () {

  // load the controller's module
  beforeEach(function(){module('debitoorSteamCodeApp');angular.module('restangular');});

  var ContactsCtrl,
    scope,restangular;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,Restangular) {
    console.log('injection');
    scope = $rootScope.$new();
    restangular = Restangular;

    ContactsCtrl = $controller('ContactsCtrl', {
      $scope: scope,
      Restangular:restangular
    });
  }));

  it('should attach a list of customers to the scope', function () {
    expect(scope.customers.length).toBe(0);
  });
//    todo: mock restangular
//  it('should set a variable noContacts if no contacts been loaded',function(){
//      expect(scope.noCustomers).toBe(true);
//    });
});
