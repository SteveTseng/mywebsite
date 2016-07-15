angular
	.module('Steve.qualityController', ['ngRoute'])
	.controller('qualityController',['$scope', 'ChoiceFactory', qualityController]);

function qualityController($scope, ChoiceFactory){
	$scope.dataObj = ChoiceFactory.ReturnChoice();
	$scope.quantity = $scope.dataObj.quantity;
	$scope.scrapRate = 0;
	$scope.qualityControlLevels = [{
		id:1,
		level:'strict'
	},{
		id:2,
		level:'tight'
	},{
		id:3,
		level:'loose'
	}];
	$scope.tolerance = 'Not Yet Chosen';
	$scope.manufacturingAnalysis = 'TBD';
	console.log($scope.dataObj)

	if($scope.dataObj.choice == 'plastic'){
		if($scope.dataObj.thickness >= 0.045 && $scope.dataObj.thickness <= 0.140){
			$scope.manufacturingAnalysis = 'dimension pass';
			$scope.scrapRate += 0.05;
		}else if($scope.dataObj.thickness < 0.045){
			$scope.manufacturingAnalysis = 'too thin';
			$scope.scrapRate += 0.70;
		}else if($scope.dataObj.thickness > 0.140){
			$scope.manufacturingAnalysis = 'too thick, will warp';
			$scope.scrapRate += 0.60;
		}
	}

	$scope.temp = $scope.scrapRate;
	$scope.trashUnits = 0;
	$scope.acceptedUnits = 0;
	$scope.toleranceFunction = function() {
		if($scope.tolerance.level == 'strict'){
			$scope.temp = $scope.scrapRate * 1.4;
		}else if($scope.tolerance.level == 'tight'){
			$scope.temp = $scope.scrapRate * 1.15;
		}else if($scope.tolerance.level == 'loose'){
			$scope.temp = $scope.scrapRate * 1.05;
		}
		if($scope.temp > 1) {
			$scope.temp = 1;
		}
	$scope.trashUnits = $scope.temp * $scope.quantity;
	$scope.acceptedUnits = $scope.quantity - $scope.trashUnits;
	}

	$scope.sellingFunction = function(){
		ChoiceFactory.SellingChoice($scope.acceptedUnits);
	}
}