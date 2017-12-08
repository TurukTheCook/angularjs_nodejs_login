angular.module('myApp').controller('profileController', function($scope, $state, $http){
  $scope.userId = localStorage.getItem('userId');
  $scope.editUser = editUser;

  function editUser(user){
    
  }
});