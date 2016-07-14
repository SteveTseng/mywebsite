 angular
  .module('Steve.FinanceFactory', [])
  .factory('FinanceFactory', () => {
  	var account = {
      cost: 0,
      revenue: 0,
      profit: 0
  	};
  	return { 
  		UpdateCost: function(){
  		},
  		UpdateRevenue: function(){
  		},
      ReturnProfit: function(){
        return account.profit;
      }
    }
  });