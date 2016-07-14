angular
  .module('Steve.product_developmentController', ['ngRoute'])
  .controller('product_developmentController',['$scope','ChoiceFactory', product_developmentController]);

function product_developmentController($scope, ChoiceFactory) {
	$scope.diameter = 0;
	$scope.thickness = 0;
	$scope.cylinderHeight = 0;
	$scope.materialVolume = 0.7854 * $scope.cylinderHeight * ($scope.diameter * $scope.diameter - $scope.thickness * $scope.thickness) * 0.5;
	$scope.myData = new Firebase("https://steve-tseng-portfolio.firebaseio.com/");
	$scope.myData.on('value', function(snapshot){
		$scope.materials = snapshot.val().material;
	});
	$scope.dimensions = function(){
		if($scope.diameter == 1){
			$('.diameter').append('<img src="http://www.sycode.com/products/3ds_import_sw/images/3ds_import_sw.gif" height="100" width="200">');
		}
		if($scope.thickness == 1){
			$('#thickness').append('<img src="http://www.solidsmack.com/wp-content/uploads/2011/10/F-16-solidworks-00.jpg" height="100" width="200">');
		}
		if($scope.cylinderHeight == 1){
			$('.cylinderHeight').append('<img src="https://advancedcommonsense.files.wordpress.com/2013/02/solidworks-01.jpg" height="100" width="200">');
		}
	}

	$scope.manufacturingPath = 'index.html#/process';
	$scope.resultsActivate = function(){
		$scope.displayMaterials = $scope.materials;
	}

	$scope.search = function(){
		ChoiceFactory.MakeChoice($scope.chosenMaterial.type, $scope.diameter, $scope.thickness, $scope.cylinderHeight);
	}
	//$scope.$watch($scope.search);

	$scope.chosenMaterial = null;
	$scope.select = function(materialObject){
		$scope.chosenMaterial = materialObject;
		$scope.choice = $scope.chosenMaterial.name + ' ' + $scope.chosenMaterial.type
		+ ' $' + $scope.chosenMaterial.cost + ' ' + $scope.chosenMaterial.strength;
		$scope.displayMaterials = [];
		$scope.search();
	}

	$scope.displayMaterials = [];
	// $scope.materials = [{
	// 	id: 1,
	// 	material: 'Plastic',
	// 	cost: '$0.50 per lb',
	// 	strength: 'soft'
	// },
	// {
	// 	id: 2,
	// 	material: 'Aluminum',
	// 	cost: '$1.00 per lb',
	// 	strength: 'medium'
	// },
	// {
	// 	id: 3,
	// 	material: 'Tin',
	// 	cost: '$1.00 per lb',
	// 	strength: 'medium'
	// },
	// {
	// 	id: 4,
	// 	material: 'Steel',
	// 	cost: '$1.50 per lb',
	// 	strength: 'hard'
	// }]
}