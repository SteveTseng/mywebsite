function configFunction(a,b){a.when("/",{templateUrl:"./partials/home.html",controller:"HomeController"}).when("/product",{templateUrl:"./partials/product_development.html",controller:"product_developmentController"}).when("/process",{templateUrl:"./partials/process_development.html",controller:"process_developmentController"}).when("/quality",{templateUrl:"./partials/quality.html",controller:"qualityController"}).when("/market",{templateUrl:"./partials/market.html",controller:"marketController"}).otherwise({redirectTo:"/"})}function HomeController(a){a.productPath="index.html#/product"}function marketController(a,b,c,d){a.setPrice=0,a.financeData=c.ReturnAccountInfo(),a.choiceData=b.ReturnChoice(),a.conversionRate=0,a.profit=0,a.revenueUpdate=function(){a.revenue=a.choiceData.soldQuantity*a.setPrice,c.UpdateRevenue(a.revenue),a.priceDifference=a.setPrice-15,a.priceDifference>=0?(a.priceImpact=.4*(1-a.priceDifference*a.priceDifference/15),a.priceImpact<=0&&(a.priceImpact=0)):a.priceDifference<0&&(a.priceImpact=.4*(1+a.priceDifference*-1/15),a.priceImpact>1&&(a.priceImpact=1)),a.conversionRate=a.choiceData.qualityControlImpact*a.priceImpact,a.prototypeCost=0,a.manufacturingCost=0,"prototype"==a.financeData.cost[1].name&&(a.prototypeCost=a.financeData.cost[1].amount),"manufacturing"==a.financeData.cost[2].name&&(a.manufacturingCost=a.financeData.cost[2].amount),a.revenue=a.choiceData.soldQuantity*a.setPrice*a.conversionRate,a.profit=a.revenue+a.prototypeCost+a.manufacturingCost,c.UpdateCost({name:"revenue",amount:a.revenue})},a.submitScore=function(){a.firebase=firebase.database().ref(),$userRef=a.firebase.child("users"),a.userInfo={name:a.name,email:a.email,profit:a.profit},$userRef.push(a.userInfo),a.name="",a.email=""}}function process_developmentController(a,b,c,d){function e(){a.video.first=c.trustAsResourceUrl(a.manufacturingProcesses[0].url),a.video.second=c.trustAsResourceUrl(a.manufacturingProcesses[1].url),a.upfrontCost1=a.manufacturingProcesses[0].upfrontCost,a.costPerUnit1=a.manufacturingProcesses[0].costPerUnit,a.upfrontCost2=a.manufacturingProcesses[1].upfrontCost,a.costPerUnit2=a.manufacturingProcesses[1].costPerUnit}function f(){a.video.first=c.trustAsResourceUrl(a.manufacturingProcesses[2].url),a.video.second=c.trustAsResourceUrl(a.manufacturingProcesses[3].url),a.upfrontCost1=a.manufacturingProcesses[2].upfrontCost,a.costPerUnit1=a.manufacturingProcesses[2].costPerUnit,a.upfrontCost2=a.manufacturingProcesses[3].upfrontCost,a.costPerUnit2=a.manufacturingProcesses[3].costPerUnit}a.choice=b.ReturnChoice().choice,a.upfrontCost1=0,a.costPerUnit1=0,a.upfrontCost2=0,a.costPerUnit2=0,a.qualityPath="index.html#/quality",a.manufacturingProcesses=[{id:1,material:"plastic",description:"3D Printing",url:"https://www.youtube.com/embed/Z-vkte46rLY",upfrontCost:0,costPerUnit:5},{id:2,material:"plastic",description:"Injection Molding",url:"https://www.youtube.com/embed/cpOwXZiHi0o",upfrontCost:3e4,costPerUnit:.5},{id:3,material:"steel",description:"Sheet Metal Forming (Non-Welded)",url:"https://www.youtube.com/embed/eeSl2lXzpW4",upfrontCost:1e4,costPerUnit:1.1},{id:4,material:"steel",description:"Sheet Metal Forming (Welded)",url:"https://www.youtube.com/embed/c-6Niu-Jbps",upfrontCost:8e3,costPerUnit:.75}],a.video={first:"",second:""},"plastic"==a.choice&&e(),"metal"==a.choice&&f(),a.quantity=0,a.one=1,a.two=2,a.select=0,a.selectProcess=function(b){1==b&&("plastic"==a.choice&&(a.select=a.manufacturingProcesses[0].costPerUnit,a.selectedUpfrontCost=a.manufacturingProcesses[0].upfrontCost),"metal"==a.choice&&(a.select=a.manufacturingProcesses[2].costPerUnit,a.selectedUpfrontCost=a.manufacturingProcesses[2].upfrontCost)),2==b&&("plastic"==a.choice&&(a.select=a.manufacturingProcesses[1].costPerUnit,a.selectedUpfrontCost=a.manufacturingProcesses[1].upfrontCost),"metal"==a.choice&&(a.select=a.manufacturingProcesses[3].costPerUnit,a.selectedUpfrontCost=a.manufacturingProcesses[0].upfrontCost))},a.updateQuantity=function(){a.total=a.quantity*a.select+a.selectedUpfrontCost,d.UpdateCost({name:"manufacturing",amount:-1*a.total}),b.QuantityChoice(a.quantity)}}function product_developmentController(a,b,c,d,e){a.placeHolder=0,a.fireData=[],a.myData=firebase.database().ref(),a.myData.once("value",function(b){a.materials=b.val().material,a.fireLinks=b.val().links}),a.manufacturingPath="index.html#/process",a.resultsActivate=function(){a.displayMaterials=a.materials},a.chosenMaterial=null,a.select=function(b){a.chosenMaterial=b,a.choice=a.chosenMaterial.name+" "+a.chosenMaterial.type+" $"+a.chosenMaterial.cost+" "+a.chosenMaterial.strength,a.displayMaterials=[],a.setSpecs(),a.cost()},a.displayMaterials=[],a.cost=function(){c.UpdateCost({name:"prototype",amount:-1*a.chosenMaterial.cost})},a.setSpecs=function(){b.MakeChoice(a.chosenMaterial.type,a.diameter,a.thickness,a.cylinderHeight)},a.specsLink=function(){var b=function(){angular.forEach(a.fireLinks,function(b,c){var e=b,f={diameter:a.diameter,thickness:a.thickness,cylinderHeight:a.cylinderHeight};a.diameter&&a.thickness&&a.cylinderHeight&&specsRounding(f),e.diameter==f.diameter&&e.thickness==f.thickness&&e.height==f.cylinderHeight&&(a.link=d.trustAsResourceUrl("https://www.3dcontentcentral.com/external-site-embed.aspx?format=3D&catalogid=171&modelid="+e.url+"&width=250&height=250&edraw=true"))})};specsRounding=function(b){return a.diameter<=6?b.diameter=6:a.diameter>=18?b.diameter=18:b.diameter=12,a.thickness<=.02?b.thickness=.02:a.thickness>=.2?b.thickness=.2:b.thickness=.0925,a.cylinderHeight<=12?b.cylinderHeight=12:a.cylinderHeight>=24?b.cylinderHeight=24:b.cylinderHeight=18,b},e(b,1e3)}}function qualityController(a,b){a.dataObj=b.ReturnChoice(),a.quantity=a.dataObj.quantity,a.scrapRate=0,a.marketPath="index.html#/market",a.qualityControlLevels=[{id:1,level:"strict"},{id:2,level:"tight"},{id:3,level:"loose"}],a.tolerance="Not Yet Chosen",a.manufacturingAnalysis="TBD","plastic"==a.dataObj.choice&&(a.dataObj.thickness>=.045&&a.dataObj.thickness<=.14?(a.manufacturingAnalysis="dimension pass",a.scrapRate+=.05):a.dataObj.thickness<.045?(a.manufacturingAnalysis="too thin",a.scrapRate+=.7):a.dataObj.thickness>.14&&(a.manufacturingAnalysis="too thick, will warp",a.scrapRate+=.6)),a.temp=a.scrapRate,a.trashUnits=0,a.acceptedUnits=0,a.toleranceFunction=function(){"strict"==a.tolerance.level?(a.temp=1.4*a.scrapRate,b.QualityChoice(1)):"tight"==a.tolerance.level?(a.temp=1.15*a.scrapRate,b.QualityChoice(.95)):"loose"==a.tolerance.level&&(a.temp=1.05*a.scrapRate,b.QualityChoice(.9)),a.temp>1&&(a.temp=1),a.trashUnits=a.temp*a.quantity,a.acceptedUnits=a.quantity-a.trashUnits},a.sellingFunction=function(){b.SellingChoice(a.acceptedUnits)}}configFunction.$inject=["$routeProvider","$locationProvider"];var app=angular.module("myApp",["firebase","ngRoute","Steve.HomeController","Steve.product_developmentController","Steve.process_developmentController","Steve.ChoiceFactory","Steve.qualityController","Steve.FinanceFactory","Steve.marketController","Steve.ScoreBoardFactory"]);app.config(configFunction),app.directive("material",function(){return{restrict:"E",template:'<div class="result">{{material.name}} {{material.type}} {{material.cost | currency}} {{material.strength}}</div>'}}),app.filter("percentage",["$filter",function(a){return function(b,c){return a("number")(100*b,c)+"%"}}]),app.controller("monitorCtrl",["$scope","ChoiceFactory","$interval","FinanceFactory","ScoreBoardFactory","$timeout",function(a,b,c,d,e,f){a.items=[],c(function(){a.total=0,a.items=d.ReturnAccountInfo().cost;for(var b=0;b<a.items.length;b++)a.total+=a.items[b].amount},1e3)}]),app.controller("scoreboardCtrl",["$scope","$timeout",function(a,b){a.firebase=firebase.database().ref(),a.temp={},a.users=[],a.displaySnapshot=function(b,c){a.temp=b.val(),a.users.push(a.temp)},a.firebase.on("child_added",a.displaySnapshot)}]),angular.module("Steve.ChoiceFactory",[]).factory("ChoiceFactory",function(){var a={diameter:0,thickness:0,cylinderHeight:0,choice:"",quantity:0,soldQuantity:100,qualityControlImpact:1};return{MakeChoice:function(b,c,d,e){a.choice=b,a.diameter=c,a.thickness=d,a.cylinderHeight=e},QuantityChoice:function(b){a.quantity=b},QualityChoice:function(b){a.qualityControlImpact=b},SellingChoice:function(b){a.soldQuantity=b},ReturnChoice:function(){return a}}}),angular.module("Steve.FinanceFactory",[]).factory("FinanceFactory",function(){var a={cost:[{name:"Investment",amount:5e4}],revenue:0,profit:0};return{UpdateCost:function(b){for(var c=!1,d=0;d<a.cost.length;d++)a.cost[d].name==b.name&&(a.cost[d].amount=b.amount,c=!0);0==c&&a.cost.push(b)},UpdateRevenue:function(b){a.revenue=b},ReturnAccountInfo:function(){return a}}}),angular.module("Steve.ScoreBoardFactory",[]).factory("ScoreBoardFactory",function(){var a=[{name:"Steve",score:5e4}];return{addUser:function(b){a.push({name:b.name,score:b.score})},returnUser:function(){return a}}}),angular.module("Steve.HomeController",["ngRoute"]).controller("HomeController",["$scope",HomeController]),angular.module("Steve.marketController",["ngRoute"]).controller("marketController",["$scope","ChoiceFactory","FinanceFactory","ScoreBoardFactory",marketController]),angular.module("Steve.process_developmentController",["ngRoute"]).controller("process_developmentController",["$scope","ChoiceFactory","$sce","FinanceFactory",process_developmentController]),angular.module("Steve.product_developmentController",["ngRoute"]).controller("product_developmentController",["$scope","ChoiceFactory","FinanceFactory","$sce","$timeout",product_developmentController]),angular.module("Steve.qualityController",["ngRoute"]).controller("qualityController",["$scope","ChoiceFactory",qualityController]),$(document).ready(function(){$(".header").mouseenter(function(){$("#1").append('<a href="https://www.facebook.com/stevetseng17"><img class="menu_items" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" height="40" width="40"></a>'),$("#2").append('<a href="https://github.com/SteveTseng"><img class="menu_items" src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" height="40" width="40"></a>'),$("#3").append('<a href="https://www.linkedin.com/in/steve-tseng-b5234237"><img class="menu_items" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" height="40" width="40"></a>'),$("#4").append('<h4 class="menu_items">Biography</h4>'),$("#5").append('<h4 class="menu_items">Engineering</h4>'),$("#6").append('<h4 class="menu_items">Contact</h4>')}).mouseleave(function(){$(".header").find(".menu_items").remove()});var a=!1,b=!1;$(window).on("scroll",function(){var c=$(this).scrollTop();c>=5&&(b||($("nav").find("ul").append('<li><img src="./img/html.png" height="75" width="75"></li>'),$("nav").find("ul").append('<li><img src="./img/css3.svg" height="75" width="75"></li>'),$("nav").find("ul").append('<li><img src="./img/javascript.png" height="75" width="55"></li>'),b=!0)),c>500&&!a?(a=!0,$("nav").find("ul").append("<li><img id='angular' height='70' width='70' src='./img/angular.png'></li>")):c<500&&(a=!1,$("#angular").remove())})});