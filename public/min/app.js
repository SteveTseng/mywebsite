
configFunction.$inject = ['$routeProvider', '$locationProvider'];var app = angular
	.module("myApp", [
		"firebase", 
		"ngRoute", 
		"Steve.HomeController",
		"Steve.product_developmentController",
		"Steve.process_developmentController",
		"Steve.ChoiceFactory",
		"Steve.qualityController",
    "Steve.FinanceFactory",
    "Steve.marketController",
    "Steve.ScoreBoardFactory"
	]);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    }).when('/product', {
    	templateUrl: './partials/product_development.html',
      controller: 'product_developmentController'
    }).when('/process', {
    	templateUrl: './partials/process_development.html',
      controller: 'process_developmentController'
    }).when('/quality', {
    	templateUrl: './partials/quality.html',
      controller: 'qualityController'
    }).when('/market', {
      templateUrl: './partials/market.html',
      controller: 'marketController'
    }).otherwise({
    	redirectTo: "/"
    });
}

app.directive('material', function(){
	return {
		restrict: 'E',
		template: '<div class="result">{{material.name}} {{material.type}} {{material.cost | currency}} {{material.strength}}</div>'
	}
});

app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

app.controller("monitorCtrl", ['$scope', 'ChoiceFactory', '$interval', 'FinanceFactory', 'ScoreBoardFactory', '$timeout', function($scope, ChoiceFactory, $interval, FinanceFactory, ScoreBoardFactory, $timeout){
  $scope.items = [];
  $interval(function(){
    $scope.total = 0;
    $scope.items = FinanceFactory.ReturnAccountInfo().cost;
    for(var i = 0; i < $scope.items.length; i++){
      $scope.total += $scope.items[i].amount;
    }
  },1000);
}])

app.controller("scoreboardCtrl", ['$scope', '$timeout', function($scope, $timeout){
  $scope.firebase = new Firebase("https://steve-tseng-portfolio.firebaseio.com/users")
  $scope.temp = {};
  $scope.users = [];

  $scope.displaySnapshot = function(snapshot, prevChildKey) {
    $scope.temp = snapshot.val();
    $scope.users.push($scope.temp);
  }
  $scope.firebase.on("child_added", $scope.displaySnapshot)
}]);
 angular
  .module('Steve.ChoiceFactory', [])
  .factory('ChoiceFactory', () => {
  	var data = {
      diameter: 0,
      thickness: 0,
      cylinderHeight: 0,
  		choice: '',
      quantity: 0,
      soldQuantity: 100,
      qualityControlImpact: 1
  	};
  	return { 
  		MakeChoice: function(choice, diameter, thickness, cylinderHeight){
  			data.choice = choice;
        data.diameter = diameter;
        data.thickness = thickness;
        data.cylinderHeight = cylinderHeight;
  		},
      QuantityChoice: function(quantity){
        data.quantity = quantity;
      },
      QualityChoice: function(number){
        data.qualityControlImpact = number;
      },
      SellingChoice: function(units){
        data.soldQuantity = units;
      },
  		ReturnChoice: function(){
  			return data;
  		}
    }
  });
 angular
  .module('Steve.FinanceFactory', [])
  .factory('FinanceFactory', () => {
  	var account = {
      cost: [{name:'Investment',amount:50000}],
      revenue: 0,
      profit: 0
  	};
  	return { 
  		UpdateCost: function($item){
        var itemExist = false;
        for(var i = 0; i < account.cost.length; i++){
          if(account.cost[i].name == $item.name){
            account.cost[i].amount = $item.amount;
            itemExist = true;
          }
        }
        if(itemExist == false){
          account.cost.push($item);
        }
  		},
  		UpdateRevenue: function(revenue){
        account.revenue = revenue;
  		},
      ReturnAccountInfo: function(){
        return account;
      }
    }
  });
 angular
  .module('Steve.ScoreBoardFactory', [])
  .factory('ScoreBoardFactory', () => {
  	var users = [
      {name: 'Steve',score: 50000}
    ];
  	return { 
      addUser: function(userObj){
        users.push({name:userObj.name, score:userObj.score});
      },
      returnUser: function(){
        return users;
      }
    }
  });
angular
  .module('Steve.HomeController', ['ngRoute'])
  .controller('HomeController',['$scope', HomeController]);

function HomeController($scope) {
	$scope.productPath = 'index.html#/product';
}
angular
	.module('Steve.marketController', ['ngRoute'])
	.controller('marketController',['$scope', 'ChoiceFactory', 'FinanceFactory', 'ScoreBoardFactory', marketController]);

function marketController($scope, ChoiceFactory, FinanceFactory, ScoreBoardFactory) {
	$scope.setPrice = 0;
	$scope.financeData = FinanceFactory.ReturnAccountInfo();
	$scope.choiceData = ChoiceFactory.ReturnChoice();
	$scope.conversionRate = 0;
	$scope.profit = 0;

	$scope.revenueUpdate = function(){
		$scope.revenue = $scope.choiceData.soldQuantity * $scope.setPrice;
		FinanceFactory.UpdateRevenue($scope.revenue);
		$scope.priceDifference = $scope.setPrice - 15;
		if($scope.priceDifference >= 0){
			$scope.priceImpact = (1 - $scope.priceDifference * $scope.priceDifference / 15)*0.4;
			if($scope.priceImpact <= 0){
				$scope.priceImpact = 0;
			}
		} else if($scope.priceDifference < 0){
			$scope.priceImpact = (1 + $scope.priceDifference * -1 / 15)*0.4;
			if($scope.priceImpact > 1){
				$scope.priceImpact = 1;
			}
		}
		$scope.conversionRate = $scope.choiceData.qualityControlImpact * $scope.priceImpact;
		$scope.prototypeCost = 0;
		$scope.manufacturingCost = 0;

			if($scope.financeData.cost[1].name == 'prototype'){
				$scope.prototypeCost = $scope.financeData.cost[1].amount;
			}
			if($scope.financeData.cost[2].name == 'manufacturing'){
				$scope.manufacturingCost = $scope.financeData.cost[2].amount;
			}

		$scope.revenue = $scope.choiceData.soldQuantity * $scope.setPrice * $scope.conversionRate;
		$scope.profit = $scope.revenue + $scope.prototypeCost + $scope.manufacturingCost;
		FinanceFactory.UpdateCost({name:'revenue', amount:$scope.revenue});
	}

	$scope.submitScore = function(){
		$scope.firebase = new Firebase("https://steve-tseng-portfolio.firebaseio.com/");
		$userRef = $scope.firebase.child('users');
		$scope.userInfo = {name:$scope.name, email:$scope.email, profit: $scope.profit};
		$userRef.push($scope.userInfo);

		$scope.name = '';
		$scope.email = '';
	};
}
angular
  .module('Steve.process_developmentController', ['ngRoute'])
  .controller('process_developmentController',['$scope','ChoiceFactory', '$sce', 'FinanceFactory', process_developmentController]);

function process_developmentController($scope, ChoiceFactory, $sce, FinanceFactory) {
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
		costPerUnit: 0.50
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
	$scope.one = 1;
	$scope.two = 2;
	$scope.select = 0;
	$scope.selectProcess = function(option){
		if(option == 1){
			if($scope.choice == 'plastic'){
				$scope.select = $scope.manufacturingProcesses[0].costPerUnit;
				$scope.selectedUpfrontCost = $scope.manufacturingProcesses[0].upfrontCost;
			}
			if($scope.choice == 'metal'){
				$scope.select = $scope.manufacturingProcesses[2].costPerUnit;
				$scope.selectedUpfrontCost = $scope.manufacturingProcesses[2].upfrontCost;
			}
		}
		if(option == 2){
			if($scope.choice == 'plastic'){
				$scope.select = $scope.manufacturingProcesses[1].costPerUnit;
				$scope.selectedUpfrontCost = $scope.manufacturingProcesses[1].upfrontCost;
			}
			if($scope.choice == 'metal'){
				$scope.select = $scope.manufacturingProcesses[3].costPerUnit;
				$scope.selectedUpfrontCost = $scope.manufacturingProcesses[0].upfrontCost;
			}
		}
	}
	$scope.updateQuantity = function(){
		$scope.total = $scope.quantity * $scope.select + $scope.selectedUpfrontCost;
		FinanceFactory.UpdateCost({name:'manufacturing',amount:-1 * $scope.total});
		ChoiceFactory.QuantityChoice($scope.quantity);
	}
}
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
		$scope.setSpecs();
		$scope.cost();
	}

	$scope.displayMaterials = [];
	$scope.cost = function(){
		FinanceFactory.UpdateCost({name:'prototype',amount:-1 * $scope.chosenMaterial.cost});
	}

	$scope.setSpecs = function(){
		ChoiceFactory.MakeChoice($scope.chosenMaterial.type, $scope.diameter, $scope.thickness, $scope.cylinderHeight);
	}

	$scope.specsLink = function (){
		var selectingLink = function(){
			angular.forEach($scope.fireLinks, function(value,key){
				var eachObj = value;
				var tempObj = {
					diameter: $scope.diameter,
					thickness: $scope.thickness,
					cylinderHeight: $scope.cylinderHeight
				}

				if($scope.diameter && $scope.thickness && $scope.cylinderHeight){
					specsRounding(tempObj);
				}


				if(eachObj.diameter == tempObj.diameter && eachObj.thickness == tempObj.thickness && eachObj.height == tempObj.cylinderHeight){
					$scope.link = $sce.trustAsResourceUrl("https://www.3dcontentcentral.com/external-site-embed.aspx?format=3D&catalogid=171&modelid=" + eachObj.url + "&width=250&height=250&edraw=true")
				}
			}) 
		}
		specsRounding = function(tempObj){
			if($scope.diameter <= 6){
				tempObj.diameter = 6;
			} else if ($scope.diameter >= 18){
				tempObj.diameter = 18;
			} else {
				tempObj.diameter = 12;
			}

			if($scope.thickness <= 0.02){
				tempObj.thickness = 0.02;
			} else if ($scope.thickness >= 0.2){
				tempObj.thickness = 0.2;
			} else {
				tempObj.thickness = 0.0925;
			}

			if($scope.cylinderHeight <= 12){
				tempObj.cylinderHeight = 12;
			} else if ($scope.cylinderHeight >= 24){
				tempObj.cylinderHeight = 24;
			} else {
				tempObj.cylinderHeight = 18;
			}

			return tempObj;
		}
		$timeout(selectingLink, 1000);
	}

}
angular
	.module('Steve.qualityController', ['ngRoute'])
	.controller('qualityController',['$scope', 'ChoiceFactory', qualityController]);

function qualityController($scope, ChoiceFactory){
	$scope.dataObj = ChoiceFactory.ReturnChoice();
	$scope.quantity = $scope.dataObj.quantity;
	$scope.scrapRate = 0;
	$scope.marketPath = 'index.html#/market';
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

	$scope.temp = $scope.scrapRate;
	$scope.trashUnits = 0;
	$scope.acceptedUnits = 0;
	$scope.toleranceFunction = function() {
		if($scope.tolerance.level == 'strict'){
			$scope.temp = $scope.scrapRate * 1.4;
			ChoiceFactory.QualityChoice(1);
		}else if($scope.tolerance.level == 'tight'){
			$scope.temp = $scope.scrapRate * 1.15;
			ChoiceFactory.QualityChoice(0.95);
		}else if($scope.tolerance.level == 'loose'){
			$scope.temp = $scope.scrapRate * 1.05;
			ChoiceFactory.QualityChoice(0.9);
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