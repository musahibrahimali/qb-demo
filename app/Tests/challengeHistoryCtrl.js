


(function(){
	"use strict";

var app = angular.module('Qbox');

    app.controller('challengeHistoryCtrl',['$mdSidenav','dataServiceFactory','Upload','$timeout','$scope','$state','$anchorScroll','$location','baseUrl','challengeHistory',challengeHistoryCtrl]);

    function challengeHistoryCtrl($mdSidenav,dataServiceFactory,Upload,$timeout,$scope,$state,$anchorScroll,$location,baseUrl,challengeHistory){
     
     var vm = this;
    vm.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };


console.log(challengeHistory);

  vm.baseUrl = baseUrl;
  vm.menu1 = false;
  
  vm.showmenu1 = function() {

     vm.challengMenu = false;
   vm.menu1 = !vm.menu1; 
  
  };


  vm.challengMenu = false;
  
 vm.showchallengMenu = function() {

   // alert('hi');
 vm.menu1 = false; 
   vm.challengMenu = !vm.challengMenu;
 
  };

dataServiceFactory.checkUser(dataServiceFactory.userInfo.firstName);

vm.userInfo = dataServiceFactory.userInfo;



   
 vm.Apploader = false;

 vm.getload = function(contextMessage) {
        

$scope.$on('$stateChangeStart', function() {
  
     vm.Apploader = true;
     vm.contextMessage = contextMessage;

});


    };

   
vm.challengeRecords = challengeHistory.data || [];


  vm.cup = function  (userScore,opScore) {
    
    if( userScore? userScore.split("/")[0]:0 > opScore ? opScore.split("/")[0] : 0){

      return true;
    }else{
      return false;
    }
  }


























  




    }

}())