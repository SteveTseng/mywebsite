$(document).ready(function() {

	// carousel
	$("span").click(function() {
		$( ".intro" ).addClass('animated fadeOutLeft');
		$( ".picture" ).addClass('animated fadeOutLeft');
	});

		//setInterval(function(){
			$('.show').addClass('animated bounce').css({
				'-webkit-animation-duration': '1.75s',
				'-webkit-animation-delay': '1s',
				'-webkit-animation-iteration-count': 'infinite'
			});
		//},3000);
	
	//skills
	$('.show').click(function() {
		$( ".skills p" ).css({
			position: 'relative'
		}).animate({ "left": "-500px", "top":"50"}, "slow");


	
		$( ".skills .show" ).remove();

		function layout() {
			$(".skills .container").empty();
			$( ".skills p" ).empty();
			$( ".skills p" ).append('Skills ').animate({ "left": "-500px", "top":"50"}, "slow");

			var array = [
				'<div class="frontEnd animated bounceIn">Front End</div>',
				'<div class="backEnd animated bounceIn">Back End</div>',
				'<div class="fullStack animated bounceIn">Full Stack</div>'
			];

			for(var i = 0; i < array.length; i++) {
				duplicate(array[i]);
			}
		}

		layout();

		function duplicate(arrayElement) {
			var element = arrayElement;
			$(".skills .container").append(function(element) {
				var template = $(
					'<div class="col-md-4">'+ arrayElement +'</div>'
				);
				return template.click(appending);
			});
		}

		function appending() {
			var choiceInStringForm = $(this).find('div').attr('class');
			$(".skills .container").empty();

			if(choiceInStringForm == 'frontEnd animated bounceIn') {
				frontEnd();
			} else if (choiceInStringForm == 'backEnd animated bounceIn') {
				backEnd();
			} else if (choiceInStringForm == 'fullStack animated bounceIn') {
				fullStack();
			}
		}

		function frontEnd() {
			var template = $(
					'<div class="row">'+
						'<div class="col-md-2">'+
							'<h3>Basics</h3>'+
							'<ul>'+
								'<li>HTML</li>'+
								'<li>CSS</li>'+
								'<li>AJAX</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Preprocessors</h3>'+
							'<ul>'+
								'<li>Sass</li>'+
								'<li>Less</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Language</h3>'+
							'<ul>'+
								'<li>Javascript</li>'+
							'</ul>'+
							'<h3>Framework</h3>'+
							'<ul>'+
								'<li>jQuery</li>'+
								'<li>Angular.js</li>'+
								'<li>React.js</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Task Runner</h3>'+
							'<ul>'+
								'<li>Grunt</li>'+
								'<li>Gulp</li>'+
								'<li>Webpack</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Test</h3>'+
							'<ul>'+
								'<li>Chai</li>'+
								'<li>Mocha</li>'+
								'<li>Jasmine</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Package Manager</h3>'+
							'<ul>'+
								'<li>NPM</li>'+
								'<li>Bower</li>'+
							'</ul>'+
						'</div>'+
					'</div>'
				);

			$(".skills .container").append(template).addClass('animated zoomIn');

			$(".skills p").animate({"left": "-300px", "top":"50"}, "fast").prepend('Front End ').addClass('animated zoomIn');

			$(".skills .container").append(function() {
				var button = $('<button class="btn btn-primary">Back</button>');
					return button.click(layout);
			});
		}

		function backEnd() {
			var template = $(
					'<div class="row">'+
						'<div class="col-md-2">'+
							'<h3>Language</h3>'+
							'<ul>'+
								'<li>Javascript</li>'+
								'<li>PHP</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Framework</h3>'+
							'<ul>'+
								'<li>Laravel</li>'+
								'<li>Node.js</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>CMS</h3>'+
							'<ul>'+
								'<li>Wordpress</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Middleware</h3>'+
							'<ul>'+
								'<li>Express</li>'+
								'<li>Slim</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Database</h3>'+
							'<ul>'+
								'<li>MySQL</li>'+
								'<li>PostgreSQL</li>'+
								'<li>MongoDB</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<h3>Security</h3>'+
							'<ul>'+
								'<li>Bcrypt</li>'+
								'<li>OAuth</li>'+
							'</ul>'+
						'</div>'+
					'</div>'
				);

			$(".skills .container").append(template).addClass('animated zoomIn');
			$(".skills p").animate({"left": "-300px", "top":"50"}, "fast").prepend('Back End ').addClass('animated zoomIn');
			$(".skills .container").append(function() {
				var button = $('<button class="btn btn-primary">Back</button>');
					return button.click(layout);
			});
		}

		function fullStack() {
			var template = $(
					'<div class="row">'+
						'<div class="col-md-6">'+
							'<h1>LAMP Stack</h1>'+
							'<ul>'+
								'<li>Linux</li>'+
								'<li>Apache</li>'+
								'<li>MySQL</li>'+
								'<li>PHP</li>'+
							'</ul>'+
						'</div>'+
						'<div class="col-md-6">'+
							'<h1>MEAN Stack</h1>'+
							'<ul>'+
								'<li>MongoDB</li>'+
								'<li>Express</li>'+
								'<li>Angular</li>'+
								'<li>Node</li>'+
							'</ul>'+
						'</div>'+
					'</div>'
				);

			$(".skills .container").append(template).addClass('animated zoomIn');
			$(".skills p").animate({"left": "-300px", "top":"50"}, "fast").prepend('Full Stack ').addClass('animated zoomIn');
			$(".skills .container").append(function() {
				var button = $('<button class="btn btn-primary">Back</button>');
					return button.click(layout);
			});
		}

	});
});