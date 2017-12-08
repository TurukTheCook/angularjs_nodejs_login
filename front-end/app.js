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