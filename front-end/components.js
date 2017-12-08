angular.module('myApp').component('createAccountComponent', {
  templateUrl: 'components/createAccount/create-account-view.html',
  controller: 'createAccountController'
});
angular.module('myApp').controller('createAccountController', function($scope, $state, $http){
  $scope.createAccount = createAccount;
  $scope.message = '';
  $scope.goBack = goBack;

  function createAccount() {
    var data = {
      username: $scope.username,
      password: $scope.password,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      age: $scope.age
    };
    //Call the services
    $http.post('http://localhost:1407/create-account', JSON.stringify(data)).then(
      function (res) {
        var message = res.data.message;
        $state.go('login', {message:message, alertType:'alert-info', created:true});
    }, function(res) {
      $scope.message = res.data.message;
    });
  }

  function goBack() {
    $state.go('login');
  }
});


angular.module('myApp').component('loginComponent', {
  templateUrl: 'components/login/login-view.html',
  controller: 'loginController'
});

angular.module('myApp').controller('loginController', function ($scope, $state, $stateParams, $http) {
  $scope.message = $stateParams.message;
  $scope.alertType = '';
  $scope.login = login;
  $scope.logout = logout;
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

  function logout() {
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
angular.module('myApp').component('profileComponent', {
  templateUrl: 'components/profile/profile-view.html',
  controller: 'profileController'
});
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
angular.module('myApp').component('listComponent', {
  templateUrl: 'components/userList/user-list-view.html',
  controller: 'listController'
});

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