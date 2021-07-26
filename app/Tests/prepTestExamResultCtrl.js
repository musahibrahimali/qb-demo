

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('prepTestExamResultCtrl',['$mdSidenav','$interval',
      'questionService','dataServiceFactory','$sce','$state','$scope','baseUrl',prepTestExamResultCtrl]);

    function prepTestExamResultCtrl($mdSidenav,$interval,questionService,dataServiceFactory,$sce,$state,$scope,baseUrl){

  
    

    var vm = this;
    vm.openLeftMenu = function() {
    $mdSidenav('left').toggle();
     }; 

   //dataServiceFactory.checkUser(dataServiceFactory.userInfo.firstName);

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


 
  vm.userInfo = dataServiceFactory.userInfo;

  vm.Apploader = false;
  vm.getload = function(contextMessage) {
     


    
        

$scope.$on('$stateChangeStart', function() {
  
     vm.Apploader = true;
     vm.contextMessage = contextMessage;

});




    };

    $scope.$on('$locationChangeStart',function (event, newUrl,oldUrl) {
      
      var patt = /preptestExam/i;

        console.log(patt.test(newUrl));

       if(patt.test(newUrl)){

        console.log("wont go");

        event.preventDefault();
       }
        console.log(newUrl); // http://localhost:3000/#/articles/new
        console.log(oldUrl); // http://localhost:3000/#/articles 
        // This prevents the navigation from happening
      });



   vm.score = questionService.questionBucket.score;
   vm.total = questionService.questionBucket.markedquestion.length;


vm.result = (vm.score / vm.total)*100;

 if(vm.result < 5  && vm.result == 0){
   vm.resultCompliment = 1;
 }else if(vm.result > 5  && vm.result <= 20){
  
    vm.resultCompliment = 2;
 }
 else if(vm.result > 20 && vm.result <= 40){
vm.resultCompliment = 3;
 }
 else if(vm.result > 40 && vm.result <= 60){
vm.resultCompliment = 4;
 }
 else if(vm.result > 60 && vm.result <= 80){
vm.resultCompliment = 5;
 }
 else if(vm.result > 80 && vm.result <= 100){
vm.resultCompliment = 6;
 }
 





   

   console.log(vm.result);

   vm.questions = questionService.questionBucket.markedquestion;

     vm.sanitize = function(question) {

      var santizedQuestion = $sce.trustAsHtml(question);
      return santizedQuestion;
    };
  


  
 
 


   
    }


}())