angular.module('Application', ['Calc'])
  .controller('ApplicationController', function ($scope, add) {
    $scope.add = add;
  });
