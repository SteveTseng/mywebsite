angular
  .module('Steve.product_developmentController', ['ngRoute'])
  .controller('product_developmentController',['$scope','ChoiceFactory', product_developmentController]);

function product_developmentController($scope, ChoiceFactory) {
	$scope.diameter = 0;
	$scope.thickness = 0;
	$scope.cylinderHeight = 0;
	//$scope.materialVolume = 0.7854 * $scope.cylinderHeight*(Math.pow($scope.diameter, 2) - Math.pow($scope.thickness, 2));
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

	$scope.search = function(){
		// $angular.element(document).find('.ng-scope').on( "mouseover", function() {
		//   $( this ).css( "background-color", "blue" ).css("width", "300px");
		// }).on("mouseleave", function(){
		//   $( this ).css( "background-color", "white").css("width", "300px");
		// })
		ChoiceFactory.MakeChoice($scope.choice, $scope.diameter, $scope.thickness, $scope.cylinderHeight);
		console.log(ChoiceFactory.ReturnChoice())
	}

	$scope.materials = [{
		id: 1,
		material: 'Plastic',
		cost: '$0.50 per lb',
		strength: 'soft'
	},
	{
		id: 2,
		material: 'Aluminum',
		cost: '$1.00 per lb',
		strength: 'medium'
	},
	{
		id: 3,
		material: 'Tin',
		cost: '$1.00 per lb',
		strength: 'medium'
	},
	{
		id: 4,
		material: 'Steel',
		cost: '$1.50 per lb',
		strength: 'hard'
	}]
}