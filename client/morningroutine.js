angular.module('morningroutine', [])
.controller('routineCtrl', function($scope, Routines) {
  // create $scope variables for displaying and incrementing count.

  $scope.routine = {};
  $scope.counter = 0;
  $scope.routines = [];

  $scope.user = {};
  
  $scope.signedin = false;
  $scope.notsignedin = true;

  $scope.submit = function() {
    // add array slot to object
    $scope.routine.counter = $scope.counter;
    $scope.routines.unshift($scope.routine);
    $scope.counter++;
    // Clear bar
    $scope.routine = {};

    // Routines.submit($scope.routine);
  };

  $scope.signin = function() {
    $scope.signedin = true;
    $scope.notsignedin = false;
  };

  $scope.signout = function() {
    $scope.signedin = false;
    $scope.notsignedin = true;
  };

  $scope.remove = function(index) {
    $scope.routines.shift();
  };


})
.factory('Routines', function ($http) {

  var submit = function() {

  };

});
// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/*', {
//       redirectTo: '/'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });

// });


