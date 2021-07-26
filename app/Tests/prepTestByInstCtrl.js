

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('prepTestByInstCtrl',['$mdSidenav','$mdDialog','$scope','dataServiceFactory','institutions','$state','baseUrl',prepTestByInstCtrl]);

    function prepTestByInstCtrl($mdSidenav,$mdDialog,$scope,dataServiceFactory,institutions,$state,baseUrl){
     
    var vm = this;
    vm.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

   dataServiceFactory.checkUser(dataServiceFactory.userInfo.firstName);
  

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

  vm.Apploader = false;

 vm.getload = function(contextMessage) {

  

     

$scope.$on('$stateChangeStart', function() {
  
     vm.Apploader = true;
     vm.contextMessage = contextMessage;

});

   
    };
    

console.log(institutions.data);

vm.userInfo = dataServiceFactory.userInfo;

vm.institutions = institutions.data;

/*vm.cleanTitle = function(subjectTitle){
 
var title = subjectTitle.replace(/\s/g, "");
var cleanedTitle = title.toLowerCase(); 
  
  return cleanedTitle;
 }*/

console.log('taken',vm.institutions);
  
vm.numofquest ="";
vm.questTime="";



  
  vm.hideDialog = $mdDialog.hide;
  vm.showDialog = showDialog;

  function showDialog(evt) {
    $scope.dialogOpen = true;
    $mdDialog.show({
      targetEvent: evt,
      locals: {parent: vm},
      clickOutsideToClose:true,
      controller: angular.noop,
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl:'app/Tests/modals/numberOfquestandTime.html'
        
    }).then(function(){ alert('hi');}, function(){ alert('no');});
  }

  
 


  




    }

}())