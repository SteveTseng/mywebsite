var app = angular
	.module("myApp", [
		"firebase", 
		"ngRoute", 
		"Steve.HomeController",
		"Steve.product_developmentController",
		"Steve.process_developmentController",
		"Steve.ChoiceFactory",
		"Steve.qualityController"
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