angular.module('myApp').controller('profileController', function ($scope, $state, $http) {
  var userId = localStorage.getItem('userId');
  var token = localStorage.getItem('auth-token');
  $scope.editUser = editUser;
  $scope.editEnabled = false;
  $scope.saveEdit = saveEdit;
  $scope.cancelEdit = cancelEdit;
  $scope.deleteUser = deleteUser;
  $scope.goBack = goBack;

  $http
    .get("http://localhost:1407/user/" + userId + "?token=" + token)
    .then(
      function (res) {
        $scope.profileId = userId;
        $scope.profileFirstName = res.data.profileFirstName;
        $scope.profileLastName = res.data.profileLastName;
        $scope.profileAge = res.data.profileAge;
      },
      function (res) {
        $scope.message = res.data.message;
        $scope.alertType = "alert-danger";
      }
    );

  function saveEdit(user) {
    var data = {
      username: $scope.editUsername,
      password: $scope.editPassword,
      firstName: $scope.editFirstName,
      lastName: $scope.editLastName,
      age: $scope.editAge
    };
    //Call the services
    $http.put("http://localhost:1407/user/" + userId + "?token=" + token, JSON.stringify(data)).then(
      function (res) {
        $scope.message = res.data.message;
        $scope.alertType = "alert-info";
      },
      function (res) {
        $scope.message = res.data.message;
        $scope.alertType = "alert-danger";
      });
  }

  function deleteUser(user) {

  }

  function goBack() {
    $state.go('login');
  }
});