var express = require('express');
var question = [{quest_id: 1,
                  quest_name : "1+1 = ?"
                  ,quest_start : 'Y'
                  ,quest_end :  "N"
                 },{quest_id: 2,
                   quest_name : "2 x 2 = ?"
                  ,quest_start : "N"
                   ,quest_end :  "N"
                 },{quest_id: 3,
                  quest_name : "4 / 2 = ?"
                  ,quest_start : "N"
                  ,quest_end : "N"
                 },{quest_id: 4,
                  quest_name : "ประเทศไทยมีกี่จังหวัด?"
                  ,quest_start : "N"
                  ,quest_end : "Y"
                 }];

var question_answer = [{quest_id : 1,ans_id : 1,ans_name : 4,ans_point : 0},{quest_id:1,ans_id :2,ans_name: 1,ans_point :0},{quest_id:1,ans_id :3,ans_name: 2,ans_point :1},{quest_id:1,ans_id :4,ans_name: 0,ans_point :0},
                       {quest_id : 2,ans_id : 1,ans_name : 4,ans_point : 1},{quest_id:2,ans_id :2,ans_name: 1,ans_point :0},{quest_id:2,ans_id :3,ans_name: 2,ans_point :0},{quest_id:2,ans_id :4,ans_name: 0,ans_point :0},   
                       {quest_id : 3,ans_id : 1,ans_name : 4,ans_point : 0},{quest_id:3,ans_id :2,ans_name: 1,ans_point :0},{quest_id:3,ans_id :3,ans_name: 2,ans_point :1},{quest_id:3,ans_id :4,ans_name: 0,ans_point :0}, 
                       {quest_id : 4,ans_id : 1,ans_name : 74,ans_point : 0},{quest_id:4,ans_id :2,ans_name: 75,ans_point :0},{quest_id:4,ans_id :3,ans_name: 76,ans_point :0},{quest_id:4,ans_id :4,ans_name: 77,ans_point :1},   
                      ];



module.exports = {
  getQuestions : function(q_id,callback)
  {   
    var quest = findQuestionById(question,{"quest_id":q_id});
    var ans =   findAnswersById(question_answer,{"quest_id":q_id});
    if (quest == null||ans == null){
      callback('data-not-found');
    } else{
      var o = new Object();     
      o.questions = quest;
      o.answers = ans;
      callback(null, o);
    }
  }
}

function findQuestionById(arrObj,obj)
{    
    for(var i in arrObj){
        var oArr = arrObj[i];        
        if(oArr.quest_id==obj.quest_id)
        {
            return oArr;
        }
    }
}

function findAnswersById(arrObj,obj)
{
   var arrO = [];
   for(var i in arrObj){
        var o = arrObj[i];        
        if(o.quest_id==obj.quest_id)
        {
             arrO.push(o);
        }
    }    
    return arrO;
}
