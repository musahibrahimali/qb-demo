

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('prepTestByInstSubjectCtrl',['$mdSidenav','$mdDialog','$scope','$state','examsTimeFactory','dataServiceFactory','institutionSubject','$mdToast','$timeout','baseUrl',prepTestByInstSubjectCtrl]);

    function prepTestByInstSubjectCtrl($mdSidenav,$mdDialog,$scope,$state,examsTimeFactory,dataServiceFactory,institutionSubject,$mdToast,$timeout,baseUrl){
     
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
    
 

vm.userInfo = dataServiceFactory.userInfo;

vm.subjects = institutionSubject.data;

console.log('instSubj',vm.subjects);


  vm.numOfquestion="";
  vm.hour ="";
  vm.min = "";
  vm.sec = "";
   

  vm.hideDialog = $mdDialog.hide;
  vm.showDialog = showDialog;


 function showDialog(evt,subject,institutionId) {

    vm.dialogOpen = true;
    $mdDialog.show({
      targetEvent: evt,
      locals: {parent: vm},
      clickOutsideToClose:true,
      controller: angular.noop,
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl:'app/Tests/modals/numberOfquestandTime.html'
        
    }).then(function(){  

     vm.getload('...Loading questions...');

       examsTimeFactory.hour =  (Boolean(vm.hour))? vm.hour :0;
       examsTimeFactory.min  =  (Boolean(vm.min))? vm.min : 0;
       examsTimeFactory.sec  =  (Boolean(vm.sec))? vm.sec : 0;
       
      //console.log(examsTimeFactory);
       var msgdelay = 1;
       if((examsTimeFactory.hour == 0 && examsTimeFactory.min == 0 && examsTimeFactory.sec == 0))
         {
           
          $mdToast.show(
          $mdToast.simple()
        .textContent('No Time Entered. You will have a default time of 30min')
        .position('top right')
        .hideDelay(3000)
          ); 
           examsTimeFactory.min = 30;
           msgdelay = 5000;

           
         }
     console.log(subject,institutionId);

      var questionCriteria = {};

       questionCriteria.subject = subject;
       questionCriteria.numOfquetion = (Boolean(vm.numOfquestion))? vm.numOfquestion:30;

       console.log(questionCriteria);
       
      
      dataServiceFactory.getPrepTestByInstQuestions(questionCriteria,institutionId)
       .then(function(response) { 


   if (response.data === null) {

          vm.Apploader = false;
          console.log('no data');
          $mdToast.show(
          $mdToast.simple()
        .textContent('There are no questions for this subject. pleas choose another subject')
        .position('top right')
        .hideDelay(5000)
          ); 


        }else if(response.data !== null){

          dataServiceFactory.questions  = response.data;
       
       console.log('taken', dataServiceFactory.questions);


     setTimeout(function() {$state.go('preptestExam')}, msgdelay);
        }
        



       

       })
       .catch(function() { console.log('fail')});

         }, function(){ /*alert('no');*/});
  }


function cleanTitle(subjectTitle){
 
var title = subjectTitle.replace(/\s/g, "");
var cleanedTitle = title.toLowerCase(); 
  
  return cleanedTitle;
 }

  




    }

}())