angular.module('morningroutine.routines', [])

.controller('RoutineController', function ($scope, Routines, Auth) {
  // store all links
  // Initialize links with all links stored on server from getAll call


.directive('mylink', function() {
  return {
    templateUrl: 'app/routines/myroutines.html'
  };
});
