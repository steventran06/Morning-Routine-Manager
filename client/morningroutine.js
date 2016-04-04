angular.module('morningroutine', [])
.controller('routineCtrl', function($scope, Routines) {
  // create $scope variables for displaying and incrementing count.

  $scope.routine = {};
  $scope.routines = [];
  $scope.user = {};
  
  $scope.signedin = false;
  $scope.notsignedin = true;

  $scope.submit = function() {
    $scope.routines.push($scope.routine);
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


})
.directive('routine', function() {
  return {
    templateUrl: 'routine.html'
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


