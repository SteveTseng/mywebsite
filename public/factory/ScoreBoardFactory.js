 angular
  .module('Steve.ScoreBoardFactory', [])
  .factory('ScoreBoardFactory', () => {
  	var users = [
      {name: 'Steve',score: 50000}
    ];
  	return { 
      addUser: function(userObj){
        users.push({name:userObj.name, score:userObj.score});
      },
      returnUser: function(){
        return users;
      }
    }
  });