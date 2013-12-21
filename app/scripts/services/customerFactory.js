'use strict';

angular.module('debitoorSteamCodeApp')
  .factory('customerFactory',['Restangular', function (Restangular) {
    var self = this;

    var Customer = (function(){
      var customer = function(data){

        data = data || {};
        var result = tv4.validate(data,tv4.getSchema('customer'));
        if (result){
          for(var prop in data){
            if (data.hasOwnProperty(prop)){
              this[prop] = data[prop];
            }
          }
        }
        else{
          return result;
        }
      };
      customer.prototype = Restangular;

      return customer;

    })();



    return {
      getEntity:function(data){
         return new Customer(data);
        },
      getEntities:function(array){
        var rawArray = _.map(array,function(arrayItem){return new Customer(arrayItem);});
        return {
          entities: _.reject(rawArray,function(rawArrayItem){return rawArrayItem.error;}),
          invalidEntities:_.filter(rawArray,function(rawArrayItem){return rawArrayItem.error;})
        }
      }

    };
  }]);
