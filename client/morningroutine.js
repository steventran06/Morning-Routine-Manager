angular.module('morningroutine', [])
.controller('routineCtrl', function($scope, Routines) {
  // create $scope variables for displaying and incrementing count.

  $scope.routine = {};
  
  $scope.display = "START CLICKING";
  $scope.counter = 0;
  $scope.signedin = false;
  $scope.notsignedin = true;


  $scope.increment = function() {
    $scope.counter++;
    if ($scope.counter % 3 === 0 && $scope.counter % 5 === 0) {
      $scope.display = "FIZZBUZZ";
    } else if ($scope.counter % 3 === 0) {
      $scope.display = "FIZZ";
    } else if ($scope.counter % 5 === 0) {
      $scope.display = "BUZZ";
    } else {
      $scope.display = 'NOT DIVISIBLE BY 3 OR 5';
    }
  };

  $scope.submit = function() {
    Routines.submit($scope.routine);
  };

  $scope.signin = function() {
    $scope.signin = true;
    $scope.notsignedin = false;
  };




})
.factory('Routines', function ($http) {

  var submit = function() {

  }

});


