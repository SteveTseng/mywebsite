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

//material directive is use on the product development html
//matierial directive and ng-repeat provides a list of materials
app.directive('material', function() {
	return {
		restrict: 'E',
		template: '<div class="result">{{material.name}} {{material.type}} {{material.cost | currency}} {{material.strength}}</div>'
	};
});

//custom percentage filter is used to display numbers in percentage
app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

//this is the controller for the costs
//it pulls information from firebase and factories to continuously update cash flow
app.controller("monitorCtrl", function($scope, ChoiceFactory, $interval, FinanceFactory, ScoreBoardFactory, $timeout){
  $scope.items = [];
  $interval(function(){
    $scope.total = 0;
    $scope.items = FinanceFactory.ReturnAccountInfo().cost;
    for(var i = 0; i < $scope.items.length; i++){
      $scope.total += $scope.items[i].amount;
    }
  },1000);
});

//this is the controller for the scores
//the controller pulls scores of users and displays it on the page
//it is automatically updated when new entries are made
app.controller("scoreboardCtrl", function($scope, $timeout) {
  $scope.firebase = firebase.database().ref('users');
  $scope.temp = {};
  $scope.users = [];
  $scope.displaySnapshot = function(snapshot, prevChildKey) {
    $scope.temp = snapshot.val();
    $scope.users.push($scope.temp);
  };
  $scope.firebase.on("child_added", $scope.displaySnapshot);
  $scope.firebase.off("child_added", $scope.displaySnapshot);
});