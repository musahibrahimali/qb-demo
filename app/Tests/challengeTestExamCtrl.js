
(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('challengeTestExamCtrl',['$mdSidenav','$interval',
      'examsTimeFactory','questionService','dataServiceFactory','$state','$mdToast','$sce','$scope','$location','$anchorScroll','baseUrl',challengeTestExamCtrl]);

    function challengeTestExamCtrl($mdSidenav,$interval,examsTimeFactory,questionService,dataServiceFactory,$state,$mdToast,$sce,$scope,$location,$anchorScroll,baseUrl){


   
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

     console.log(dataServiceFactory.challengeInfo);
    //vm.questionName = dataServiceFactory.SubjectChoosen;
    vm.challengId = dataServiceFactory.challengeInfo.id;
    vm.challengequestions= dataServiceFactory.challengeInfo.questions;
    vm.questionName = dataServiceFactory.challengeInfo.subject;
    vm.challengetime = dataServiceFactory.challengeInfo.time;
    vm.challengenumofquestion = dataServiceFactory.challengeInfo.numOfquestion;

 calibrateQuestions(vm.challengequestions);
// console.log(quest);
   //  console.log(dataServiceFactory.questions);



  vm.questions = dataServiceFactory.challengeInfo.questions;
  vm.marking = false;
  //console.log(quest.length);
  //var unAnswered = angular.copy(quest);
 //console.log('exems',vm.questions);
  
      vm.topDirections = ['left', 'up'];
      vm.bottomDirections = ['down', 'right'];
      vm.isOpen = false;
      vm.availableModes = ['md-fling', 'md-scale'];
      vm.selectedMode = 'md-fling';
      vm.availableDirections = ['up', 'down', 'left', 'right'];
      vm.selectedDirection = 'up';

  vm.filterkey = false;

  vm.filterFun = function(question) {
  
   if(vm.filterkey == false){
    return false;

   }else if(vm.filterkey == true) {

     return question.attempted;

   }

   };
  
  vm.answered = function(item) { //unAnswered.splice(index, 1);
 
 item.attempted = true;
 console.log(vm.questions);
  };

  vm.viewAll = function() {
     vm.filterkey =false;
  };

  vm.viewUnAnswered = function() {

    vm.filterkey = true;
  };
 
 

  if (true) {

 
    $mdToast.show(
      $mdToast.simple()
        .textContent('Good Luck!')
        .position('top right')
        .hideDelay(3000)
    );

  }
  
  vm.hour = 0;//examsTimeFactory.hour;
  vm.min = vm.challengetime;//examsTimeFactory.min;
  vm.sec = 0;//examsTimeFactory.sec;

 var examTime =  $interval(examTimer, 1000,false);



   function examTimer() {

    if(vm.sec == 0)
      {  
       if(vm.hour == 0 && vm.min == 0 && vm.sec == 0){
          $interval.cancel(examTime);

          questionService.questionBucket = marker(vm.questions);
          
        // console.log('answered',questionService.questionBucket);
         var userID  = dataServiceFactory.userInfo.id;
         var userEduLevel = dataServiceFactory.userInfo.eduLevel;
         var testScore = questionService.questionBucket.score;

postResult(vm.challengId,userID,testScore + "/"+vm.challengenumofquestion);
        // $state.go('examsResult');

          return;
        }
      vm.sec = 60;
        if(vm.min == 0){
           vm.min = 60;
          vm.hour--;
        }else{
          vm.min--;
        }      
         }
      else{ vm.sec--;}
     
    }


  vm.done = function() {

     
     questionService.questionBucket = marker(vm.questions);
          
         //console.log(questionService.questionBucket);

        var userID  = dataServiceFactory.userInfo.id;
         var userEduLevel = dataServiceFactory.userInfo.eduLevel;
         var testScore = questionService.questionBucket.score;

         postResult(vm.challengId,userID,testScore + "/"+vm.challengenumofquestion);
  };

    function marker(questions){

        vm.marking = true;
     

    
  $location.hash('marker');

      // call $anchorScroll()
      $anchorScroll();
      var questionToMark = questions;
      var result = {};
      var correctAnswers=0;

      for (var i = 0; i < questionToMark.length; i++) {
        if(questionToMark[i].answer == questionToMark[i].choice)
        {
          questionToMark[i].status = true;
          correctAnswers++;

        }else{
          questionToMark[i].status = false;

        }
      }
      
      result.markedquestion = questionToMark;
      result.score          = correctAnswers;

     
      return result;

    }
  
    vm.sanitize = function(question) {

      var santizedQuestion = $sce.trustAsHtml(question);
      return santizedQuestion;
    };

    function calibrateQuestions(questions){
      

   var labelArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M'];  
   

     for (var i = 0; i < questions.length; i++) {
    
      var answers = questions[i].possible_answer.split('..');

      for (var a = 0; a < answers.length; a++) {
        answers[a] = answers[a].trim().replace(/\b[-.,()&$#!\[\]{}"']+\B|\B[-.,()&$#!\[\]{}"']+\b/g, "");
       // answers[a]  = answers[a].replace(/\b[-.,()&$#!\[\]{}"']+\B|\B[-.,()&$#!\[\]{}"']+\b/g, "");
      }


       questions[i].number = i+1;
       questions[i].attempted =false;
       questions[i].answer = labelArray[answers.indexOf(questions[i].ans.trim())];
       questions[i].options = generatePossible(answers);
       questions[i].choice ="";
       questions[i].status ="";


       
     }


     function generatePossible(answers){
      
      
        var pAns = [];

        for (var i = 0; i < answers.length; i++) {
          var questionObj ={};
              questionObj.label = labelArray[answers.indexOf(answers[i])];
              questionObj.posAnswer = answers[i];
              pAns.push(questionObj);
        }

        return pAns;

    }
      
    }


    function postResult(challengeId,userId,userScore) {
       
       //console.log(challengeId,userId,userScore);
      dataServiceFactory.sendChallengeResult(challengeId,userId,userScore)
      .then(function(response) {
        
        console.log(response);
           $state.go('examsResult');

      })
      .catch();
    }

  


  
 
 




   
    } /*end fo Ctrl function*/


}());