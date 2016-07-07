angular
  .module('Steve.HomeController', ['ngRoute'])
  .controller('HomeController', ["$scope", HomeController]);

function HomeController($scope) {
	console.log('HomeController page');
}