angular
  .module('Steve.HomeController', ['ngRoute'])
  .controller('HomeController',['$scope', HomeController]);

function HomeController($scope) {
	$scope.next = function(){
		$scope.index++;
		console.log($scope.index)
	}
}