
(function(){
	"use strict";
var app = angular.module('Qbox');

    app.factory('examsTimeFactory', [function(){
    	return {hour:0,
                min:0,
                sec:0};
    }]);


}())