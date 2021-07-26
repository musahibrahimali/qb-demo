

(function(){
	"use strict";
var app = angular.module('datamock',['ngMockE2E']);

  app.run(function($httpBackend){
  
    var interScience = [{"question":"The S.I unit for measuring the work done by a force is",
					   "A":"J",
					   "B":"K",
					   "C":"N",
					   "D":"W",
					   "answer":"A",
					   "choice":"",
					   "status":""
					    },

					 {"question":"The chemical formula of a compound describes the",
					    "A":"number of molecules in the compound",
					    "B":"type of bonding in the compound",
					    "C":"ratio in which the elements are combined",
					    "D":"state of the compound",
					    "answer":"C",
					   "choice":"" ,
					    "status":""},

					  {"question":"Each layer of soil profile is known as",
					    "A":"horizon",
					    "B":"litter",
					    "C":"regolith",
					    "D":"solum" ,
					   "answer":"A",
					   "choice":"" ,
					   "status":""}

                    ];

 var socialStudies = [{"question":"Who led the 1948 boycott fo European goods in the Gold Coast?",
					   "A":"Paa Grant",
					   "B":"Nii Kwabena Bonney",
					   "C":"Ako Adjei",
					   "D":"Obetsebi Lamptey",
					   "answer":"B",
					   "choice":"",
					   "status":""
					    },

					 {"question":"The most Southern point of Ghana is",
					    "A":"Cape Coast",
					    "B":"Takoradi",
					    "C":"Cape Three Point",
					    "D":"Ada",
					    "answer":"C",
					   "choice":"" ,
					    "status":""},

					  {"question":"Which of the following is not considered as an environmental problem?",
					    "A":"Air pollution",
					    "B":"Bush burning",
					    "C":"Shortage of Water",
					    "D":"Afforestation" ,
					   "answer":"D",
					   "choice":"" ,
					   "status":""}

                    ];


     var maths = [{"question":"1+1",
					   "A":"5",
					   "B":"4",
					   "C":"3",
					   "D":"2",
					   "answer":"D",
					   "choice":"",
					   "status":""
					    },

					 {"question":"8/4 = ?",
					    "A":"4.2",
					    "B":"3",
					    "C":"2",
					    "D":"8",
					    "answer":"C",
					   "choice":"" ,
					    "status":""},

					  {"question":"2 x 3",
					    "A":"6",
					    "B":"9",
					    "C":"5",
					    "D":"8" ,
					   "answer":"A",
					   "choice":"" ,
					   "status":""}

                    ];
       
       var jhsSubjects = [ {"image":"images/sciboy.jpg",
                            "title":"Inter Science"},
                           
                            {"image":"images/math.jpg",
                            "title":"Maths"},
                            {"image":"images/soc.jpg",
                            "title":"Social Studies"}
          ];


      var shsSubjects = [ {"image":"images/Image.png",
                            "title":"Science"},
                            {"image":"images/Image.png",
                            "title":"Core Maths"},
                            {"image":"images/Image.png",
                            "title":"English"},
                            {"image":"images/Image.png",
                            "title":"Physics"}
                ];

                

  var shsInstitions = [ {"image":"images/waec.jpg",
                            "title":"WASCE"},
                            {"image":"images/Image.png",
                            "title":"Presec"},
                            {"image":"images/Image.png",
                            "title":"Wesley Girls"},
                            {"image":"images/Image.png",
                           "title":"Apam"}
          ];



   var jhsInstitions = [ {"image":"images/Image.png",
                            "title":"BECE"},
                            {"image":"images/Image.png",
                            "title":"Grace Academy"},
                            {"image":"images/Image.png",
                            "title":"Mountain depores"},
                            {"image":"images/Image.png",
                            "title":"Saint Anthony"},
                            {"image":"images/Image.png",
                           "title":"Bright future Academy"}
          ];


    var posts = [{"userName":"Mike Taylor",
                  "post":"atque eligendi cumque cupiditate ad incidunt culpa quia asperiores"},
                  {"userName":"Dwayn Wayne",
                  "post":"atque eligendi cumque cupiditate ad incidunt culpa quia asperiores"},
                  {"userName":"Chris Rock",
                  "post":"atque eligendi cumque cupiditate ad incidunt culpa quia asperiores"},
                  {"userName":"Anita Khan",
                  "post":"atque eligendi cumque cupiditate ad incidunt culpa quia asperiores"},
                  {"userName":"Justin Aidoo",
                  "post":"atque eligendi cumque cupiditate ad incidunt culpa quia asperiores"}]
  
         

       var prepGenSubjectsnUrl = "/api/questions/prepTestSubjects/";
       var prepGenQuestionsnUrl = "/api/questions/prepTestQuestions";
       var prepInstUrl = "/api/prepTestInstitutions/";
       var post = "/api/posts"


       var prepInstSubjectsUrl = "/api/prepTestInstSubjects/";

       var loginUser = "/api/login";

       $httpBackend.whenGET(/\.html$/).passThrough();
       $httpBackend.whenGET(/\.firstadds/).passThrough();
       $httpBackend.whenPOST(/\.firstadds/).passThrough();

       $httpBackend.whenGET(prepGenSubjectsnUrl + "jhs").respond(jhsSubjects);
       $httpBackend.whenGET(prepGenSubjectsnUrl + "shs").respond(shsSubjects);

       $httpBackend.whenGET(prepInstUrl  + "shs").respond(shsInstitions);
       $httpBackend.whenGET(prepInstUrl  + "jhs").respond(jhsInstitions);

       //var pattern = new RegExp(/[a-b]/i);
       $httpBackend.whenGET(prepInstSubjectsUrl +  "wasce" + "/shs").respond(shsSubjects);
       $httpBackend.whenGET(prepInstSubjectsUrl  + "bece" + "/jhs").respond(jhsSubjects);

       var institutionId = new RegExp("/[0-9]+/");

       $httpBackend.whenGET("http://qboxadmin.firstadds.com/Api/generalpreptestsubjects/JHS").passThrough();
       $httpBackend.whenGET("http://qboxadmin.firstadds.com/Api/generalpreptestsubjects/SHS").passThrough();
       $httpBackend.whenGET("http://qboxadmin.firstadds.com/Api/institutions/SHS").passThrough();
       $httpBackend.whenGET("http://qboxadmin.firstadds.com/Api/institutions/JHS").passThrough();
       $httpBackend.whenGET("hhttp://qboxadmin.firstadds.com/Api/institutionSubjects/2").passThrough();
       
       $httpBackend.whenPOST("http://qboxadmin.firstadds.com/Api/generalpreptestquestions/").passThrough();
       $httpBackend.whenPOST("http://qboxadmin.firstadds.com/Api/get_login").passThrough();
       $httpBackend.whenPOST("http://qboxadmin.firstadds.com/Api/signup").passThrough();

$httpBackend.whenGET(post).respond(posts);

$httpBackend.whenPOST("http://qboxadmin.firstadds.com/Api/generalpreptestquestions/").respond(function(method,url,data){
        

        var questionCriteria = angular.fromJson(data);
  
        var response = {};

        if(questionCriteria.subject == 'English Language'){

          response = interScience;
           return [200,response,{}];

        }else if(questionCriteria.subject == 'maths'){

          response = maths;
           return [200,response,{}];

        }else if(questionCriteria.subject == 'socialstudies'){

          response = socialStudies;
           return [200,response,{}];

        }
       

       

        
       });

    //   $httpBackend.whenGET(questionUrl).respond(questions);
       $httpBackend.whenPOST(loginUser).respond(function(method,url,data) {


      var info = angular.fromJson(data);
         	
       /// console.log(url);
       /// 
        var jhsdata = { "firstName":"Peter",
                          "lastName":"Griffen",
                          "prifilePic":"images/avatar.jpg",
                          "eduLevel":"JHS",
                          "email":"peter@gmail.com"};

         var shsdata = { "firstName":"Chris",
                          "lastName":"Bower",
                          "prifilePic":"images/avatar.jpg",
                          "eduLevel":"SHS",
                          "email":"chris@gmail.com"};

          
       // console.log(url);
      //  console.log(method);
       // console.log(info);
        
     
     if(info.email == jhsdata.email){ 
        
        jhsdata.status =true;
        return [200,jhsdata,{}];
      
     }else if(info.email == shsdata.email){
          shsdata.status =true;
         return [200,shsdata,{}];

     }else{
     	     var response = {"status":false};
     	return [200,response,{}];
     }
       
          



       });

  })
   
    
}());