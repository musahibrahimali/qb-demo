

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('userHomeCtrl',['$mdSidenav','dataServiceFactory','posts','topScores','$window','$state','$location','moment',userHomeCtrl]);

    function userHomeCtrl($mdSidenav,dataServiceFactory,posts,topScores,$window,$state,$location,moment){
     
     var vm = this;

    vm.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
   dataServiceFactory.checkUser(dataServiceFactory.userInfo.firstName);
  //console.log(dataServiceFactory.userInfo.status);
   
   vm.Apploader = false;
   vm.contextMessage = "";
   
   vm.userInfo = dataServiceFactory.userInfo;

console.log(topScores);

console.log(posts);

  vm.Posts = posts.data;
  vm.topSore = topScores.data;

  vm.userPost = "";


  
  vm.addPost = function() {
    if(Boolean(vm.userPost) && Boolean(vm.userInfo.firstName) && Boolean(vm.userInfo.lastName)){
  	var post ={};
  	post.firstName = vm.userInfo.firstName;
    post.lastName  = vm.userInfo.lastName;
  	post.post = vm.userPost;
    post.dates = moment(new Date).format("YYYY-MM-DD HH:mm");

    
  	vm.Posts.unshift(post);  //{{post.firstName}} {{post.lastName}}
    
    console.log('new',post);
    dataServiceFactory.sendPost(dataServiceFactory.userInfo.id,dataServiceFactory.userInfo.eduLevel,vm.userPost)
    .then(function() {}).catch(function() {});

     vm.userPost = "";
  }

  };


  
  vm.menu1 = false;
  
  vm.showmenu1 = function() {
   vm.menu1 = !vm.menu1; 
  };

 


  vm.getload = function(contextMessage) {

     vm.Apploader = true;
  vm.contextMessage = contextMessage;
   console.log('called');
    };



    }


   






/*window.onunload = function(e) {
  //  e = e || window.event;
  e.preventDefault();
    //e.cancelBubble = true;
   // e.returnValue = 'test';
  console.log('unload');
  console.log(vm);
  

};*/



}())