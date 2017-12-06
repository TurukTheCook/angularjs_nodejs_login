angular.module('myApp',['ui.router']);

angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/login');

  var login = {
    name: 'login',
    url: '/login',
    component: 'loginComponent'
  };

	var create_account = {
		name: 'create_account',
		url: '/create-account',
    component: 'componentCreateUser'
	};

  var list = {
    name: 'list',
    url: '/list',
    templateUrl: 'views/list.html'
  };

	$stateProvider.state(login);
	$stateProvider.state(create_account);
	$stateProvider.state(list);
});
