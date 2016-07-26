angular
	.module('Steve.qualityController', ['ngRoute'])
	.controller('qualityController',['$scope', 'ChoiceFactory', qualityController]);

function qualityController($scope, ChoiceFactory){
	$scope.dataObj = ChoiceFactory.ReturnChoice();
	$scope.quantity = $scope.dataObj.quantity;
	$scope.scrapRate = 0;
	$scope.marketPath = 'index.html#/market';
	$scope.tolerance = 'Not Yet Chosen';
	$scope.manufacturingAnalysis = 'TBD';

	//levels of quality control set in this array
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

	//wall thickness will determine the scrap rate
	if($scope.dataObj.choice == 'plastic'){
		if($scope.dataObj.thickness >= 0.045 && $scope.dataObj.thickness <= 0.140){
			$scope.manufacturingAnalysis = 'good quality!';
			$scope.scrapRate += 0.05;
		}else if($scope.dataObj.thickness < 0.045){
			$scope.manufacturingAnalysis = 'too thin';
			$scope.scrapRate += 0.70;
		}else if($scope.dataObj.thickness > 0.140){
			$scope.manufacturingAnalysis = 'too thick, will warp';
			$scope.scrapRate += 0.60;
		}
	}

	if($scope.dataObj.choice == 'metal'){
		if($scope.dataObj.thickness >= 0.03125 && $scope.dataObj.thickness <= 0.25){
			$scope.manufacturingAnalysis = 'good quality!';
			$scope.scrapRate += 0.05;
		}else if($scope.dataObj.thickness < 0.03125){
			$scope.manufacturingAnalysis = 'deformed wall';
			$scope.scrapRate += 0.70;
		}else if($scope.dataObj.thickness > 0.25){
			$scope.manufacturingAnalysis = 'uneven walls';
			$scope.scrapRate += 0.60;
		}
	}

	$scope.temp = $scope.scrapRate;
	$scope.trashUnits = 0;
	$scope.acceptedUnits = 0;
	//this function determines each level's consequences
	$scope.toleranceFunction = function() {
		if($scope.tolerance.level == 'strict') {
			//the scrap rate is amplified by the consequence of quality control level
			$scope.temp = $scope.scrapRate * 1.4;
			//choice is saved in the choice factory for later use
			ChoiceFactory.QualityChoice(1);
		}else if($scope.tolerance.level == 'tight') {
			$scope.temp = $scope.scrapRate * 1.15;
			ChoiceFactory.QualityChoice(0.95);
		}else if($scope.tolerance.level == 'loose') {
			$scope.temp = $scope.scrapRate * 1.05;
			ChoiceFactory.QualityChoice(0.9);
		}
		if($scope.temp > 1) {
			$scope.temp = 1;
		}
		$scope.trashUnits = $scope.temp * $scope.quantity;
		$scope.acceptedUnits = $scope.quantity - $scope.trashUnits;
	};
	//selling function stores the accepted units in the choice factory
	$scope.sellingFunction = function() {
		ChoiceFactory.SellingChoice($scope.acceptedUnits);
	};
}