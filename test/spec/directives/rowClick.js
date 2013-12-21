'use strict';

describe('Directive: rowClick', function () {

  // load the directive's module
  beforeEach(module('debitoorSteamCodeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<row-click></row-click>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rowClick directive');
  }));
});
