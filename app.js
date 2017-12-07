angular.module('myApp', ['ui.router']);

angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  var login = {
    name: 'login',
    url: '/home',
    component: 'loginComponent'
  };

  var createAccount = {
    name: 'createAccount',
    url: '/create-account',
    component: 'createAccountComponent'
  };

  var list = {
    name: 'list',
    url: '/list',
    templateUrl: 'views/list.html'
  };

  $stateProvider.state(login);
  $stateProvider.state(createAccount);
  $stateProvider.state(list);
});