angular.module('pokemon', ['ngAnimate', 'angular-velocity']);

angular.module('pokemon')
	.controller('test', ['$scope', function($scope){
		$scope.name = 'Tim is the coolest guy ever!';
		$scope.animate = true;
		$scope.toggle = function(){
			$scope.animate = !$scope.animate;
		};
	}]);