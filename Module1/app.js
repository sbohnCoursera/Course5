(function () {
	'use strict';

	angular.module('LunchCheck', [])

	.controller('LunchCheckController', function($scope) {
		$scope.lList = '';
		$scope.lMessage = '';

		$scope.lButton = function () {
			var numItems = calcNumItems($scope.lList);
			if (numItems > 3) {
				$scope.lMessage = 'Too much!';
			} else if (numItems > 0) {
				$scope.lMessage = 'Enjoy!';
			} else {
				$scope.lMessage = 'Please enter data first';
			}
		};

		function calcNumItems(string) {
			var listItemsArray = string.split(",");
			var numItemsInList = 0;
			for (var i = 0; i < listItemsArray.length; i++) {
				if (listItemsArray[i].trim()) {
					numItemsInList++;
				}
			}
			return numItemsInList;
		}

	});

})();