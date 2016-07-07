var app = angular
	.module("myApp", [
		"firebase"
	]);

app.controller("SampleCtrl", function($scope){
	$scope.materials = [{
		id:'1',
		name: 'Plastic',
		description: 'STUFF and carbon fibers'
	},
	{
		id:'2',
		name: 'Aluminum',
		description: 'STUFF and carbon fibers'
	}];
	
	$scope.index = 1;


	$scope.next = function(){
		// $(".table").css({
  //       'transform': 'translateX(-500px)',
  //       'opacity': '0',
  //       'transition': 'all cubic-bezier(0.600, -0.280, 0.735, 0.045) .5s'
  //     	})
      	$scope.index++;
	};

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