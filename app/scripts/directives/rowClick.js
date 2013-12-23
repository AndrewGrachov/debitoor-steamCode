'use strict';

angular.module('debitoorSteamCodeApp')
  .directive('rowClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        element.click(function(){
          scope.$eval(attrs.rowClick);
          if(!scope.$$phase){
            scope.$apply();
          }
          return false; //prevent bubbling
        });
      }
    };
  });
