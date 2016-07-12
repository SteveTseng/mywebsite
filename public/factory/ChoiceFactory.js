 angular
  .module('Steve.ChoiceFactory', [])
  .factory('ChoiceFactory', () => {
  	var data = {
      diameter: 0,
      thickness: 0,
      cylinderHeight: 0,
  		choice: ''
  	};
  	return { 
  		MakeChoice: function(choice, diameter, thickness, cylinderHeight){
  			data.choice = choice;
        data.diameter = diameter;
        data.thickness = thickness;
        data.cylinderHeight = cylinderHeight;
  		},
  		ReturnChoice: function(){
  			return data;
  		}
    }
  });