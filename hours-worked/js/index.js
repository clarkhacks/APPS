angular.module('App', ['firebase'])

.controller('AppCtrl', function($scope, $firebase) {
  var fireData = new Firebase('https://clarkhacks-db.firebaseio.com/hours-worked/');

  var sync = $firebase(fireData);

  $scope.count = sync.$asObject();

  $scope.appClass = "hidden";
  $scope.up = function() {
    if(!$scope.downVoted) {
      $scope.count.counter+=.5;
      $scope.count.$save($scope.count.counter);
    }
    else {
      $scope.count.counter += .5;
      $scope.count.$save($scope.count.counter);
    }
  }

  $scope.down = function() {
    if($scope.count.counter >= 1) {
      $scope.count.counter-=.5;
      $scope.count.$save($scope.count.counter);
    }
    else {
      $scope.count.counter -= .5;
      $scope.count.$save($scope.count.counter);
    }
  }
  if(window.location.href.indexOf("?view") > -1) {
    $scope.appClass = "view";
  }
})
