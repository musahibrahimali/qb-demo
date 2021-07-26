

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('registerPageCtrl',['dataServiceFactory','$state','$timeout',registerPageCtrl]);

    function registerPageCtrl(dataServiceFactory,$state,$timeout){
      
      var vm = this;



       vm.formToggle=true;

      vm.toggle = function(){

      	 vm.formToggle=!vm.formToggle;
      };
     
     vm.userData = {};
     vm.userData.email="";
     vm.userData.password="";
     vm.progress = false;
     vm.loginResponse = "";

     vm.loginUser = function() {
      vm.progress =true;
      vm.loginResponse = "";


    $timeout(function() {

     dataServiceFactory.getUser(vm.userData)
      .then(function(data) {
         vm.progress = false;
         if (data.status) {
          
          dataServiceFactory.userInfo = data;
          $state.go('userhome');
        }else{ 
       
          vm.loginResponse = "Wrong Email or Password";
        };
         


     })

    }
       , 5000);
           
       // console.log('ctrl',data);
       // $state.go('userhome')
     };

      
    }

}())