angular.module('myApp').controller('loginController', function($scope, $state, $http){
  $scope.login = login;
  $scope.createAccount = createAccount;
  $scope.token = "";
  $scope.errorlog = "";
  /* var _token = localStorage.getItem('auth-token'); */

function login() {
  var data = {
    username: username,
    password: password
  };
  //Call the services
  $http.post('http://localhost:1407/login', JSON.stringify(data)).then(function(res) {
    if (res.status == 400) {
      $scope.errorlog = res.data;
    }
    console.log('ok');
/*     if (res.status == 200) {
      $scope.token = res.data;
    } */
  });
}

function createAccount(){
  $state.go('createAccount');
}

});
