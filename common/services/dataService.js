(function() {
  "use strict";
  var app = angular.module('Qbox');

  app.factory('dataServiceFactory', ['$http', '$q', '$timeout', '$state','baseUrl', dataServiceFactory]);


  function dataServiceFactory($http, $q, $timeout, $state,baseUrl) {

    return {
      getUser: getUser,
      checkUser: checkUser,
      addUser: addUser,
      updateUser: updateUser,
      getInstitutions: getInstitutions,
      getPrepTestSubjects: getPrepTestSubjects,
      getPrepTestQuestions: getPrepTestQuestions,
      getPrepTestInstitutions: getPrepTestInstitutions,
      getPrepTestByInstSubjects: getPrepTestByInstSubjects,
      getPerformanceSubjects: getPerformanceSubjects,
      getPerformanceSubjectDetail: getPerformanceSubjectDetail,
      getPrepTestByInstQuestions: getPrepTestByInstQuestions,
      getStudentsInSameSchool: getStudentsInSameSchool,
      getStudentsInOtherSchool: getStudentsInOtherSchool,
      creatChallenge: creatChallenge,
      challengeRecieved: challengeRecieved,
      challengeQuestions: challengeQuestions,
      challengeHistory: challengeHistory,
      sendChallengeResult: sendChallengeResult,
      declineChallenge: declineChallenge,
      postTestResult: postTestResult,
      sendPost: sendPost,
      getPosts: getPosts,
      getPostReply: getPostReply,
      sendPostReply: sendPostReply,
      getPendingRequest: getPendingRequest,
      getTopScores: getTopScores,
      userInfo: {},
      questions: {},
      challengeInfo: {},
      SubjectChoosen: "",
      pendingRequest: 0
    };


    /*
        function getdata() {


          return $http.get('/api/questions/prepTestGeneral')
            .then(success)
            .catch(fail);

        }*/

    function checkUser(userInfo) {

      if (userInfo == null || typeof(userInfo) == undefined) {
        $state.go('login');
      }

    }

    function getPosts(userlevel) {


      return $http.get(baseUrl+'Api/get_posts/' + userlevel)
        .then(success)
        .catch(fail);

    }

    function sendPost(userID, edulevel, post) {
      var data = {};
      data.userid = userID;
      data.post = post;
      data.eduLevel = edulevel;

      console.log(data);
      return $http.post(baseUrl+'Api/user_posts', data)
        .then(function(response) {


          console.log(response);
          return response.data;


        })
        .catch(function() {

          console.log('fail');
        });
    }

    function getTopScores(userLevel) {


      return $http.get(baseUrl+ 'Api/get_top_scores/' + userLevel)
        .then(success)
        .catch(fail);
    }

    function getInstitutions() {


      return $http.get(baseUrl+'Api/institutions/')
        .then(success)
        .catch(fail);
    }


    function getUser(userData) {



      return $http.post(baseUrl+'Api/get_login', userData)
        .then(function(response) {


          console.log(response);
          return response.data;


        })
        .catch(function() {

          console.log('fail');
        });

    }

    function getStudentsInSameSchool(userID,eduLevel) {
      var data = {};
          data.userId = userID;
          data.eduLevel = eduLevel;

     
      console.log('hello');
      return $http.post(baseUrl+'Api/students_in_same_school',data)
        .then(function(response) {
          console.log(response);
          return response.data;
        })
        .catch(function() {
          console.log('fail');
        });

    }

    function getStudentsInOtherSchool(userID,eduLevel) {
      var data = {};
          data.userId = userID;
          data.eduLevel = eduLevel;

     
      console.log('hello');
      return $http.post(baseUrl+'Api/students_not_same_school',data)
        .then(function(response) {
          console.log(response);
          return response.data;
        })
        .catch(function() {
          console.log('fail');
        });

    }


  

    /*{
    "user_id":555,
    "subject":"Science", 
    "eduLevel":"JHS",
    "score":70
    }*/

    function postTestResult(userID, eduLevel, score, subject) {

      var data = {};
      data.user_id = userID;
      data.eduLevel = eduLevel;
      data.score = score;
      data.subject = subject;

      return $http.post(baseUrl+'Api/post_student_test_results', data)
        .then(function(response) {


          console.log(response);
          return response.data;


        })
        .catch(function() {

          console.log('fail');
        });

    }



    function getPerformanceSubjects(userID, eduLevel) {

      var data = {};
      data.stuID = userID;
      data.eduLevel = eduLevel;

      return $http.post(baseUrl+'Api/get_subjects_taken', data)
        .then(function(response) {


          //console.log(response);
          return response.data;


        })
        .catch(function() {

          console.log('fail');
        });

    }

    function getPerformanceSubjectDetail(userID, eduLevel, subject) {

      var data = {};
      data.userId = userID;
      data.subject = subject;
      data.eduLevel = eduLevel;

      return $http.post(baseUrl+'Api/get_student_test_results', data)
        .then(function(response) {


          //console.log(response);
          return response.data;


        })
        .catch(function() {

          console.log('fail');
        });

    }


    function addUser(userData) {


      return $http.post(baseUrl+'Api/signup', userData)
        .then(function(response) {


          console.log(response);
          return response.data;


        })
        .catch(function() {

          return false;
        });

    }

    function updateUser(userData) {


      return $http.post(baseUrl+'Api/update_user', userData)
        .then(function(response) {


          console.log(response);
          return response.data;


        })
        .catch(function() {

          console.log('fail');
        });

    }


    function userPasswordReset(userData) {


      return $http.post(baseUrl+'Api/reset_password', userData)
        .then(function(response) {


          console.log(response);
          return response.data;


        })
        .catch(function() {

          console.log('fail');
        });

    }



    /*
     *function for prepTests
     */

    function getPrepTestSubjects(userLevel) {


      return $http.get(baseUrl+'Api/generalpreptestsubjects/' + userLevel)
        .then(success)
        .catch(fail);

    }

    function getPrepTestQuestions(questionCriteria) {

      console.log('getprep', questionCriteria);

      return $http.post(baseUrl+'Api/generalpreptestquestions/', questionCriteria)
        .then(success)
        .catch(fail);

    }



    function postPrepTestResults() {


    }


    /*
     *function for prepTestbyInstitution
     *
     *
     *
     */

    function getPrepTestInstitutions(userLevel) {


      return $http.get(baseUrl+'Api/institutions/' + userLevel)
        .then(success)
        .catch(fail);

    }


    function getPrepTestByInstQuestions(questionCriteria, institutionId) {


      return $http.post(baseUrl+'Api/institutionquestions/' + institutionId, questionCriteria)
        .then(success)
        .catch(fail);


    }

    function getPrepTestByInstSubjects(institutionId) {

      // console.log(institutionId);
      return $http.get(baseUrl+'Api/institutionSubjects/' + institutionId)
        .then(success)
        .catch(fail);


    }



    function postPrepTestResults() {


    }



/**
 * THE functions below are for challenge Requests section
 */

 /*
  *creatChallenge
 * @param      {json}  challengeInfo  The challenge information
 * @return     {json}  get json response when challenge is created with data not null
 */

    function creatChallenge(challengeInfo) {

      
      return $http.post(baseUrl+'Api/new_challenge',challengeInfo)
        .then(function(response) {
          return response.data;
        })
        .catch(function() {
          console.log('fail');
        });
    }

/**
 * decline challenge. for cancelling challenges.
 *
 * @param      {object}  challengeInfo  The challenge information
 * @return     {object}  response from server.
 */
    function declineChallenge(challengeInfo) {
      
      return $http.post(baseUrl+'Api/decline_challenge_request',challengeInfo)
        .then(function(response) {
          return response.data;
        })
        .catch(function() {
          console.log('fail');
        });
    }


 function sendChallengeResult(challengeId,userId,userScore) {
     
      var challengeData = {};
          challengeData.challengeId = challengeId;
          challengeData.userId = userId;
          challengeData.userScore =userScore;
          
      return $http.post(baseUrl+'Api/challengeResult',challengeData)
        .then(function(response) {
          console.log(response);
          return response.data;
        })
        .catch(function() {
          console.log('fail');
        });
    }



/**
 * Gets the chellenge requests sent to a user
 *
 * @param      {int}  UserID  The user id
 * @return     {json}  { return an array of json of the users challenge requests }
 */
    function challengeRecieved(UserID) {
       return $http.get(baseUrl+'Api/challenge_received/' + UserID)
        .then(success)
        .catch(fail);
    }



/**
 * gets challenge questions
 *
 * @param      {string}  challengeID  The challenge id
 * @return     {json array}  array of challenge questions to be anwsered
 */
    function challengeQuestions(challengeID) {
       return $http.get(baseUrl+'Api/challenge_questions/' + challengeID)
        .then(success)
        .catch(fail);
    }


    function challengeHistory(userId) {
        return $http.get(baseUrl+'Api/challengeHistory/' + userId)
        .then(success)
        .catch(fail);
    }

    function getPostReply(postId) {
      return $http.get(baseUrl+'Api/get_post_comments/' + postId)
        .then(success)
        .catch(fail);
    }

    function sendPostReply(userId,postId,comment) {
      var replyData = {
        "user_id": userId,
        "post_id": postId,
        "comment": comment
      };

      return $http.post(baseUrl+'Api/post_comments',replyData)
        .then(function(response) {
          console.log(response);
          return response.data;
        })
        .catch(function() {
          console.log('fail');
        });
}
    function getPendingRequest(userId) {
      return $http.get(baseUrl + '/Api/pending_request/' + userId)
        .then(success)
        .catch(fail);
    }


    function success(response) {
      // console.log('sus',response);
      return response.data;
    }

    function fail(response) {

      //$q.reject('Error getting question');
      console.log('1', 'fail', response);
    }



  }



}())