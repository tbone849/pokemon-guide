angular.module('pokemon')
	.directive('back', ['$window', function($window){
		return {
			link: function(scope, element, attrs) {
				element.on('click', function() {
					$window.history.back();
				});
			}
		};
	}]);