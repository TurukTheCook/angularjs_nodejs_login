angular.module('myApp').controller('loginController', function($scope, $state, $http){
  // $scope.displayList = _displayList;
  // $scope.createUser = _createUser;
  $scope.login = _login;
  $scope.createAccount = createAccount;
  // $scope.deleteProfile= _deleteProfile;

  var _token = localStorage.getItem('auth-token');

//create a username
function _login() {
  var data = {
    username: $scope.username,
    password: $scope.password
  };
  //Call the services
  $http.post('http://localhost:5000/login', JSON.stringify(data)).then(function (res) {
    if (res.status(200)) {
      console.log(res);
      $scope.token = res.data.token;
    }
    if (res.status(404)) {
      alert(res.data.message);
    }
  });
  console.log('ok');
}

  function createAccount(){
  $state.go('/create-account');
}

});
