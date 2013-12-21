'use strict';
console.log('contactsd loading');
angular.module('debitoorSteamCodeApp')
  .controller('ContactsCtrl', ['$scope','Restangular','$upload','customerFactory','$modal',function ($scope,Restangular,$upload,customerFactory,$modal) {
    var modalOptions ={
      templateUrl:'views/addOrEditCustomerModal.html',
      backdrop:true,
      controller:'entityModalEditCtrl',
      resolve:{}
    }
    var helper = {
        __setCustomers:function(customers){
            if (customers.length === 0) {
              $scope.noCustomers = true;
            }
            var factoryResult = customerFactory.getEntities(customers);//todo:restangular middleware
            $scope.customers = factoryResult.entities;
            console.log(factoryResult.invalidEntities);
              console.log(factoryResult.entities);

          },
        customers:Restangular.all('customers'),
        loadCustomers:function(){
            this.customers.getList().then(this.__setCustomers);
          }
      };

    $scope.customers = [];
    $scope.progress = 0;

    $scope.setProgress = function(evt){
        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        console.log($scope.progress);
      };

    $scope.catchData = function (customers) {
      //data, status, headers, config
      var factoryResult = customerFactory.getEntities(customers);
      _.each(factoryResult.entities,function(entity){
        $scope.customers.push(entity);
      });
      console.log('customers:',$scope.customers);
      console.log("invalid:",factoryResult.invalidEntities);
    };

    $scope.onFileSelect = function($files){
        var file = $files[0];
        $upload.upload({
          url: '/contacts/uploadCSV',
          file: file
        })
            .progress($scope.setProgress)
            .success($scope.catchData);
      };
    $scope.$watch('customers',function(){
      if ($scope.customers.length>0){
        $scope.noCustomers = false;
      }
      });
    $scope.openModal = function(customer){
       modalOptions.resolve = {
         entity:function(){
           return customer;
         }
       }
       $modal.open(modalOptions);
    }
    helper.loadCustomers();
  }]);
