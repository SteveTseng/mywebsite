$(document).ready(function(){

	// carousel
	$("span").click(function() {
		$( ".intro" ).addClass('animated fadeOutLeft');

		$( ".picture" ).addClass('animated fadeOutLeft');
	});


	//skills
	$('.show').click(function(){
		$( ".skills p" ).css({
			position: 'relative'
		}).animate({ "left": "-500px", "top":"-10"}, "slow");

		$( ".skills .show" ).remove();

			var array = [
				'<img class="frontEnd animated bounceIn" src="circle.gif">',
				'<img class="backEnd animated bounceIn" src="circle.gif">',
				'<img class="fullStack animated bounceIn" src="circle.gif">'
			];

			for(var i = 0; i < array.length; i++){
				duplicate(array[i]);
			}

		function duplicate(arrayElement){
			var element = arrayElement;
			$(".skills .container").append(function(element) {
				var template = $(
					'<div class="col-md-4">'+ arrayElement +'</div>'
				);
				return template.click(appending);
			});
		}

		function appending() {
			var choiceInStringForm = $(this).find('img').attr('class');
			$(".skills .container").empty();
			
		}

	});
});