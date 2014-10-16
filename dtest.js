'use strict';

angular.module('myApp', ['ngTouch', 'ngDragDrop'])
.controller('Ctrl', function ($scope, $log) {
  $scope.onStartCallback = function () {
    $log.info("onStart happened!");
  };
});
