angular.module('myApp', ['ui.router']);

angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  var login = {
    name: 'login',
    url: '/home',
    component: 'loginComponent',
    params: {
      message: null,
      logged: false,
      created: false,
      alertType: null
    }
  };

  var createAccount = {
    name: 'createAccount',
    url: '/create-account',
    component: 'createAccountComponent'
  };

  var list = {
    name: 'list',
    url: '/list',
    component: 'listComponent'
  };

  var user = {
    name: 'user',
    url: '/user',
    component: 'profileComponent',
  }

  $stateProvider.state(login);
  $stateProvider.state(createAccount);
  $stateProvider.state(list);
  $stateProvider.state(user);
});
angular.module('myApp').component('createAccountComponent', {
  templateUrl: 'src/js/components/createAccount/create-account-view.html',
  controller: 'createAccountController'
});
angular.module('myApp').controller('createAccountController', function($scope, $state, $http){
  $scope.createAccount = createAccount;
  $scope.message = '';
  $scope.goBack = goBack;
  $scope.alertType = "";

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
      $scope.alertType = "alert-danger";
    });
  }

  function goBack() {
    $state.go('login');
  }
});


angular.module('myApp').component('loginComponent', {
  templateUrl: 'src/js/components/login/login-view.html',
  controller: 'loginController'
});

angular
  .module("myApp")
  .controller("loginController", function($scope, $state, $stateParams, $http) {
    $scope.message = $stateParams.message;
    $scope.alertType = "";
    $scope.login = login;
    $scope.logout = logout;
    $scope.createAccount = createAccount;
    $scope.viewProfile = viewProfile;
    $scope.viewUserList = viewUserList;
    $scope.token = localStorage.getItem("auth-token");
    $scope.userId = localStorage.getItem("userId");
    if ($scope.userId != "") $scope.welcome = true;
    if ($scope.token != "") $scope.logged = true;
    if ($stateParams.created) $scope.alertType = "alert-info";

    function login() {
      var data = {
        username: $scope.username,
        password: $scope.password
      };
      // Pour gerer les messages en cas d'erreur: then puis 2 fonctions :
      // callbacks en cas de succes et en cas d'echec
      $http.post("http://localhost:1407/login", JSON.stringify(data)).then(
        function(res) {
          localStorage.setItem("auth-token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          $scope.message = "Logged in";
          $scope.alertType = "alert-success";
          $scope.logged = true;
          $scope.welcome = true;
          $scope.userId = res.data.userId;
        },
        function(res) {
          $scope.message = res.data.message;
          $scope.alertType = "alert-danger";
        }
      );
    }

    function createAccount() {
      $state.go("createAccount");
    }

    function viewProfile() {
      $state.go("user");
    }

    function logout() {
      localStorage.setItem("auth-token", "");
      localStorage.setItem("userId", "");
      $scope.userId = "";
      $scope.message = "Logged out";
      $scope.alertType = "alert-warning";
      $scope.logged = false;
      $scope.welcome = false;
    }

    function viewUserList() {
      $state.go("list");
    }
  });

angular.module('myApp').component('profileComponent', {
  templateUrl: 'src/js/components/profile/profile-view.html',
  controller: 'profileController'
});
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
angular.module('myApp').component('listComponent', {
  templateUrl: 'src/js/components/userList/user-list-view.html',
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