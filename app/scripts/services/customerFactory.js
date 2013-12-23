'use strict';

angular.module('debitoorSteamCodeApp')
  .factory('customerFactory', ['Restangular', function (Restangular) {
    var Customer = (function () {
      var customer = function (data) {

        data = data || {};
        var result = tv4.validate(data, tv4.getSchema('customer'));
        if (result) {
          for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
              this[prop] = data[prop];
            }
          }
          this.paymentTermsId = data.paymentTermsId || 1;
        }
        else {
          return result;
        }
      };
      customer.prototype = Restangular;
      customer.prototype.banish = function () {
        this.isArchived = true;
        this.put();
      };
      return customer;

    })();


    return {
      getEntity: function (data) {
        return new Customer(data);
      },
      getEntities: function (array) {
        var rawArray = _.map(array, function (arrayItem) {
          return new Customer(arrayItem);
        });
        return {
          entities: _.reject(rawArray, function (rawArrayItem) {
            return rawArrayItem.error;
          }),
          invalidEntities: _.filter(rawArray, function (rawArrayItem) {
            return rawArrayItem.error;
          })
        };
      }
    };
  }]);
