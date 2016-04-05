angular.module('pokemon')
	.filter('titlecase', ['lodash', function(lodash){
		return function(lowerString){
			return lodash.capitalize(lowerString);
		};
	}]);