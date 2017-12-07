angular.module('myApp').controller('loginController', function($scope, $state, $http){
  $scope.login = login;
  $scope.createAccount = createAccount;
  /* var _token = localStorage.getItem('auth-token'); */

function login() {
  var data = {
    username: $scope.username,
    password: $scope.password
  };
  //Call the services
  $http.post('http://localhost:5000/login', JSON.stringify(data)).then(function(res) {
    if (res.status(200)) {
      /* $scope.token = res.data.token; */
    }
    if (res.status(404)) {
      /* alert(res.data.message); */
    }
  });
}

function createAccount(){
  $state.go('createAccount');
}

});
