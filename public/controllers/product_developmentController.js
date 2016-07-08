angular
  .module('Steve.product_developmentController', ['ngRoute'])
  .controller('product_developmentController',['$scope', product_developmentController]);

function product_developmentController($scope) {
	$scope.next = function(){
		$scope.index++;
		console.log($scope.index)
	}
}