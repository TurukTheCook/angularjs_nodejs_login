angular.module('myApp').controller('profileController', function($scope, $state, $http){
  $scope.userId = localStorage.getItem('userId');
  $scope.editUser = editUser;
  $scope.goBack = goBack;

  function editUser(user){
    
  }

  function goBack() {
    $state.go('login');
  }
});