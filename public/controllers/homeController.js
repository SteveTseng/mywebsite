angular
  .module('Steve.HomeController', ['ngRoute'])
  .controller('HomeController',['$scope', HomeController]);

function HomeController($scope) {
	$scope.productPath = 'index.html#/product';
}