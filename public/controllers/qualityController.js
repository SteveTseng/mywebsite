angular
	.module('Steve.qualityController', ['ngRoute'])
	.controller('qualityController',['$scope', 'ChoiceFactory', qualityController]);

function qualityController($scope, ChoiceFactory){
	$scope.data = ChoiceFactory.ReturnChoice();
}