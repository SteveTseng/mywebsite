angular
  .module('Steve.process_developmentController', ['ngRoute'])
  .controller('process_developmentController',['$scope','ChoiceFactory', process_developmentController]);

function process_developmentController($scope, ChoiceFactory) {
	$scope.choice = ChoiceFactory.ReturnChoice();
	$scope.manufacturingProcesses = [{
		id: 1,
		material: 'plastic',
		description: '3D Printing',
		url: 'https://www.youtube.com/embed/Z-vkte46rLY'
	},{
		id: 2,
		material: 'plastic',
		description: 'Injection Molding',
		url: 'https://www.youtube.com/embed/cpOwXZiHi0o'
	},{
		id: 3,
		material: 'steel',
		description: 'Sheet Metal Forming (Non-Welded)',
		url: 'https://www.youtube.com/embed/eeSl2lXzpW4'
	},{
		id: 4,
		material: 'steel',
		description: 'Sheet Metal Forming (Welded)',
		url: 'https://www.youtube.com/embed/c-6Niu-Jbps'
	}];
}