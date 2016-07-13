angular
	.module('Steve.qualityController', ['ngRoute'])
	.controller('qualityController',['$scope', 'ChoiceFactory', qualityController]);

function qualityController($scope, ChoiceFactory){
	$scope.dataObj = ChoiceFactory.ReturnChoice();
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

	$scope.toleranceFunction = function() {
		if($scope.tolerance.level == 'strict'){
			$scope.scrapRate *= 1.4;
		}else if($scope.tolerance.level == 'tight'){
			$scope.scrapRate *= 1.15;
		}else if($scope.tolerance.level == 'loose'){
			$scope.scrapRate *= 1.05;
		}

		if($scope.scrapRate > 1) {
			$scope.scrapRate = 1;
		}
	}
}