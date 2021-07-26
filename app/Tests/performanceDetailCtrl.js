

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('performanceDetailCtrl',['$mdSidenav','dataServiceFactory','$state','$scope','$timeout','performanceSubjectDetail','baseUrl',performanceDetailCtrl]);

    function performanceDetailCtrl($mdSidenav,dataServiceFactory,$state,$scope,$timeout,performanceSubjectDetail,baseUrl){
     
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
  //
 // console.log(performanceSubjectDetail);

  vm.Apploader = false;

 vm.getload = function(contextMessage) {
    
    

      

$scope.$on('$stateChangeStart', function() {
  
     vm.Apploader = true;
     vm.contextMessage = contextMessage;

});

   
   
    };

vm.localLoader = function(contextMessage) {
    
    

     vm.Apploader = true;
     vm.contextMessage = contextMessage;
   
   
    };
  


vm.userInfo = dataServiceFactory.userInfo;


  //console.log(performanceSubject.data);
  

vm.subjectsTaken = function() { 

vm.Apploader = true;
  $state.go('performance');
   
   
  vm.localLoader("Back to over all perfomance");

}



  

      
        var graphLabel = [];
        var graphSeries = [];
        var graphData = [];
        var lineChartLabel = []; 

       
       if (performanceSubjectDetail.data != null) {
         vm.subjectPerformanceDetail = performanceSubjectDetail.data;

        var recievedData = performanceSubjectDetail.data;
        var dataLength = performanceSubjectDetail.data.length;

        graphLabel = " ";
        graphSeries = recievedData[0].subject;
        
        vm.subjectName = recievedData[0].subject;

     //   console.log(dataLength);
       // console.log(response.data);


        for (var i = 0; i < dataLength; i++) {

          graphData.push([recievedData[i].score]);
          lineChartLabel.push("");
        }



        $scope.labels = [graphLabel];

        $scope.series = [graphSeries];

        $scope.data = graphData;

        $scope.labels1 = lineChartLabel;
        $scope.series1 = [graphSeries];
        $scope.data1 = [graphData];

        console.log($scope.data);
        console.log($scope.labels1);
        console.log($scope.series);
        console.log($scope.series);

       }
      
      
      window.dispatchEvent(new Event('resize'));
          
         
                   



    }

}())