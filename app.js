angular.module('myApp',['ui.router']);

angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/login');

  var login = {
  name: 'login',
  url: '/login',
  templateUrl: 'views/login.html'
  }

	var create_username = {
		name: 'create_username',
		url: '/create_username',
		templateUrl: 'views/create_username.html'
	}

  var list = {
    name: 'list',
    url: '/list',
    templateUrl: 'views/list.html'
  }

	$stateProvider.state(login);
	$stateProvider.state(create_username);
	$stateProvider.state(list);
})
