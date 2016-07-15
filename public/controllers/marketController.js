angular
	.module('Steve.marketController', ['ngRoute'])
	.controller('marketController',['$scope', 'ChoiceFactory', 'FinanceFactory', marketController]);

function marketController($scope, ChoiceFactory, FinanceFactory) {
	$scope.setPrice = 0;
	$scope.financeData = FinanceFactory.ReturnAccountInfo();
	$scope.choiceData = ChoiceFactory.ReturnChoice();

	$scope.revenueUpdate = function(){
		$scope.revenue = $scope.choiceData.soldQuantity * $scope.setPrice;
		FinanceFactory.UpdateRevenue($scope.revenue);
	}
	$scope.priceDifference = $scope.setPrice - 15;
	if($scope.priceDifference > 0){
		$scope.priceImpact = 1 - $scope.priceDifference / 15;
		console.log($scope.priceImpact)
	} else if($scope.setPrice - 15 < 0){
		$scope.priceImpact = 1 + $scope.priceDifference / 15;
		console.log($scope.priceImpact)
	}
	$scope.conversionRate = $scope.choiceData.qualityControlImpact * $scope.priceImpact

}