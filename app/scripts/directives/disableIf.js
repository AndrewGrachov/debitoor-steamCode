'use strict';

angular.module('debitoorSteamCodeApp')
  .directive('disableIf', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.disableIf, function () {
          var disable = scope.$eval(attrs.disableIf);
          if (disable) {
            element.find('input').each(function () {
              $(this).attr('disabled', 'disabled');
            });

            if ($(this).attr('select2input')) {
              $(this).select2('disable');
            }

            element.find('textarea').attr('disabled', 'disabled');
          }
          else {
            element.find('input').each(function () {
              $(this).removeAttr('disabled');

              if ($(this).attr('select2input')) {
                $(this).select2('enable');
              }
              element.find('textarea').removeAttr('disabled');
            });
          }
        });
      }
    };
  });
