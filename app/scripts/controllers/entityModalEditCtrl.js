'use strict';

angular.module('debitoorSteamCodeApp')
  .controller('entityModalEditCtrl', ['$scope', '$modalInstance', 'entity', 'Restangular', function ($scope, $modalInstance, entity, Restangular) {
    $scope.entity = entity;
    $scope.add = !entity.id;
    $scope.title = $scope.add ? 'Edit customer' : 'Add Customer';

    $scope.update = function () {
      $scope.entity.saving = true;

    };
    $scope.close = function () {
      $modalInstance.close();
    };

    $scope.saveChanges = function () {
      $scope.entity.saving = true;
      if ($scope.add) {
        Restangular.all('customers').post($scope.entity).then(function (response) {
          $scope.entity.saving = false;
          console.log('response:', response);
          $modalInstance.close({add: $scope.entity});
        });
      }
      else {
        $scope.entity.put().then(function (response) {
          $scope.entity.saving = false;
          console.log('response:', response);
          $modalInstance.close($scope.entity);
        });
      }
    };
  }]);
