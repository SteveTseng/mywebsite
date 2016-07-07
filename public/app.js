var app = angular.module("myApp", ["firebase"]);

// app.controller("SampleCtrl", function($scope, $firebaseObject) {
//   var ref = new Firebase("https://steve-tseng-portfolio.firebaseio.com/");

//   // download the data into a local object
//   var syncObject = $firebaseObject(ref);

//   // synchronize the object with a three-way data binding
//   // click on `index.html` above to see it used in the DOM!
//   syncObject.$bindTo($scope, "data");
// });

app.controller("SampleCtrl", function($scope){
	$scope.employeeName = "";
	$scope.employeeAge = 0;
	$scope.myData = new Firebase("https://steve-tseng-portfolio.firebaseio.com/");
	
	$scope.saveEmployee = function(){
		$scope.myData.push({employeeName:$scope.employeeName});
		$scope.employeeName = "";
		$scope.employeeAge = 0;
	};
});