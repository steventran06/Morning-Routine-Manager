angular.module('morningroutine', [])
.controller('routineCtrl', function($scope, $timeout, Routines) {

  $scope.user = {};
  $scope.leavetime = function() {
    $scope.user.leavetime = convertTime($scope.user.leavetime);
    $scope.leavetimeset = true;

  };

  var convertTime = function(time) {
    var timeArr = time.toString().split(":");
    var ampm = " AM";
    if ((timeArr[0] - 12) > 0) {
      timeArr[0] = timeArr[0] - 12;
      ampm = " PM";
    } else if ((timeArr[0] - 12) === 0) {
      timeArr[0] = 12;
      ampm = " PM";
    } else if (timeArr[0] === "00") {
      timeArr[0] = 12;
    }

    return [timeArr[0],":",timeArr[1], ampm].join("");
  };


  // RUNNING CLOCK
  $scope.clock = "loading clock..."; // initialise the time variable
  $scope.tickInterval = 1000; //ms

  var tick = function() {
    $scope.clock = Date.now(); // get the current time
    $timeout(tick, $scope.tickInterval); // reset the timer
  };

  $timeout(tick, $scope.tickInterval);
  // RUNNING CLOCK
  
  $scope.submit = function() {
    // add array slot to object
    $scope.routines.push($scope.routine); // add to todos table
    // Clear bar
    $scope.routine = {};
  };


  // SIGN IN/SIGNOUT ACTIONS
  $scope.signedin = false;
  $scope.notsignedin = true;
  $scope.startbutton = true;
  $scope.completed = false;
  $scope.leavetimeset = false;


  $scope.signin = function() {
    $scope.signedin = true;
    $scope.notsignedin = false;
  };

  $scope.signout = function() {
    $scope.signedin = false;
    $scope.notsignedin = true;
  };
  // SIGN IN/SIGNOUT ACTIONS


  // TASKS HAVE BEGUN
  $scope.routine = {};
  $scope.routines = [];
  $scope.finishedRoutines = [];
  $scope.finishedTime = '';

  $scope.start = function() {
    $scope.startbutton = false;
    $scope.routines.forEach(function (routine) {
      routine.start = Date.now();
    });
  };

  $scope.remove = function(index) {
    // remove item from Routines list
    var removed = $scope.routines.shift();
    // give end date to removed item
    removed.end = Date.now(); 
    // calculate total time in seconds for each routine item
    var length = parseInt((Date.now() - removed.start)/1000);
    // format for display
    removed.duration = displayTime(length);
    // add routine to finishedRoutines array;
    $scope.finishedRoutines.push(removed);

    // when all routines are completed
    if ($scope.routines.length === 0) {
      // calculate total time of all routines in seconds
      var totalTime = (($scope.finishedRoutines[$scope.finishedRoutines.length-1].end - $scope.finishedRoutines[0].start)/1000);
      // format for display
      $scope.totalTime = displayTime(totalTime);
      $scope.completed = true;
    }
  };

  var displayTime = function(totalTime) {
      var minutes = Math.floor(totalTime / 60);
      var seconds = Math.floor(totalTime % 60);
      var mintext = ' minutes and ';
      var sectext = ' seconds';
      if (minutes === 1) {
        mintext = ' minute and ';
      }
      if (seconds === 1) {
        sectext = ' second';
      }
      return [minutes, mintext, seconds, sectext].join('');
  };
  // TASKS HAVE BEGUN

})
.factory('Routines', function ($http) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    });
  };

return{
  signin: signin,
  signup: signup  
};

});
// .config(function ($routeProvider, $httpProvider) {

// });


