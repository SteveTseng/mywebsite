var app = angular
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

app.controller("monitorCtrl", function($scope, ChoiceFactory, $interval, FinanceFactory, ScoreBoardFactory, $timeout){
  $scope.items = [];
  $interval(function(){
    $scope.total = 0;
    $scope.items = FinanceFactory.ReturnAccountInfo().cost;
    for(var i = 0; i < $scope.items.length; i++){
      $scope.total += $scope.items[i].amount;
    }
  },1000);
})

app.controller("scoreboardCtrl", function($scope, $timeout){
  $scope.firebase = new Firebase("https://steve-tseng-portfolio.firebaseio.com/users")
  $scope.temp = {};
  $scope.users = [];

  $scope.displaySnapshot = function(snapshot, prevChildKey) {
    $scope.temp = snapshot.val();
    $scope.users.push($scope.temp);
  }
  
  $scope.firebase.on("child_added", $scope.displaySnapshot)
});


// app.controller("SampleCtrl", function($scope, $firebaseObject) {
//   var ref = new Firebase("https://steve-tseng-portfolio.firebaseio.com/");

//   // download the data into a local object
//   var syncObject = $firebaseObject(ref);

//   // synchronize the object with a three-way data binding
//   // click on `index.html` above to see it used in the DOM!
//   syncObject.$bindTo($scope, "data");
// });

// app.controller("SampleCtrl", function($scope){
// 	$scope.employeeName = "";
// 	$scope.employeeAge = 0;
// 	$scope.employees = {};
// 	$scope.myData = new Firebase("https://steve-tseng-portfolio.firebaseio.com/");
	
// 	$scope.saveEmployee = function(){
// 		$scope.myData.push({
// 			employeeName:$scope.employeeName, 
// 			employeeAge:$scope.employeeAge
// 		});
// 		$scope.employeeName = "";
// 		$scope.employeeAge = 0;
// 	};

// 	$scope.myData.on('value', function(snapshot){
// 		$scope.employees = snapshot.val();
// 	});
// });