angular.module('myApp').controller('loginController', function ($scope, $state, $stateParams, $http) {
  $scope.message = $stateParams.message;
  $scope.login = login;
  $scope.loggout = loggout;
  $scope.createAccount = createAccount;
  $scope.viewUserList = viewUserList;
  var token = localStorage.getItem('auth-token');
  if ($stateParams.logged == true) $scope.logged = true;

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
        $scope.message = 'Logged in';
        $scope.logged = true;
      },
      function (res) {
        $scope.message = res.data.message;
      });
  }

  function createAccount() {
    $state.go('createAccount');
  }

  function loggout() {
    localStorage.setItem('auth-token', '');
    $scope.message = 'Logged out';
    $scope.logged = false;
  }

  function viewUserList() {
    $state.go('list');
  }

});