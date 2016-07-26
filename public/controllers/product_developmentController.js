angular
  .module('Steve.product_developmentController', ['ngRoute'])
  .controller('product_developmentController',['$scope','ChoiceFactory', 'FinanceFactory','$sce', '$timeout', product_developmentController]);

function product_developmentController($scope, ChoiceFactory, FinanceFactory, $sce, $timeout) {
	$scope.placeHolder = 0; //for initial input
	//firebase data is saved in the myData variable
	$scope.fireData = [];
	$scope.myData = firebase.database().ref();
	$scope.myData.once('value', function(snapshot) {
		//there is a list of material that is saved in firebase, it is retrieved from here
		$scope.materials = snapshot.val().material;
		$scope.fireLinks = snapshot.val().links;
	});
	//path to the manufacturing page
	$scope.manufacturingPath = 'index.html#/process';
	$scope.chosenMaterial = null;

	$scope.resultsActivate = function() {
		$scope.displayMaterials = $scope.materials;
	};

	$scope.select = function(materialObject) {
		$scope.chosenMaterial = materialObject;
		$scope.choice = $scope.chosenMaterial.name + ' ' + $scope.chosenMaterial.type +
		' $'+ $scope.chosenMaterial.cost + ' ' + $scope.chosenMaterial.strength;
		$scope.displayMaterials = [];
		$scope.setSpecs();
		$scope.cost();
	};

	$scope.displayMaterials = [];
	$scope.cost = function() {
		FinanceFactory.UpdateCost({name:'prototype',amount: -1 * $scope.chosenMaterial.cost});
	};

	$scope.setSpecs = function() {
		ChoiceFactory.MakeChoice($scope.chosenMaterial.type, $scope.diameter, $scope.thickness, $scope.cylinderHeight);
	};

	$scope.specsLink = function () {

		var selectingLink = function() {
			//firelinks is a json object that is stored in firebase
			//the saved urls is used to retrieve pre-stored 3D Models from eDrawing
			//iframe will display the approximate model of the entered specs
			angular.forEach($scope.fireLinks, function(value, key) {
				//this forEach loop will search through the firelinks to find a model to specs match
				var eachObj = value; //the value is an object of the specs of the model
				//temp obj stores the specs entered by the user
				var tempObj = {
					diameter: $scope.diameter,
					thickness: $scope.thickness,
					cylinderHeight: $scope.cylinderHeight
				};

				//if user entered specs, this will activate
				if($scope.diameter && $scope.thickness && $scope.cylinderHeight){
				//there are total of 27 models available.
				//Users may enter specs that are in between the specs of two consecutive models,
				//rounding up or down to the nearest model specs will enable a possible match.
					specsRounding(tempObj);
				}
				//the user input and pre-saved models specs are matched here
				if(eachObj.diameter == tempObj.diameter && eachObj.thickness == tempObj.thickness && eachObj.height == tempObj.cylinderHeight){
					//when there is a match, the stored url will be entered into provided plugin by 3D Content Central.
					//the iframe will display the 3D model of the user input
					$scope.link = $sce.trustAsResourceUrl("https://www.3dcontentcentral.com/external-site-embed.aspx?format=3D&catalogid=171&modelid=" + eachObj.url + "&width=250&height=250&edraw=true");
				}
			});
		};

		//this is the rounding function that takes user input and round up or down to the nearest model size
		specsRounding = function(tempObj) {
			if($scope.diameter <= 6) {
				tempObj.diameter = 6;
			} else if ($scope.diameter >= 18) {
				tempObj.diameter = 18;
			} else {
				tempObj.diameter = 12;
			}

			if($scope.thickness <= 0.02) {
				tempObj.thickness = 0.02;
			} else if ($scope.thickness >= 0.2) {
				tempObj.thickness = 0.2;
			} else {
				tempObj.thickness = 0.0925;
			}

			if($scope.cylinderHeight <= 12) {
				tempObj.cylinderHeight = 12;
			} else if ($scope.cylinderHeight >= 24) {
				tempObj.cylinderHeight = 24;
			} else {
				tempObj.cylinderHeight = 18;
			}

			return tempObj;
		};
		$timeout(selectingLink, 1000);
	};
}