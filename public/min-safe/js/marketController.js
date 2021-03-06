angular
	.module('Steve.marketController', ['ngRoute'])
	.controller('marketController',['$scope', 'ChoiceFactory', 'FinanceFactory', 'ScoreBoardFactory', marketController]);

function marketController($scope, ChoiceFactory, FinanceFactory, ScoreBoardFactory) {
	$scope.setPrice = 0;
	$scope.financeData = FinanceFactory.ReturnAccountInfo();
	$scope.choiceData = ChoiceFactory.ReturnChoice();
	$scope.conversionRate = 0;
	$scope.profit = 0;

	//revenue and costs are updated in the finance factory
	//conversion rate are calculated from arbitrary, but insightful numbers
	$scope.revenueUpdate = function() {
		$scope.revenue = $scope.choiceData.soldQuantity * $scope.setPrice;
		FinanceFactory.UpdateRevenue($scope.revenue);
		$scope.priceDifference = $scope.setPrice - 15; //15 is the market price
		//setPrice will influence the conversion rate of the products sold
		if($scope.priceDifference >= 0) {
			$scope.priceImpact = (1 - $scope.priceDifference * $scope.priceDifference / 15) * 0.4;
			if($scope.priceImpact <= 0){
				$scope.priceImpact = 0;
			}
		} else if($scope.priceDifference < 0) {
			$scope.priceImpact = (1 + $scope.priceDifference * -1 / 15) * 0.4;
			if($scope.priceImpact > 1){
				$scope.priceImpact = 1;
			}
		}
		$scope.conversionRate = $scope.choiceData.qualityControlImpact * $scope.priceImpact;
		$scope.prototypeCost = 0;
		$scope.manufacturingCost = 0;

			if($scope.financeData.cost[1].name == 'prototype') {
				$scope.prototypeCost = $scope.financeData.cost[1].amount;
			}
			if($scope.financeData.cost[2].name == 'manufacturing'){
				$scope.manufacturingCost = $scope.financeData.cost[2].amount;
			}

		$scope.revenue = $scope.choiceData.soldQuantity * $scope.setPrice * $scope.conversionRate;
		$scope.profit = $scope.revenue + $scope.prototypeCost + $scope.manufacturingCost;
		FinanceFactory.UpdateCost({name:'revenue', amount:$scope.revenue});
	};

	$scope.submitScore = function() {
		//firebase is access again here, to store new user name and email.
		//the score is automatically update into the database
		$scope.firebase = firebase.database().ref();
		$userRef = $scope.firebase.child('users');
		$scope.userInfo = {name:$scope.name, email:$scope.email, profit: $scope.profit};
		$userRef.push($scope.userInfo);

		$scope.name = '';
		$scope.email = '';
	};
}