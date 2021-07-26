

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('performanceCtrl',['$mdSidenav','dataServiceFactory','$state','performanceSubject','$scope','$timeout','baseUrl',performanceCtrl]);

    function performanceCtrl($mdSidenav,dataServiceFactory,$state,performanceSubject,$scope,$timeout,baseUrl){
     
     var vm = this;
    vm.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };


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

  vm.Apploader = false;

 vm.getload = function(contextMessage) {
    
    

      

$scope.$on('$stateChangeStart', function() {
  
     vm.Apploader = true;
     vm.contextMessage = contextMessage;

});

   
   
    };

vm.localLoader = function(contextMessage) {
    
    

     vm.Apploader = true;
     vm.contextMessage = contextMessage;
   
   
    };
  


vm.userInfo = dataServiceFactory.userInfo;

 vm.selected = [];
  vm.recordOrder = "testName";
  vm.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  //console.log(performanceSubject.data);
 if (performanceSubject.data != null) {
   vm.performance = performanceSubject.data;

  var performanceLabel = [];
  var performanceSeries = [];
  var performanceData   = [];
  var performsDataLength = vm.performance.length;



 for (var i = 0; i < performsDataLength; i++) {
      
     performanceLabel.push(vm.performance[i].subject);
     performanceData.push([vm.performance[i].score]);

 }

  console.log(performanceLabel);
  console.log(performanceData);

 $scope.OverAllLabels = performanceLabel;

  $scope.OverAllseries = ['Over All Performance'];
//[65,56,77,81,36,456]
 $scope.OverAlldata = [performanceData];

 }

window.dispatchEvent(new Event('resize'));






vm.detailView = false;
vm.subjectsTakenView = true;

vm.subjectsTaken = function() { 


vm.detailView = false;
vm.subjectsTakenView = true;


                
            


}

vm.getdetail = function(subject) {

 
vm.localLoader("Checking how good you are in "+subject);


 $state.go('performanceDetail',{"subject":subject});

                   

}



    }

}())