angular.module('myApp').controller('listController', function ($scope, $state, $http) {
  var token = localStorage.getItem('auth-token');
  $scope.message = '';
  $scope.goBack = goBack;

  $http.get('http://localhost:1407/users?token=' + token).then(
    function (res) {
      $scope.userlist = res.data.list;
      $scope.loggeduser = true;
    },
    function (res) {
      $scope.message = res.data.message;
      $scope.loggeduser = false;
  });

function goBack() {
  $state.go('login', {logged:$scope.loggeduser});
}
});