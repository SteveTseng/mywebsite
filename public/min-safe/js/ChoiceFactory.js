 angular
  .module('Steve.ChoiceFactory', [])
  .factory('ChoiceFactory', () => {
  	var data = {
      diameter: 0,
      thickness: 0,
      cylinderHeight: 0,
  		choice: '',
      quantity: 0,
      soldQuantity: 100,
      qualityControlImpact: 1
  	};
  	return { 
  		MakeChoice: function(choice, diameter, thickness, cylinderHeight){
  			data.choice = choice;
        data.diameter = diameter;
        data.thickness = thickness;
        data.cylinderHeight = cylinderHeight;
  		},
      QuantityChoice: function(quantity){
        data.quantity = quantity;
      },
      QualityChoice: function(number){
        data.qualityControlImpact = number;
      },
      SellingChoice: function(units){
        data.soldQuantity = units;
      },
  		ReturnChoice: function(){
  			return data;
  		}
    }
  });