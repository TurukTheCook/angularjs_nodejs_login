angular.module('myApp').controller('loginController', function($scope, $state, $http){
  $scope.displayList = _displayList;
  $scope.createUser = _createUser;
  // $scope.deleteProfile= _deleteProfile;

  var _token = localStorage.getItem('auth-token');

   //afficher la liste
 function _displayList(){

 };

  // Create a new profile
 function createAccount(){
  //envoyer à la page /create_username.html
   });
 }

});
