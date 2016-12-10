(function(){

    "use strict";
    
    angular.module('public')
    .controller('myInfoController',myInfoControllerFn);
    
    myInfoControllerFn.$inject=["SignupInfoStore","$filter"];
    
    function myInfoControllerFn(SignupInfoStore,$filter) {
        
        var myInfoCtrl = this;
        
        myInfoCtrl.storedInfo = SignupInfoStore.getLoggedInfo();
        
        if(Object.getOwnPropertyNames(myInfoCtrl.storedInfo).length > 0) {
            myInfoCtrl.isAlreadySignup = true;
        }
    }

})();