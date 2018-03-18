(function () {


angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
	var ddo = {
		restrict: 'E',
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
	//alert("here: ");

  // list.found = MenuSearchService.getItems();
  // console.log("list.found: " + list.found);
  // console.log(list.searchTerm);
  list.narrowd = function () {
	  if (list.searchTerm) { // && list.searchTerm != undefined) {
		  var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

		  promise.then(function (response) {
		  	list.found = response;
		  	console.log(list.found);
		  })
		  .catch(function (error) {
		  	console.log("Something went wrong.");
		  });
		}
		else {
			alert("Nothing search term entered");
		}
	};
	
	// list.narrowd = function () {
	// 	//searchTerm = list.searchTerm || '';
	// 	list.found = MenuSearchService.getMatchedMenuItems(list.searchTerm);
	// 	console.log(list.found);
	// }

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


