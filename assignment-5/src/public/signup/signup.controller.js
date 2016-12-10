(function () {
  "use strict";

  angular.module('public')
  .controller("signupController",signupControllerFn)
  signupControllerFn.$inject = ["SignupInfoStore","$q","$timeout","$filter"];

  function signupControllerFn(SignupInfoStore,$q,$timeout,$filter) {
    // console.log("SigninUpInfo Store", SignupInfoStore.getLoggedInfo());
    var signupCtrl = this;
    signupCtrl.error = false;
    signupCtrl.formInfo = {};
    signupCtrl.isAlreadySignup = false;
    signupCtrl.show = true;
    signupCtrl.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    signupCtrl.mobilePattern = /^[0-9]*$/;
    signupCtrl.alphabetPattern = /^[a-zA-Z ]*$/;
    if(Object.getOwnPropertyNames(SignupInfoStore.getLoggedInfo()).length > 0) {
        signupCtrl.isAlreadySignup = true;
    }
    signupCtrl.formSubmit = function (signupform) {
       
       var submitResponse = SignupInfoStore.submitInfo(signupCtrl.formInfo);
        
        $q.all([submitResponse]).then(function(response){
            //console.log(response[0]);
            var responseVal = response[0];
            if(responseVal.status == "success") {
                signupCtrl.successBoolean = true;
                signupCtrl.errorBoolean = false;
                signupCtrl.successMessage = responseVal.message;
                signupCtrl.formInfo = {};
                signupform.$setPristine();
                $timeout(function () {
                      signupCtrl.show = false;
                }, 1000);

            } else {
                signupCtrl.successBoolean = false;
                signupCtrl.errorBoolean = true;
                signupCtrl.errorMessage = responseVal.message;
            }
        
        });
        
    };
     
  }

})();
