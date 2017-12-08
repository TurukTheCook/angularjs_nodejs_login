angular.module('myApp').controller('listController', function ($scope, $state, $http) {
  var token = localStorage.getItem('auth-token');
  $scope.message = '';
  $scope.alertType = '';
  $scope.goBack = goBack;

  $http.get('http://localhost:1407/users?token=' + token).then(
    function (res) {
      $scope.userlist = res.data.list;
    },
    function (res) {
      $scope.message = res.data.message;
      $scope.alertType = 'alert-danger';
  });

function goBack() {
  $state.go('login');
}
});