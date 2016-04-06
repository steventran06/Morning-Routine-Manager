angular.module('morningroutine', [])
.controller('routineCtrl', function($scope, $timeout, Routines) {

  // FAKE DATABASE
  $scope.userTable = [{id: 0, username: "Steven", password: "password", leavetime: "08:10"}, {id: 1, username: "test", password: "test", leavetime: "08:15"}];
  $scope.routineTable = [ {title: "Wake up!", description: "Get outta bed, sleepyhead!", rating: "bg-danger", userId: 0},
  {title: "Stop playing with your phone", description: "Seriously, get out of bed!", rating: "bg-warning", userId: 0},
  {title: "Boil eggs", description: "Soft-boiled eggs take 6 minutes", rating: "bg-info", userId: 0},
  {title: "Brush teeth", description: "Floss, if you didn't last night", rating: "bg-danger", userId: 0},
  {title: "Pick outfit for day", description: "Check the weather too!", rating: "bg-warning", userId: 0},
  {title: "Grab lunch, keys and wallet", description: "Don't wanna pay for lunch!", rating: "bg-info", userId: 0},
  {title: "Water your basil plant on the way out!", description: "Fresh basil, yum!", rating: "bg-warning", userId: 0},
  {title: "Wake up!", description: "Get outta bed, sleepyhead!", rating: "bg-danger", userId: 1},
  {title: "Stop playing with your phone", description: "Seriously, get out of bed!", rating: "bg-warning", userId: 1},
  {title: "Boil eggs", description: "Soft-boiled eggs take 6 minutes", rating: "bg-info", userId: 1},
  {title: "Brush teeth", description: "Floss, if you didn't last night", rating: "bg-danger", userId: 1},
  {title: "Pick outfit for day", description: "Check the weather too!", rating: "bg-warning", userId: 1},
  {title: "Grab lunch, keys and wallet", description: "Don't wanna pay for lunch!", rating: "bg-info", userId: 1},
  {title: "Water your basil plant on the way out!", description: "Fresh basil, yum!", rating: "bg-warning", userId: 1} ];
  // FAKE DATABASE

  $scope.user = {};
  var counter = 1;

  $scope.init = function() {
    if ($scope.user.leavetime !== "what time?") {
      $scope.leavetime();
    }

    $scope.routineTable.forEach(function(item) {
      if (item.userId === $scope.user.id) {
        $scope.routines.push(item);
      }
    });
  };

  // LEAVE TIME INPUT
  $scope.leavetime = function() {
    if ($scope.user.leavetime.charAt($scope.user.leavetime.length - 1) !== "M") {
      $scope.user.leavetime = convertTime($scope.user.leavetime);
    }
  };
  var convertTime = function(time) {
    var timeArr = time.split(":");
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
  // LEAVE TIME INPUT

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
    $scope.routine.userId = $scope.user.id;
    $scope.routines.push($scope.routine); // add to todos table
    $scope.routineTable.push($scope.routine);
    // Clear bar
    $scope.routine = {};
  };


  // SIGN IN/SIGNOUT ACTIONS
  $scope.signedin = false;
  $scope.notsignedin = true;
  $scope.startbutton = true;
  $scope.completed = false;

  $scope.wrongpassword = false;
  $scope.userdoesntexist = false;
  $scope.usernametaken = false;

  $scope.signup = function() {
    $scope.userTable.forEach(function(item) {
      if (item.username === $scope.user.username) {
        // bad signup toggle, username already exists
        $scope.usernametaken = true;
      } else {
        counter++;
        $scope.user.id = counter;
        $scope.user.leavetime = "what time?";
        $scope.userTable.push($scope.user);
        $scope.user = $scope.userTable[$scope.userTable.length -1];

        // once signed up, toggle logged in views
        $scope.startbutton = true;
        $scope.usernametaken = false;
        $scope.signedin = true;
        $scope.notsignedin = false;

        // $scope.userTable.forEach(function(item) {
        //   if (item.username === $scope.user.username) {
        //     $scope.user = item;
        //   }
        // });
      }
    });
  };


  $scope.signin = function() {
    $scope.userTable.forEach(function(item) {
      if (item.username === $scope.user.username) {
        if (item.password === $scope.user.password) {
          // turn off error messages and logi in
          $scope.userdoesntexist = false;
          $scope.wrongpassword = false;
          $scope.signedin = true;
          $scope.notsignedin = false;
          $scope.startbutton = true;

          // reassign user to be matching user in database
          $scope.user = item;
          $scope.init();
        } else {
          // bad password toggle;
          $scope.wrongpassword = true;
          $scope.userdoesntexist = false;
        }
      } else {
        // user doesn't exists toggle
        $scope.userdoesntexist = true;
        $scope.wrongpassword = false;
      }
    });
  };

  $scope.signout = function() {
    $scope.signedin = false;
    $scope.notsignedin = true;

    //clear user data and clear routines list for next user;
    $scope.user = {};
    $scope.routines = [];
    $scope.finishedRoutines = [];
    $scope.completed = false;
    $scope.totalTime = null;
    $scope.tasks = false;
  };
  // SIGN IN/SIGNOUT ACTIONS


  // TASKS HAVE BEGUN
  $scope.routine = {};
  $scope.routines = [];
  $scope.finishedRoutines = [];
  $scope.finishedTime = '';

  $scope.start = function() {
    $scope.startbutton = false;
    $scope.tasks = true;
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
      $scope.startbutton = true;
      $scope.tasks = false;
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

});



