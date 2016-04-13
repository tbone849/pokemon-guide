angular.module('pokemon')
	.filter('titlecase', ['lodash', function(lodash){
		return function(lowerString){
			var splitString = lowerString.split('-');
			var capSubstrings = splitString.map(function(substring){
				return lodash.capitalize(substring);
			});
			var titleCasedString = capSubstrings.join(' ');
			return titleCasedString;
		};
	}]);