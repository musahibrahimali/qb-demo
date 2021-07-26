

(function(){
	"use strict";
var app = angular.module('Qbox');

    app.controller('prepTestCtrl',['$mdSidenav',prepTestCtrl]);

    function prepTestCtrl($mdSidenav){
     
     var vm = this;
    vm.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

    }

}())