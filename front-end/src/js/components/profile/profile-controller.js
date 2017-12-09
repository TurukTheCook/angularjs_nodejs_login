angular.module('myApp').controller('profileController', function ($scope, $state, $http) {
  var userId = localStorage.getItem('userId');
  var token = localStorage.getItem('auth-token');
  $scope.logged = false;
  $scope.editEnabled = false;
  $scope.editUser = editUser;
  $scope.saveEdit = saveEdit;
  $scope.cancelEdit = cancelEdit;
  $scope.deleteUser = deleteUser;
  $scope.goBack = goBack;
  $scope.alertType = "";

  function displayProfile(){
    $http
      .get("http://localhost:1407/user/" + userId + "?token=" + token)
      .then(
        function (res) {
          $scope.profileId = userId;
          $scope.profileFirstName = res.data.profileFirstName;
          $scope.profileLastName = res.data.profileLastName;
          $scope.profileAge = res.data.profileAge;
          $scope.logged = true;
        },
        function (res) {
          $scope.message = res.data.message;
          $scope.alertType = "alert-danger";
        }
      );
  }

  function editUser() {
    $scope.editEnabled = true;
  }

  function saveEdit(user) {
    var data = {
      username: $scope.editUsername,
      password: $scope.editPassword,
      firstName: $scope.editFirstName,
      lastName: $scope.editLastName,
      age: $scope.editAge
    };
    
    if ($scope.editUsername && $scope.editPassword) {
      $http.put("http://localhost:1407/user/" + userId + "?token=" + token, JSON.stringify(data)).then(
        function (res) {
          $scope.message = res.data.message;
          $scope.alertType = "alert-info";
          $scope.editEnabled = false;
          localStorage.setItem('userId', data.username);
          userId = data.username;
          displayProfile();
        },
        function (res) {
          $scope.message = res.data.message;
          $scope.alertType = "alert-danger";
          $scope.editEnabled = false;
        });
    } else {
      $scope.message = 'You must provide a username and password'
      $scope.alertType = "alert-danger";
    }
  }

  function cancelEdit() {
    $scope.editEnabled = false;
    $scope.alertType = "";
    $scope.message = "";
  }

  function deleteUser(user) {
    if (confirm('Are you sure ?')) {
      $http.delete("http://localhost:1407/user/" + userId + "?token=" + token).then(
        function (res) {
          var message = res.data.message;
          $scope.alertType = "alert-info";
          localStorage.setItem("auth-token", "");
          localStorage.setItem("userId", "");
          userId = "";
          $state.go('login', { message: message, alertType: 'alert-info', created: true });
        },
        function (res) {
          $scope.message = res.data.message;
          $scope.alertType = "alert-danger";
        });
    }
  }

  function goBack() {
    $state.go('login');
  }

  displayProfile();
});