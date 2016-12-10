(function () {
  "use strict";

  angular.module('public')
  .service("SignupInfoStore",SignupInfoStore);

  SignupInfoStore.$inject = ["$http", "ApiPath"];

  function SignupInfoStore($http,ApiPath) {

    var infoService = this;

    var infoServiceDetail = {};
    var menuShortInfo = [];

    infoService.submitInfo = function(infoDetail) {
        //https://csoares1-course5.herokuapp.com/menu_items/L1.json
        if(infoDetail.menuShort !== undefined && infoDetail.menuShort !== "") {
          var config = infoDetail.menuShort.toUpperCase();
          return $http.get(ApiPath + '/menu_items/'+config+'.json').then(function success(response) {
              var responseInfo = {};
                  responseInfo.status = "success";
                  responseInfo.message = "Your information has been saved.";
                  infoServiceDetail = infoDetail;
                  infoServiceDetail.fullDishName = response.data.name;
                  infoServiceDetail.fullDishDescription = response.data.description;
            return responseInfo;
          },function failure(response) {
            var responseInfo = {};
            responseInfo.status = "error";
            responseInfo.message = "No such menu number exists.";
              return responseInfo;
          });
        } 
        else {
          var responseInfo = {};
          responseInfo.status = "error";
          responseInfo.message = "No such menu number exists.";
          return responseInfo;
        }

    };

    infoService.getLoggedInfo = function() {
      return infoServiceDetail;
    };
  }

})();
