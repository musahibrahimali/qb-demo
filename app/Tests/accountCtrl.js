(function() {
  "use strict";
  var app = angular.module('Qbox');

  app.controller('accountCtrl', ['$mdSidenav', '$mdToast', 'dataServiceFactory', 'FileUploader', 'Upload', '$timeout', '$scope', '$state', '$anchorScroll', '$location','baseUrl', accountCtrl]);

  function accountCtrl($mdSidenav, $mdToast, dataServiceFactory, FileUploader, Upload, $timeout, $scope, $state, $anchorScroll, $location,baseUrl) {

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



    vm.userInfo = dataServiceFactory.userInfo;

    vm.userdata = angular.copy(vm.userInfo);

    //vm.userdata.school = "Hope preparatory school";



    //console.log(vm.userdata);

    vm.edit = false;

    vm.doEdit = function() {
      vm.edit = true;
      //console.log(vm.userdata);
    };

    vm.doCancel = function() {
      vm.edit = false;
      vm.userdata = angular.copy(vm.userInfo);
    };


    vm.doSave = function() {
      vm.edit = false;


      vm.updateData = {
        "firstName": vm.userdata.firstName,
        "lastName": vm.userdata.lastName,
        "email": vm.userdata.email,
        "eduLevel": vm.userdata.eduLevel,
        "institution": vm.userdata.institutionId,
        "class": vm.userdata.class,
        "userId": vm.userdata.id
      };

      vm.updateUser(vm.updateData);

      //console.log(vm.updateData);
    };



    vm.imageEdit = true;
    vm.picUrl = baseUrl + vm.userdata.profilePic;

    vm.doEditpic = function() {

      vm.imageEdit = false;


    };


    vm.cancelEditpic = function() {

      vm.imageEdit = true;
      uploader.clearQueue();

      //vm.picUrl = '';


    };


    vm.updateUser = function(userdata) {
      vm.Apploader = true;
      vm.contextMessage = "Updating your Profile";

      dataServiceFactory.updateUser(userdata)
        .then(function(response) {
          vm.Apploader = false;
          //console.log('update', response);
          if (response.data === null) {



            //console.log('updateResponseData', response.data);

          } else if (response.data !== null) {

            dataServiceFactory.userInfo = angular.copy(vm.userdata);
            vm.userInfo = angular.copy(vm.userdata);

            $mdToast.show(
              $mdToast.simple()
              .textContent('profile updated successfully')
              .position('top right')
              .hideDelay(3000)
            );

            //console.log('updateData', response.data);



          }
        })
        .catch(function() {
          //console.log('2', 'fail')
        });

    };



    vm.uploadLabel = "Choose image";


    var uploader = $scope.uploader = new FileUploader({
      url: 'http://qboxadmin.firstadds.com/Api/upload_file/'+vm.userInfo.id,
      alias: 'userfile',
      removeAfterUpload: true,
      queueLimit: 1
    });

    // FILTERS

    uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/ , options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
      }

    });



    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {


      $mdToast.show(
        $mdToast.simple()
        .textContent('Selected File (' + item.name + ') is not an image')
        .position('top right')
        .hideDelay(3000)
      );


      //console.info('onWhenAddingFileFailed', item.name);
      uploader.clearQueue();
    };


    uploader.onAfterAddingFile = function(fileItem) {

      vm.uploadLabel = fileItem._file.name;
      //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {

      //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {

      vm.Apploader = true;
      vm.contextMessage = "Uploading Image";
      console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
      //console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
      //console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      //console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {

      $mdToast.show(
        $mdToast.simple()
        .textContent('Profile picture not updated, Try again or check internet connection')
        .position('top right')
        .hideDelay(3000)
      );

      vm.Apploader = false;

      //console.info('onErrorItem', fileItem, response, status, headers);
    };

    uploader.onCancelItem = function(fileItem, response, status, headers) {
      //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {

      //   http://qboxadmin.firstadds.com/{{vm.userInfo.profilePic}}
      // //console.info('onCompleteItem', fileItem, response, status, headers);
      //console.info('onCompleteItem', response.data.profilePic);

      dataServiceFactory.userInfo.profilePic = response.data.profilePic;
      //console.log(dataServiceFactory.userInfo.profilePic);
      vm.Apploader = false;

      $mdToast.show(
        $mdToast.simple()
        .textContent('Profile picture updated')
        .position('top right')
        .hideDelay(3000)
      );

      vm.imageEdit = true;
      vm.picUrl = 'http://qboxadmin.firstadds.com/' + response.data.profilePic;

    };


    uploader.onCompleteAll = function() {
      ////console.info('onCompleteAll');
    };



    //$location.hash('top');

    // call $anchorScroll()
    //$anchorScroll();


    /*
     *Resetting user password.
     *
     */


    vm.oldpass = "";
    vm.newpass = "";
    vm.confirmpass = "";

      vm.error = false;
      vm.pbutton = true;
      vm.errormsg = "";
    
   vm.pristine = function(){
    if (vm.confirmpass.trim() == "" && vm.confirmpass.trim() == "" && vm.oldpass.trim() == "") {
      vm.error = false;
      vm.pbutton = true;
      vm.errormsg = "";
    }if(vm.newpass.trim() == ""){

      vm.error = false;
      vm.pbutton = true;
      vm.errormsg = "";

      }
   };
    
    
   // $scope.towatch = ['vm.confirmpass','vm.newpass'];

     $scope.$watch('vm.confirmpass',function() {
        
        vm.pristine();
       if ((vm.newpass.trim() != "" || vm.confirmpass.trim() != "") && vm.oldpass.trim() == "") {
     
        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Please enter your old password first";
      }

     });

     $scope.$watch('vm.newpass',function() {
        
        vm.pristine();
        if (vm.confirmpass.trim() === vm.newpass.trim() && vm.confirmpass.trim() != "" && vm.confirmpass.trim() != "" && vm.oldpass.trim() != "") {
        //console.log('hi there');
        vm.pbutton = false;
        vm.error = false;
      }else if ((vm.newpass.trim() != "" || vm.confirmpass.trim() != "") && vm.oldpass.trim() == "") {
     
        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Please enter your old password first";
      }else if (vm.confirmpass.trim() !== vm.newpass.trim() && vm.confirmpass.trim() != "" && vm.confirmpass.trim() != "" && vm.oldpass.trim() != "") {
        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Passwords don't match";
      }

     });

      $scope.$watch('vm.oldpass',function() {
        
        vm.pristine();
       if ((vm.newpass.trim() != "" || vm.confirmpass.trim() != "") && vm.oldpass.trim() == "") {
     
        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Please enter your old password first";
      } if (vm.confirmpass.trim() === vm.newpass.trim() && vm.confirmpass.trim() != "" && vm.confirmpass.trim() != "" && vm.oldpass.trim() == "") {
        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Please enter your old password first";
      } else if (vm.confirmpass.trim() !== vm.newpass.trim() && vm.confirmpass.trim() != "" && vm.confirmpass.trim() != "" && vm.oldpass.trim() == "") {
        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Please enter your old password first";
      } else{

        vm.error = false;
       
      }

     });


    $scope.$watch('vm.confirmpass', function() {
      if (vm.confirmpass.trim() === vm.newpass.trim() && vm.confirmpass.trim() != "" && vm.confirmpass.trim() != "" && vm.oldpass.trim() != "") {
        //console.log('hi there');
        vm.pbutton = false;
        vm.error = false;
      } else if (vm.confirmpass.trim() !== vm.newpass.trim() && vm.confirmpass.trim() != "" && vm.confirmpass.trim() != "" && vm.oldpass.trim() != "") {
        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Passwords don't match";
      }else if (vm.confirmpass.trim() !== vm.newpass.trim() && vm.confirmpass.trim() != "" && vm.confirmpass.trim() != "" && vm.oldpass.trim() == "") {

        vm.error = true;
        vm.pbutton = true;
        vm.errormsg = "Please enter your old password first";
      }
    });


    vm.updatePassword = function() {

      console.log('password', vm.oldpass, vm.newpass, vm.confirmpass);

      /*if(vm.oldpass ==="" && vm.newpass ==="" && vm.confirmpass ===""){
        

       
      }else{

        dataServiceFactory.userPasswordReset(userdata)
      .then(function(response) {
        vm.Apploader = false;
        //console.log('update', response);
        if (response.data === null) {

         

          $mdToast.show(
            $mdToast.simple()
            .textContent('profile updated successfully')
            .position('top right')
            .hideDelay(3000)
          );

        } else if (response.data !== null) {

          

          $mdToast.show(
            $mdToast.simple()
            .textContent('profile updated successfully')
            .position('top right')
            .hideDelay(3000)
          );

          //console.log('updateData', response.data);



        }
      })
      .catch(function() {
        //console.log('2', 'fail')
      });

      }*/
    };



  }

}());