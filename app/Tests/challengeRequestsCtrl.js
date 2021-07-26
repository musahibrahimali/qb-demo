(function() {
  "use strict";

  var app = angular.module('Qbox');

  app.controller('challengeRequestsCtrl', ['$mdSidenav', 'dataServiceFactory', 'Upload', '$timeout', '$scope', '$state', '$anchorScroll', '$location', 'baseUrl', 'challengeRecieved', '$mdToast', challengeRequestsCtrl]);

  function challengeRequestsCtrl($mdSidenav, dataServiceFactory, Upload, $timeout, $scope, $state, $anchorScroll, $location, baseUrl, challengeRecieved, $mdToast) {

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

    // dataServiceFactory.checkUser(dataServiceFactory.userInfo.firstName);

    vm.userInfo = dataServiceFactory.userInfo;
    vm.challengeRecieved = challengeRecieved.data;

    console.log(challengeRecieved.data);


    vm.Apploader = false;

    vm.getload = function(contextMessage) {


      $scope.$on('$stateChangeStart', function() {

        vm.Apploader = true;
        vm.contextMessage = contextMessage;

      });

    };


    vm.doChallenge = function(challengeId, challengeSubject, challengeTime, numOfquestion) {


      vm.Apploader = true;
      vm.contextMessage = "Loading challenge questions";

      dataServiceFactory.challengeQuestions(challengeId)
        .then(function(response) {
          console.log(response);
          if (response.data != null) {
            vm.Apploader = false;
            //console.log(response.data,challengeId,challengeSubject,challengeTime,numOfquestion);
            dataServiceFactory.challengeInfo.id = challengeId
            dataServiceFactory.challengeInfo.questions = response.data;
            dataServiceFactory.challengeInfo.subject = challengeSubject;
            dataServiceFactory.challengeInfo.time = challengeTime;
            dataServiceFactory.challengeInfo.numOfquestion = numOfquestion;

            // console.log(dataServiceFactory.challengeInfo);

            $state.go('challengeTestExam');

          } else {


            $mdToast.show(
              $mdToast.simple()
              .textContent('There is no questions available for this challenge. Try again later')
              .position('top right')
              .hideDelay(3000)
            );

          }
        }).catch(function(response) {

          $mdToast.show(
            $mdToast.simple()
            .textContent('Something went wrong, Please check yours internet connection')
            .position('top right')
            .hideDelay(3000)
          );

        });



    }

    vm.declineChallenge = function(challengeId, index) {

      var challengeInfo = {
        "challengeId": challengeId,
        "userId": vm.userInfo
      };
      vm.Apploader = true;
      vm.contextMessage = "... Removing challenge ...";
      dataServiceFactory.challengeQuestions(challengeId)
        .then(function(response) {
          console.log(response);
          if (response.data != null) {
            $mdToast.show(
              $mdToast.simple()
              .textContent('Challenge Cancelled successfully')
              .position('top right')
              .hideDelay(3000)
            );
            vm.Apploader = false;
            vm.challengeRecieved.splice(index, 1);

          } else {


            $mdToast.show(
              $mdToast.simple()
              .textContent('There is no questions available for this challenge. Try again later')
              .position('top right')
              .hideDelay(3000)
            );

          }
        }).catch(function(response) {

          $mdToast.show(
            $mdToast.simple()
            .textContent('Something went wrong, Please check yours internet connection')
            .position('top right')
            .hideDelay(3000)
          );

        });

    }



  }

}())