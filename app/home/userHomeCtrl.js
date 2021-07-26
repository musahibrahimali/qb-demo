(function() {
  "use strict";
  var app = angular.module('Qbox');

  app.controller('userHomeCtrl', ['$mdSidenav', 'dataServiceFactory', 'posts', 'topScores', '$window', '$state', '$location', 'moment', 'baseUrl', 'ezfb', '$mdDialog', userHomeCtrl]);

  function userHomeCtrl($mdSidenav, dataServiceFactory, posts, topScores, $window, $state, $location, moment, baseUrl, ezfb, $mdDialog) {
    var vm = this;

    vm.baseUrl = baseUrl;
    vm.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    dataServiceFactory.checkUser(dataServiceFactory.userInfo.firstName);
    //console.log(dataServiceFactory.userInfo.status);

    vm.Apploader = false;
    vm.contextMessage = "";

    vm.userInfo = dataServiceFactory.userInfo;


    //vm.Posts = posts.data;


    //console.log(posts.data[5]);
    //console.log(posts.data);

    vm.topSore = topScores.data;
    //console.log(topScores);
    vm.Posts = posts.data;



    vm.userPost = "";


    vm.fupper = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    vm.sharePost = function(post, fname, lname) {
      ezfb.ui({
          method: 'feed',
          name: vm.fupper(dataServiceFactory.userInfo.firstName) + ' ' + vm.fupper(dataServiceFactory.userInfo.lastName) +
            '  shared a post from Quiz Box',
          picture: 'https://en.gravatar.com/userimage/112019157/41e9ef8a08644aa4906b959467e59d4c.jpg',
          link: 'http://quizbox.online',
          description: post + '   by ' + vm.fupper(fname) + ' ' + vm.fupper(lname)
        },
        function(res) {
          //console.log(res);
        }
      );
    };
    vm.replies = [];
    vm.commentPost = function(evt, post) {
      vm.Apploader = true;
      vm.contextMessage = 'Loading Post Rely';
      vm.choosenPost = post;
      //  console.log(vm.choosenPost);
      dataServiceFactory.getPostReply(vm.choosenPost.postId).then(function(response) {
        // console.log('done');
        //console.log(response);
        vm.Apploader = false;
        if (response.status == 200 || response.status == 201) {
          vm.replies = response.data;
          //console.log(vm.replies);
          vm.dialogOpen = true;
          $mdDialog.show({
            targetEvent: evt,
            locals: {
              parent: vm
            },
            clickOutsideToClose: true,
            controller: angular.noop,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: 'app/Tests/modals/postcomment.html'
          }).then(function() {});
        } else {

        }


      }).catch(function() {});



    }; //endofcommet post


    vm.replyPostText = "";

    vm.sendReply = function(post) {
      vm.Apploader = true;
      vm.contextMessage = 'Sending Comment';
      dataServiceFactory.sendPostReply(dataServiceFactory.userInfo.id, post.postId, vm.replyPostText)
        .then(function() {
         
          var reply = {
            'profilePic': dataServiceFactory.userInfo.profilePic,
            'fullname': dataServiceFactory.userInfo.firstName + dataServiceFactory.userInfo.lastName,
            'comment': vm.replyPostText
          };
          vm.Apploader = false;
          vm.replies.unshift(reply);
           vm.replyPostText = "";
        }).catch(function() {});


    }

    vm.addPost = function() {
      if (Boolean(vm.userPost) && Boolean(vm.userInfo.firstName) && Boolean(vm.userInfo.lastName)) {
        var post = {};
        post.firstName = vm.userInfo.firstName;
        post.lastName = vm.userInfo.lastName;
        post.post = vm.userPost;
        post.profilePic = vm.userInfo.profilePic;
        post.dates = moment(new Date).format("YYYY-MM-DD HH:mm");


        vm.Posts.unshift(post); //{{post.firstName}} {{post.lastName}}

        console.log('new', post);

        dataServiceFactory.sendPost(dataServiceFactory.userInfo.id, dataServiceFactory.userInfo.eduLevel, vm.userPost)
          .then(function() {}).catch(function() {});

        vm.userPost = "";
      }

    };


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