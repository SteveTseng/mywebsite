var app = angular
	.module("myApp", [
		"firebase", 
		"ngRoute", 
		"Steve.HomeController",
		"Steve.product_developmentController"
	]);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
    .when('/asdf', {
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    }).when('/product', {
    	templateUrl: './partials/product_development.html',
      controller: 'product_developmentController'
    }).otherwise({
    	redirectTo: "index.html"
    })
}

// app.controller('MainCtrl', function($scope,$sce) {
  
// 	$scope.index = 1;
  
//   $scope.urls = [
//     {
//     	id: 1,
//     	page:"./partials/home.html"
//     },
//     {
//     	id: 2,
//       page:"./partials/product_development.html"
//     }];
// });



// app.controller("SampleCtrl", function($scope){

// });



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