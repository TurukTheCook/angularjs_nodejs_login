angular.module('myApp', ['ui.router']);

angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  var login = {
    name: 'login',
    url: '/login',
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