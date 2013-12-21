'use strict';

angular.module('debitoorSteamCodeApp')
  .directive('uploadClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          var id =attrs.uploadClick;
          if (id){
            element.on('click',function(){
                $('#'+id).click();
              });
          }
        }
    };
  });
