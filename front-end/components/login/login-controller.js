angular.module('myApp').controller('loginController', function ($scope, $state, $stateParams, $http) {
  $scope.message = $stateParams.message;
  $scope.alertType = '';
  $scope.login = login;
  $scope.loggout = loggout;
  $scope.createAccount = createAccount;
  $scope.viewProfile = viewProfile;
  $scope.viewUserList = viewUserList;
  $scope.token = localStorage.getItem('auth-token');
  $scope.userId = localStorage.getItem('userId');
  if ($scope.userId != '') $scope.welcome = true;
  if ($scope.token != '') $scope.logged = true;
  if ($stateParams.created) {
    $scope.alertType = 'alert-info';
  }

  function login() {
    var data = {
      username: $scope.username,
      password: $scope.password
    };
    // Pour gerer les messages en cas d'erreur: then puis 2 fonctions :
    // callbacks en cas de succes et en cas d'echec
    $http.post('http://localhost:1407/login', JSON.stringify(data)).then(
      function (res) {
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        $scope.message = 'Logged in';
        $scope.alertType = 'alert-success';
        $scope.logged = true;
        $scope.welcome = true;
        $scope.userId = res.data.userId;
      },
      function (res) {
        $scope.message = res.data.message;
        $scope.alertType = 'alert-danger';
      });
  }

  function createAccount() {
    $state.go('createAccount');
  }

  function viewProfile() {
    $state.go('user');
  }

  function loggout() {
    localStorage.setItem('auth-token', '');
    localStorage.setItem('userId', '');
    $scope.userId = '';
    $scope.message = 'Logged out';
    $scope.alertType = 'alert-warning';
    $scope.logged = false;
    $scope.welcome = false;
  }

  function viewUserList() {
    $state.go('list');
  }

});