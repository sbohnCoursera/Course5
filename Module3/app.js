(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
;

function FoundItemsDirective() {
	var ddo = {
		templateUrl: 'foundItems.html',
		scope: {
			found: '<',
			onRemove: '&'
		}
	};
	return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var list = this;
  list.narrowd = function () {
	  if (list.searchTerm) {
		  var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

		  promise.then(function (response) {
		  	list.found = response;
		  })
		  .catch(function (error) {
		  	console.log("Something went wrong.");
		  });
		}
		else {
			alert("No search term entered");
		};
	};
	
	list.remove = function (index) {
		return MenuSearchService.removeItem(index);
	}

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var service = this;

	var foundItems = [];

	service.getMatchedMenuItems = function (searchTerm) {
		return $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
		}).then(
			function (result) {
				var menuItems = result.data.menu_items;
				foundItems = [];

				for (var i=0; i < menuItems.length; i++) {
					if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
						foundItems.push(menuItems[i]);
					}
				}

				return foundItems;
			})
		.catch(
			function (errorResponse) {
				console.log('(' + errorResponse.status + ') ' + errorResponse.statusText);
		});
	};

	service.removeItem = function (itemIndex) {
		foundItems.splice(itemIndex, 1);
		return foundItems;
	};
}

})();


