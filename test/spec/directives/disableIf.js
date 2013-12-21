'use strict';

describe('Directive: disableIf', function () {

  // load the directive's module
  beforeEach(module('debitoorSteamCodeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<disable-if></disable-if>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the disableIf directive');
  }));
});
