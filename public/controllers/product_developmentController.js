angular
  .module('Steve.product_developmentController', ['ngRoute'])
  .controller('product_developmentController',['$scope','ChoiceFactory', 'FinanceFactory','$sce', '$timeout', product_developmentController]);

function product_developmentController($scope, ChoiceFactory, FinanceFactory, $sce, $timeout) {
	$scope.placeHolder = 0;
	$scope.fireData = [];
	//$scope.materialVolume = 0.7854 * $scope.cylinderHeight * ($scope.diameter * $scope.diameter - $scope.thickness * $scope.thickness) * 0.5;
	$scope.myData = new Firebase("https://steve-tseng-portfolio.firebaseio.com/");
	$scope.myData.once('value', function(snapshot){
		$scope.materials = snapshot.val().material;
		$scope.fireLinks = snapshot.val().links;
	});

	$scope.manufacturingPath = 'index.html#/process';
	$scope.resultsActivate = function(){
		$scope.displayMaterials = $scope.materials;
	}

	$scope.chosenMaterial = null;
	$scope.select = function(materialObject) {
		$scope.chosenMaterial = materialObject;
		$scope.choice = $scope.chosenMaterial.name + ' ' + $scope.chosenMaterial.type
		+ ' $' + $scope.chosenMaterial.cost + ' ' + $scope.chosenMaterial.strength;
		$scope.displayMaterials = [];
		$scope.search();
		$scope.cost();
	}

	$scope.displayMaterials = [];
	$scope.cost = function(){
		FinanceFactory.UpdateCost({name:'prototype',amount:-1 * $scope.chosenMaterial.cost})
	}

	$scope.specsLink = function (){
		var selectingLink = function(){
			angular.forEach($scope.fireLinks, function(value,key){
				var eachObj = value;
				specsRounding();
				if(eachObj.diameter == $scope.diameter && eachObj.thickness == $scope.thickness && eachObj.height == $scope.cylinderHeight){
					$scope.link = $sce.trustAsResourceUrl("http://www.3dcontentcentral.com/external-site-embed.aspx?format=3D&catalogid=171&modelid=" + eachObj.url + "&width=250&height=250&edraw=true")
				}
			}) 
		}
		specsRounding = function(){
			if($scope.diameter <= 6){
				$scope.diameter = 6;
			} else if ($scope.diameter >= 18){
				$scope.diameter = 18;
			} else {
				$scope.diameter = 12;
			}
			if($scope.thickness <= 0.02){
				$scope.thickness = 0.02;
			} else if ($scope.thickness >= 0.2){
				$scope.thickness = 0.2;
			} else {
				$scope.thickness = 0.0925;
			}

		}
		$timeout(selectingLink, 1000);
	}

}