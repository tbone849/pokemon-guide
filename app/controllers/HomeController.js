angular.module('pokemon')
	.controller('HomeController', ['$location', '$route', '$scope', function($location, $route, $scope){
	
		$scope.$watch(function(){
			return $location.path();
		}, function(value){
			if(value === '/'){
				$scope.home = true;
			} else {
				$scope.home = false;
			}
		});
	}]);