 angular
  .module('Steve.ChoiceFactory', [])
  .factory('ChoiceFactory', () => {
  	var data = {
  		choice: ''
  	};
  	return { 
		MakeChoice: function(choice){
			data.choice = choice;
		},
		ReturnChoice: function(){
			return data.choice;
		}
    }
  });