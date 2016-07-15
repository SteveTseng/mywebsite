angular
  .module('Steve.process_developmentController', ['ngRoute'])
  .controller('process_developmentController',['$scope','ChoiceFactory', '$sce', process_developmentController]);

function process_developmentController($scope, ChoiceFactory, $sce) {
	$scope.choice = ChoiceFactory.ReturnChoice().choice;
	$scope.upfrontCost1 = 0;
	$scope.costPerUnit1 = 0;
	$scope.upfrontCost2 = 0;
	$scope.costPerUnit2 = 0;
	$scope.qualityPath = "index.html#/quality";
	$scope.manufacturingProcesses = [{
		id: 1,
		material: 'plastic',
		description: '3D Printing',
		url: 'https://www.youtube.com/embed/Z-vkte46rLY',
		upfrontCost: 0,
		costPerUnit: 5
	},{
		id: 2,
		material: 'plastic',
		description: 'Injection Molding',
		url: 'https://www.youtube.com/embed/cpOwXZiHi0o',
		upfrontCost: 30000,
		costPerUnit: 0.15
	},{
		id: 3,
		material: 'steel',
		description: 'Sheet Metal Forming (Non-Welded)',
		url: 'https://www.youtube.com/embed/eeSl2lXzpW4',
		upfrontCost: 10000,
		costPerUnit: 1.1
	},{
		id: 4,
		material: 'steel',
		description: 'Sheet Metal Forming (Welded)',
		url: 'https://www.youtube.com/embed/c-6Niu-Jbps',
		upfrontCost: 8000,
		costPerUnit: 0.75
	}];

	$scope.video = {
		first: '',
		second: ''
	}

	function plasticVideos(){
		$scope.video.first = $sce.trustAsResourceUrl($scope.manufacturingProcesses[0].url);
		$scope.video.second = $sce.trustAsResourceUrl($scope.manufacturingProcesses[1].url);
		$scope.upfrontCost1 = $scope.manufacturingProcesses[0].upfrontCost;
		$scope.costPerUnit1 = $scope.manufacturingProcesses[0].costPerUnit;
		$scope.upfrontCost2 = $scope.manufacturingProcesses[1].upfrontCost;
		$scope.costPerUnit2 = $scope.manufacturingProcesses[1].costPerUnit;
	}
	function metalVideos(){
		$scope.video.first = $sce.trustAsResourceUrl($scope.manufacturingProcesses[2].url);
		$scope.video.second = $sce.trustAsResourceUrl($scope.manufacturingProcesses[3].url);
		$scope.upfrontCost1 = $scope.manufacturingProcesses[2].upfrontCost;
		$scope.costPerUnit1 = $scope.manufacturingProcesses[2].costPerUnit;
		$scope.upfrontCost2 = $scope.manufacturingProcesses[3].upfrontCost;
		$scope.costPerUnit2 = $scope.manufacturingProcesses[3].costPerUnit;
	}

	if($scope.choice == 'plastic'){
		plasticVideos();
	}
	if($scope.choice == 'metal'){
		metalVideos();
	}

	$scope.quantity = 0;
	$scope.manufacturingPerUnitCost = 
	$scope.updateQuantity = function(){
		$scope.quantity * $scope.manufacturingPerUnitCost;
	}
}