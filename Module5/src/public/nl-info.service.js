(function () {
"use strict";

angular.module('public')
.service('NLInfoService', NLInfoService);

NLInfoService.$inject = ['$http', 'ApiPath'];
function NLInfoService($http, ApiPath) {
  var service = this;

  service.getMenuItem = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiPath + "/menu_items/" + shortName + ".json")
    });

    return response;
  };

  service.saveNLInfo = function (nlInfo) {
    service.nlInfo = nlInfo;
  };

  service.getNLInfo = function () {
    return service.nlInfo;
  };

}
    
}());