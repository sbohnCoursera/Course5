(function () {
"use strict";

angular.module('public')
.controller('NLSignUpController', NLSignUpController);

NLSignUpController.$inject = ['NLInfoService'];
function NLSignUpController(NLInfoService) {
  var nlsignup = this;
  nlsignup.submit = function () {
    var number = nlsignup.user.menuitem.toUpperCase();

    var promise = NLInfoService.getMenuItem(number);
    promise.then(function (response) {
        nlsignup.status = response.status;

        var nlInfo = {};
        nlInfo.data = response.data;
        nlInfo.user = nlsignup.user;

        NLInfoService.saveNLInfo(nlInfo);
    })
    .catch(function (errorResponse) {
        nlsignup.status = errorResponse.status;
    });
  };
}
}());