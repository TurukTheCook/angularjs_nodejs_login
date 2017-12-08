angular.module('myApp').controller('profileController', function($scope, $state, $http){
  $scope.userId = localStorage.getItem('userId');
  $scope.editUser = editUser;
  $scope.deleteUser = deleteUser;
  $scope.goBack = goBack;

  // $http.get('http://localhost:1407/user/' + $scope.userId).then(
  //   function (res) {
  //     $scope.profileId = res.data.profileId;
  //     $scope.profileFirstName = res.data.profileFirstName;
  //     $scope.profileLastName = res.data.profileLastName;
  //     $scope.profileAge = res.data.profileAge;
  //   }
  // );

  function editUser(user){
    var data = {
      username: $scope.username,
      password: $scope.password,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      age: $scope.age
    };
    //Call the services
    $http.put('http://localhost:1407/user/' + $scope.userId, JSON.stringify(data)).then(
      function (res) {
        var message = res.data.message;
        $state.go('login', { message: message, alertType: 'alert-info', created: true });
      }, function (res) {
        $scope.message = res.data.message;
      });
  }

  function deleteUser(user){

  }

  function goBack() {
    $state.go('login');
  }
});