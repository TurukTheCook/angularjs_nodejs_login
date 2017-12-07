angular.module('myApp').controller('loginController', function($scope, $state, $http){
  $scope.login = login;
  $scope.createAccount = createAccount;
  /* var _token = localStorage.getItem('auth-token'); */

function login() {
  var username = $scope.username;
  var password = $scope.password;
  var data = {
    username: username,
    password: password
  };
  //Call the services
  $http.post('http://localhost:1407/login', JSON.stringify(data)).then(function(res) {
    if (res.status(200)) {
      /* $scope.token = res.data.token; */
      console.log('ok');
    }
    if (res.status(404)) {
      console.log('not ok');
    }
    console.log(res);
  });
}

function createAccount(){
  $state.go('createAccount');
}

});
