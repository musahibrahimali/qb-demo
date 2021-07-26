(function() {
  "use strict";

  var app = angular.module('Qbox');

  app.controller('challengeCtrl', ['$mdSidenav', 'dataServiceFactory', '$timeout', '$scope', '$state', '$anchorScroll', '$location', 'studentsInSameSchool','studentsInOtherSchool','moment','baseUrl','$mdToast','subjects', challengeCtrl]);

  function challengeCtrl($mdSidenav, dataServiceFactory, $timeout, $scope, $state, $anchorScroll, $location, studentsInSameSchool,studentsInOtherSchool,moment,baseUrl,$mdToast,subjects) {

    var vm = this;
    vm.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

 dataServiceFactory.checkUser(dataServiceFactory.userInfo.firstName);
vm.menu1 = false;
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

   // console.log(subjects);

    vm.userInfo = dataServiceFactory.userInfo;
     vm.subjects = subjects.data;


    vm.Apploader = false;

    vm.getload = function(contextMessage) {


      $scope.$on('$stateChangeStart', function() {

        vm.Apploader = true;
        vm.contextMessage = contextMessage;

      });


    };


    //vm.challengeCount = 70;

    if (studentsInSameSchool.data != null) {

      vm.peopleInSchool = studentsInSameSchool.data;
      console.log(vm.peopleInSchool);
    }

    vm.peopleOutSchool = studentsInOtherSchool.data;
    vm.contacts = [];

    vm.addedUsers = 0;
    vm.challengInfo = {};

    vm.challengInfo.subject = "";
      vm.challengInfo.numOfquestions = "";
      vm.challengInfo.time = "";
      vm.challengInfo.expiringDate = "";
      vm.challengInfo.challengers = "";

    vm.sendRequest = function() {
    vm.Apploader = true;
     vm.contextMessage = "Creating challenges...";
     vm.contacts.push(vm.userInfo);
      var newChallenge = {
        "subject": vm.challengInfo.subject,
        "numOfquestions": vm.challengInfo.numOfquestions,
        "time": vm.challengInfo.time,
        "expiringDate": vm.challengInfo.expiringDate? moment(vm.challengInfo.expiringDate).format('YYYY-MM-DD'):'',
        "eduLevel": vm.userInfo.eduLevel,
        "userId": vm.userInfo.id,
        "challengers":vm.contacts
      }

      dataServiceFactory.creatChallenge(newChallenge)
      .then(function(response) {
        if (response.data != null) {
          vm.Apploader = false;
          vm.contacts = [];
          vm.challengInfo.subject = "";
          vm.challengInfo.numOfquestions = "";
          vm.challengInfo.time = "";
          vm.challengInfo.expiringDate = "";
          vm.challengInfo.challengers = "";

            $mdToast.show(
              $mdToast.simple()
              .textContent('challenge created  successfully')
              .position('top right')
              .hideDelay(3000)
            );
        } else {
          $mdToast.show(
              $mdToast.simple()
              .textContent('Failed! challenge not sent. Try Again')
              .position('top right')
              .hideDelay(3000)
            );

        }
      }).catch(function(response) {

         $mdToast.show(
              $mdToast.simple()
              .textContent('profile updated successfully')
              .position('top right')
              .hideDelay(3000)
            );
        
      });


        //console.log(newChallenge);

    };


    vm.removedUser = function() {
      vm.addedUsers = vm.contacts.length;

    }

    vm.addUser = function(user, Objindex, type) {

      if (type == 1) {
        vm.peopleInSchool.splice(Objindex, 1);
        user.profilePic = vm.baseUrl + user.profilePic;
        vm.contacts.push(user);
      

      } else if (type == 2) {
        vm.peopleOutSchool.splice(Objindex, 1);
        user.profilePic = vm.baseUrl + user.profilePic;
        vm.contacts.push(user);


      }


    }

    $scope.$watchCollection('vm.contacts', function() {
      vm.addedUsers = vm.contacts.length;
    });



  }

}())