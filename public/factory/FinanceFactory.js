 angular
  .module('Steve.FinanceFactory', [])
  .factory('FinanceFactory', () => {
  	var account = {
      cost: [],
      revenue: 0,
      profit: 0
  	};
  	return { 
  		UpdateCost: function($item){
        var itemExist = false;
        for(var i = 0; i < account.cost.length; i++){
          if(account.cost[i].name == $item.name){
            account.cost[i].amount = $item.amount;
            itemExist = true;
          }
        }
        if(itemExist == false){
          account.cost.push($item);
        }
  		},
  		UpdateRevenue: function(){
  		},
      ReturnAccountInfo: function(){
        return account;
      }
    }
  });