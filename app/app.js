/**
 * Qbox Module
 *
 * Description:This the main module of the app
 */

(function() {
  "use strict";
  var app = angular.module('Qbox', ['ui.router', 'ngMaterial', 'ngAnimate', 'md.data.table', 'ngFileUpload', 'angularFileUpload', 'chart.js', 'angularMoment', 'ezfb']);

  /*app.run(['$templateCache', function($templateCache){
   $templateCache.removeAll(); }]);*/
  /*app.filter('unsafe',['$sce', function($sce) {

        return function(val) {

            return $sce.trustAsHtml(val);

        };

    }]);*/

  app.config(['$httpProvider', function($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  }])

  app.constant('baseUrl', 'http://admin.quizbox.online/')

  app.config(['$mdThemingProvider', function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey');

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue');

  }]);

  app.config(['ChartJsProvider', function(ChartJsProvider) {
    // Configure all charts 
    ChartJsProvider.setOptions({
      responsive: true,
      maintainAspectRatio: false

    });
  }]);
  app.config(['$mdDateLocaleProvider', 'moment', function($mdDateLocaleProvider, moment) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('DD-MM-YYYY') : '';
    };
  }]);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/Welcome");
    //
    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/Welcome",
        templateUrl: "app/login/loginPageView.html",
        controller: "loginPageCtrl as vm",
        resolve: {

          institutions: ['dataServiceFactory', function(dataServiceFactory) {

            return dataServiceFactory.getInstitutions();

          }]

        }

      })

    .state('userhome', {
        url: "/home",
        templateUrl: "app/home/userHomeView.html",
        controller: "userHomeCtrl as vm",
        resolve: {

          posts: ['dataServiceFactory', function(dataServiceFactory) {

            return dataServiceFactory.getPosts(dataServiceFactory.userInfo.eduLevel);

          }],
          topScores: ['dataServiceFactory', function(dataServiceFactory) {

            return dataServiceFactory.getTopScores(dataServiceFactory.userInfo.eduLevel);

          }]


        }
      })
      .state('preptestgeneral', {
        url: "/preptestgeneral/:userLevel",
        templateUrl: "app/Tests/prepTestView.html",
        controller: "prepTestCtrl as vm",
        resolve: {

          subjects: ['dataServiceFactory', '$stateParams', function(dataServiceFactory, $stateParams) {

            return dataServiceFactory.getPrepTestSubjects($stateParams.userLevel);

          }]

        }
      })
      .state('preptestByInst', {
        url: "/preptestByInst/:userLevel",
        templateUrl: "app/Tests/prepTestByInstView.html",
        controller: "prepTestByInstCtrl as vm",
        resolve: {

          institutions: ['dataServiceFactory', '$stateParams', function(dataServiceFactory, $stateParams) {


            return dataServiceFactory.getPrepTestInstitutions($stateParams.userLevel);

          }]

        }
      })
      .state('preptestByInstSubjects', {
        url: "/preptestByInstSubjects/:institutionId",
        templateUrl: "app/Tests/prepTestByInstSubjectView.html",
        controller: "prepTestByInstSubjectCtrl as vm",
        resolve: {

          institutionSubject: ['dataServiceFactory', '$stateParams', function(dataServiceFactory, $stateParams) {

            //console.log($stateParams.institution,$stateParams.userLevel);

            return dataServiceFactory.getPrepTestByInstSubjects($stateParams.institutionId);

          }]

        }
      })
      .state('preptestExam', {
        url: "/preptestExam",
        templateUrl: "app/Tests/prepTestExamView.html",
        controller: "prepTestExamCtrl as vm"
          /* resolve:{
             
             quest:['dataServiceFactory',function(dataServiceFactory){
             
               return dataServiceFactory.getPrepTestQuestions();

             }]

           }*/
      }).state('examsResult', {
        url: "/examsResult",
        templateUrl: "app/Tests/prepTestExamResultView.html",
        controller: "prepTestExamResultCtrl as vm"
      })
      .state('signin', {
        url: "/Signin",
        templateUrl: "app/login/signPageView.html",
        controller: "signPageCtrl as vm"
      })
      .state('signup', {
        url: "/signup",
        templateUrl: "app/login/registerPageView.html",
        controller: "registerPageCtrl as vm"
      })
      .state('performance', {
        url: "/performance",
        templateUrl: "app/Tests/performanceView.html",
        controller: "performanceCtrl as vm",
        resolve: {

          performanceSubject: ['dataServiceFactory', function(dataServiceFactory) {

            //console.log($stateParams.institution,$stateParams.userLevel);

            var userID = dataServiceFactory.userInfo.id;
            var eduLevel = dataServiceFactory.userInfo.eduLevel;

            return dataServiceFactory.getPerformanceSubjects(userID, eduLevel);

          }]

        }
      })
      .state('performanceDetail', {
        url: "/performanceDetail/:subject",
        templateUrl: "app/Tests/performanceDetailView.html",
        controller: "performanceDetailCtrl as vm",
        resolve: {

          performanceSubjectDetail: ['dataServiceFactory', '$stateParams', function(dataServiceFactory, $stateParams) {

            //console.log($stateParams.institution,$stateParams.userLevel);

            var userID = dataServiceFactory.userInfo.id;
            var eduLevel = dataServiceFactory.userInfo.eduLevel;
            var subject = $stateParams.subject;

            return dataServiceFactory.getPerformanceSubjectDetail(userID, eduLevel, subject);



          }]

        }
      })
      .state('account', {
        url: "/account",
        templateUrl: "app/Tests/accountView.html",
        controller: "accountCtrl as vm"
      })
      .state('newChallenge', {
        url: "/newChallenge",
        templateUrl: "app/Tests/challengeView.html",
        controller: "challengeCtrl as vm",
        resolve: {
          studentsInSameSchool: ['dataServiceFactory', function(dataServiceFactory) {
            var userID = dataServiceFactory.userInfo.id;
            var eduLevel = dataServiceFactory.userInfo.eduLevel;


            return dataServiceFactory.getStudentsInSameSchool(userID, eduLevel);

          }],
          studentsInOtherSchool: ['dataServiceFactory', function(dataServiceFactory) {
            var userID = dataServiceFactory.userInfo.id;
            var eduLevel = dataServiceFactory.userInfo.eduLevel;


            return dataServiceFactory.getStudentsInOtherSchool(userID, eduLevel);

          }],

          subjects: ['dataServiceFactory', function(dataServiceFactory) {
            var eduLevel = dataServiceFactory.userInfo.eduLevel;

            return dataServiceFactory.getPrepTestSubjects(eduLevel);

          }]



        }
      })
      .state('challengeRequests', {
        url: "/challengeRequests",
        templateUrl: "app/Tests/challengeRequestsView.html",
        controller: "challengeRequestsCtrl as vm",
        resolve: {
          challengeRecieved: ['dataServiceFactory', function(dataServiceFactory) {
            var userID = dataServiceFactory.userInfo.id;
            return dataServiceFactory.challengeRecieved(userID);

          }]
        }
      })
      .state('challengeHistory', {
        url: "/challengeHistory",
        templateUrl: "app/Tests/challengeHistoryView.html",
        controller: "challengeHistoryCtrl as vm",
        resolve: {
          challengeHistory: ['dataServiceFactory', function(dataServiceFactory) {
            var userID = dataServiceFactory.userInfo.id;
            return dataServiceFactory.challengeHistory(userID);

          }]
        }
      }).state('challengeTestExam', {
        url: "/challengeTestExam",
        templateUrl: "app/Tests/challengeTestExamView.html",
        controller: "challengeTestExamCtrl as vm"
      });



  }]);

  /*facebook factory*/

  app.config(function(ezfbProvider) {
    /**
     * Basic setup
     *
     * https://github.com/pc035860/angular-easyfb#configuration
     */
    ezfbProvider.setInitParams({
      appId: '1090449617736857'
    });
  });
  app.directive('ngThumb', function($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function(item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function(file) {
        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas/>',
      link: function(scope, element, attributes) {
        if (!helper.support) return;

        var params = scope.$eval(attributes.ngThumb);

        if (!helper.isFile(params.file)) return;
        if (!helper.isImage(params.file)) return;

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = onLoadFile;
        reader.readAsDataURL(params.file);

        function onLoadFile(event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage() {
          var width = params.width || this.width / this.height * params.height;
          var height = params.height || this.height / this.width * params.width;
          canvas.attr({
            width: width,
            height: height
          });
          canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        }
      }
    };
  });


  app.directive("scroll", function($window) {

    return function(scope, element, attrs) {

      /* header DOM element with md-page-header attribute */
      var header = document.querySelector('[md-page-header]');
      /* Store header dimensions to initialize header styling */
      var baseDimensions = header.getBoundingClientRect();
      /* DOM element with md-header-title attribute (title in toolbar) */
      var title = angular.element(document.querySelector('[md-header-title]'));
      /* DOM element with md-header-picture attribute (picture in header) */
      var picture = angular.element(document.querySelector('[md-header-picture]'));
      /* DOM element with main-fab class (a DOM element which contains the main float action button element) */
      var fab = angular.element(document.querySelector('.main-fab'));
      /* The height of a toolbar by default in Angular Material */
      var legacyToolbarH = 64;
      /* The mid-height of a float action button by default in Angular Material */
      var legacyFabMid = 56 / 2;
      /* The zoom scale of the toolbar title when it's placed at the bottom of the header picture */
      var titleZoom = 1.5;
      /* The primary color palette used by Angular Material */
      // var primaryColor   = [63,81,181];
      var primaryColor = [38, 60, 73];


      var banner = angular.element(document.querySelector('#banner'));

      function styleInit() {
        title.css('padding-left', '16px');
        title.css('position', 'relative');
        title.css('transform-origin', '24px');
      }

      function handleStyle(dim) {
        fab.css('top', (dim.height - legacyFabMid) + 'px');
        if ((dim.bottom - baseDimensions.top) > legacyToolbarH) {
          title.css('top', ((dim.bottom - baseDimensions.top) - legacyToolbarH) + 'px');
          element.css('height', (dim.bottom - baseDimensions.top) + 'px');
          title.css('transform', 'scale(' + ((titleZoom - 1) * ratio(dim) + 1) + ',' + ((titleZoom - 1) * ratio(dim) + 1) + ')');


        } else {
          title.css('top', '0px');
          element.css('height', legacyToolbarH + 'px');
          title.css('transform', 'scale(1,1)');
          // banner.css('background', '#000');
        }
        if ((dim.bottom - baseDimensions.top) < legacyToolbarH * 2 && !fab.hasClass('hide')) {
          fab.addClass('hide');
        }
        if ((dim.bottom - baseDimensions.top) > legacyToolbarH * 2 && fab.hasClass('hide')) {
          fab.removeClass('hide');
        }
        element.css('background-color', 'rgba(' + primaryColor[0] + ',' + primaryColor[1] + ',' + primaryColor[2] + ',' + (1 - ratio(dim)) + ')');
        picture.css('background-position', '50% ' + (ratio(dim) * 50) + '%');
        /* Uncomment the line below if you want shadow inside picture (low performance) */
        //element.css('box-shadow', '0 -'+(dim.height*3/4)+'px '+(dim.height/2)+'px -'+(dim.height/2)+'px rgba(0,0,0,'+ratio(dim)+') inset');
      }

      function ratio(dim) {
        var r = (dim.bottom - baseDimensions.top) / dim.height;
        if (r < 0) return 0;
        if (r > 1) return 1;
        return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
      }

      styleInit();
      handleStyle(baseDimensions);

      /* Scroll event listener */
      angular.element($window).bind("scroll", function() {
        var dimensions = header.getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });

      /* Resize event listener */
      angular.element($window).bind('resize', function() {
        baseDimensions = header.getBoundingClientRect();
        var dimensions = header.getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });

    };

  })


}())