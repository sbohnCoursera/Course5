(function () {
"use strict";

angular.module('public')
.controller('NLInfoController', NLInfoController);

NLInfoController.$inject = ['nlInfo', 'ApiPath'];
function NLInfoController(nlInfo, ApiPath) {
  var nlinfo = this;
    
  nlinfo.nlInfo = nlInfo;
  nlinfo.basePath = ApiPath;
}
}());