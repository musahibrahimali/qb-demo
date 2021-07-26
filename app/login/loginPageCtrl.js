(function() {
  "use strict";
  var app = angular.module('Qbox');

  app.controller('loginPageCtrl', ['dataServiceFactory', '$state', '$timeout', '$interval', '$location', '$anchorScroll', '$mdDialog', 'institutions','ezfb', loginPageCtrl]);

  function loginPageCtrl(dataServiceFactory, $state, $timeout, $interval, $location, $anchorScroll, $mdDialog, institutions,ezfb) {

    var vm = this;

    $location.hash('top');

    // call $anchorScroll()
    $anchorScroll();

    vm.schools = institutions.data;

    console.log(vm.schools);

    var dataArray = [1, 2, 3, 4, 5, 6];

    vm.Apploader = false;

    var imageIndex = 0;

    vm.imagesouce = dataArray[imageIndex];


    vm.show1 = true;
    vm.show2 = true;

    vm.SignUprogress = false;
    vm.SignInprogress = false;

    $interval(changeSlide, 5000, false);

    vm.signIn = function() {

      if (vm.show2 == false) {
        vm.show2 = true;
      }
      vm.show1 = !vm.show1;

    };

    vm.signUp = function() {

      if (vm.show1 == false) {
        vm.show1 = true;
      }
      vm.show2 = !vm.show2;

      $location.hash('top');

      // call $anchorScroll()
      $anchorScroll();

    };

    vm.offFocus = function() {
      alert('hi');
    };

    vm.userData = {};
    vm.userData.email = "";
    vm.userData.password = "";
    vm.progress = false;
    vm.loginResponse = "";

    vm.loginUser = function() {
      vm.SignInprogress = true;
      vm.loginResponse = "";



      dataServiceFactory.getUser(vm.userData)
        .then(function(data) {
          vm.SignInprogress = false;
          if (data.status == 200) {

            dataServiceFactory.userInfo = data.data;

            console.log('before', dataServiceFactory.userInfo);

            //localStorage.setItem("user",JSON.stringify(dataServiceFactory.userInfo));

            // console.log('after',JSON.parse(localStorage.getItem("user")));
            dataServiceFactory.getPendingRequest(dataServiceFactory.userInfo.id).then(function  (response) {
               dataServiceFactory.userInfo.pendingRequest = response.data || 0;
               $state.go('userhome');
            }).catch();
           

          } else {

            vm.loginResponse = "Wrong Email or Password";
          };



        }).catch(function(response) {
          
            console.log(response);

        });



      // console.log('ctrl',data);
      // $state.go('userhome')
    };

    vm.SignupResponse = "";
    vm.registrationData = {};
    vm.registrationData.firstName = "";
    vm.registrationData.lastName = "";
    vm.registrationData.institute = "";
    vm.registrationData.eduLevel = "";
    vm.registrationData.email = ""
    vm.registrationData.password = "";
    vm.registrationData.confirm = "";


/*face book login*/

vm.fblogin = function  () {
    /**
     * Calling FB.login with required permissions specified
     * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
     */
    ezfb.login(function (res) {    
      }, {scope: 'email,public_profile'})
      .then(function (res) {
        if(res.status ==="connected"){
          ezfb.api('/me',{fields:'first_name,last_name,email'},function  (userData) {
            //console.log(userData);
            dataServiceFactory.userInfo.firstName = userData.first_name;
            dataServiceFactory.userInfo.lastName = userData.last_name;
            $state.go('account');

          });
        }
        
      })
  };

vm.fblogout = function  () {
   ezfb.logout();
}


    vm.registerUser = function() {

      vm.SignUprogress = true;

      console.log(vm.registrationData);
      dataServiceFactory.addUser(vm.registrationData)
        .then(function(data) {
          vm.SignUprogress = false;
          if (data.status == 200) {

            vm.signIn();
            vm.loginResponse = "Singed Up Successfully!. You can now Sign In";
            vm.userData.email = vm.registrationData.email;
            //  dataServiceFactory.userInfo = data.data;

            // console.log('before',dataServiceFactory.userInfo);

            //localStorage.setItem("user",JSON.stringify(dataServiceFactory.userInfo));

            // console.log('after',JSON.parse(localStorage.getItem("user")));

            // $state.go('userhome');

          } else {

            vm.SignupResponse = "Oops! Something Went Wrong. Try Again.";
          };



        }).catch(function(response) {
          
            console.log(response);
            
        });



    };

    function changeSlide() {

      if (imageIndex < dataArray.length) {
        // console.log('change',imageIndex);
        //console.log('index',imageIndex);
        // console.log('souce',vm.imagesouce);

        vm.imagesouce = dataArray[imageIndex];

        imageIndex++;

      } else {


        imageIndex = 0;
        vm.imagesouce = dataArray[imageIndex];

        imageIndex++;
        // console.log('else',imageIndex);
        //console.log('index2',imageIndex);
        //console.log('else souce',vm.imagesouce);
      }

    }



    /**
     * Try test functions
     */


    vm.interScience = [{
        "question": "The S.I unit for measuring the work done by a force is",
        "A": "J",
        "B": "K",
        "C": "N",
        "D": "W",
        "answer": "A",
        "choice": "",
        "status": ""
      },

      {
        "question": "The chemical formula of a compound describes the",
        "A": "number of molecules in the compound",
        "B": "type of bonding in the compound",
        "C": "ratio in which the elements are combined",
        "D": "state of the compound",
        "answer": "C",
        "choice": "",
        "status": ""
      },

      {
        "question": "Each layer of soil profile is known as",
        "A": "horizon",
        "B": "litter",
        "C": "regolith",
        "D": "solum",
        "answer": "A",
        "choice": "",
        "status": ""
      }

    ];



    vm.maths = [{
        "question": "1+1",
        "A": "5",
        "B": "4",
        "C": "3",
        "D": "2",
        "answer": "D",
        "choice": "",
        "status": ""
      },

      {
        "question": "8/4 = ?",
        "A": "4.2",
        "B": "3",
        "C": "2",
        "D": "8",
        "answer": "C",
        "choice": "",
        "status": ""
      },

      {
        "question": "2 x 3",
        "A": "6",
        "B": "9",
        "C": "5",
        "D": "8",
        "answer": "A",
        "choice": "",
        "status": ""
      }

    ];


    vm.math = false;
    vm.science = false;
    vm.menuButton = true;
    vm.testResultView = false;

    vm.hideDialog = $mdDialog.hide;
    vm.marked = {};


    vm.mathTest = function() {

      // console.log('math');
      vm.math = true;
      vm.menuButton = false;
    }

    vm.scienceTest = function() {

      // console.log('science');
      vm.science = true;
      vm.menuButton = false;
    }



    vm.tryTest = function(evt) {

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
        templateUrl: 'app/Tests/modals/tryTestmodal.html'

      }).then(function() {


        vm.math = false;
        vm.science = false;
        vm.menuButton = true;
        vm.testResultView = false;



      }, function() {


        vm.math = false;
        vm.science = false;
        vm.menuButton = true;
        vm.testResultView = false;



      });



    }


    vm.doMarking = function(subjectName) {

      //vm.hideDialog();

      if (subjectName == "maths") {

        vm.marked = vm.marker(vm.maths);
        console.log(vm.marked);

      } else if (subjectName == "science") {


        vm.marked = vm.marker(vm.interScience);
        console.log(vm.marked);

      }


      vm.math = false;
      vm.science = false;
      vm.menuButton = false;
      vm.testResultView = true;
      vm.reviewAns = false;
      vm.

      $location.hash('modaltop');

      // call $anchorScroll()
      $anchorScroll();

    }


    vm.afterTestSignUp = function() {


      vm.hideDialog();
      $location.hash('top');

      // call $anchorScroll()
      $anchorScroll();

      vm.signUp();

    }

    vm.reviewAns = false;

    vm.review = function() {

      vm.reviewAns = true;
    }


    vm.marker = function(questions) {
      var questionToMark = questions;
      var result = {};
      var correctAnswers = 0;

      for (var i = 0; i < questionToMark.length; i++) {
        if (questionToMark[i].answer == questionToMark[i].choice) {
          questionToMark[i].status = true;
          correctAnswers++;

        } else {
          questionToMark[i].status = false;

        }
      };

      result.markedquestion = questionToMark;
      result.score = correctAnswers;


      return result;

    }



  } //end of controller

}())