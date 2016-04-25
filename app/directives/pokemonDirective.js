angular.module('pokemon')
	.directive('pokemon', ['$location', function($location){
		return {
			restrict: 'E',
			scope: {
				name: '=',
				spriteUrl: '='
			},
			transclude: true, 
			templateUrl: 'views/pokemon.html',
			link: function(scope, elem, attr){
				elem.bind('click', function(){
					var url ='/pokemon/' + scope.name;
					scope.$apply(function(){
						$location.url(url);
					});
				});
			}
		};
	}]);