 angular
  .module('Steve.FinanceFactory', [])
  .factory('FinanceFactory', () => {
  	var account = {
      cost: [];
      revenue: 0,
      profit: 0
  	};
  	return { 
  		UpdateCost: function($item){
        var item = {$item};
        account.cost.push(item);
  		},
  		UpdateRevenue: function(){
  		},
      ReturnProfit: function(){
        return account.profit;
      }
    }
  });