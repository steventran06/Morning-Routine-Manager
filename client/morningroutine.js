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
    $scope.routines.push($scope.routine); // add to todos table
    // Clear bar
    $scope.routine = {};
  };

  $scope.signin = function() {
    $scope.signedin = true;
    $scope.notsignedin = false;
  };

  $scope.signout = function() {
    $scope.signedin = false;
    $scope.notsignedin = true;
  };

  $scope.start = function() {
    $scope.routines.forEach(function (routine) {
      routine.start = new Date();
      var min = routine.start.getMinutes();
      var sec = routine.start.getSeconds();
      if (min < 10) {
        min = '0' + min.toString();
      }
      if (sec < 10) {
        sec = '0' + sec.toString();
      }
      routine.time = [routine.start.getHours(), ':', min, ":", sec].join(''); // log readable time
    });
  };

  $scope.remove = function(index) {
    var removed = $scope.routines.shift();
    var currentTime = new Date();
    var totalTime = parseInt((currentTime - removed.start)/1000);
    var minutes = Math.floor(totalTime / 60);
    var seconds = Math.floor(totalTime % 60);
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }
    removed.duration = [minutes, ':', seconds, ' minutes'].join('');
    $scope.finishedRoutines.push(removed);

    // $scope.routines.forEach(function (routine) {
    //   routine.start = currentTime;
    //   routine.time = [routine.start.getHours(), ':', routine.start.getMinutes(), ":", routine.start.getSeconds()].join(''); // log readable time
    // });
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


