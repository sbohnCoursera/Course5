(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
	var service = this;

	//var foundItems = [];

	service.getAllCategories = function () {
		return $http({
			method: "GET",
			url: (ApiBasePath + "/categories.json")
		}).then(
			function (result) {
				//console.log(result.data);
				var categoriesList = result.data;

				return categoriesList;
			})
		.catch(
			function (errorResponse) {
				console.log(errorResponse);
		});
	};

	service.getItemsForCategory = function (categoryShortName) {
		return $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
		}).then(
			function (result) {
				console.log(result.data.menu_items);
				var itemsForCategory = result.data.menu_items;

				return itemsForCategory;
			})
		.catch(
			function (errorResponse) {
				console.log(errorResponse);
		});
	};
}

})();