angular.module('morningroutine', [])
.controller('routineCtrl', function($scope, Routines) {
  // create $scope variables for displaying and incrementing count.

  $scope.routine = {};
  $scope.routines = [];
  $scope.finishedRoutines = [];


  
  $scope.signedin = false;
  $scope.notsignedin = true;

  $scope.submit = function() {
    // add array slot to object
    $scope.routine.start = new Date(); // log start time
    $scope.routine.time = [$scope.routine.start.getHours(), ':', $scope.routine.start.getMinutes(), ":", $scope.routine.start.getSeconds()].join(''); // log readable time
    $scope.routines.push($scope.routine); // add to todos table
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
    var removed = $scope.routines.shift();
    var currentTime = new Date();
    removed.end = (currentTime - removed.start)/1000;
    $scope.finishedRoutines.push(removed);
  };


})
.factory('Routines', function ($http) {

  var submit = function() {

  };

});
// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/signup', {
//       templateUrl: '/signup.html',
//       controller: 'routineCtrl'
//     })
//     .when('/*', {
//       redirectTo: '/'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });

// });


