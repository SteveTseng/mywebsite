$(document).ready( ()=> {
		$( ".header" )
		  .mouseenter(function() {
		  	$( "#1" ).append('<a href="https://www.facebook.com/stevetseng17"><img class="menu_items" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" height="40" width="40"></a>')
		  	$( "#2" ).append('<a href="https://github.com/SteveTseng"><img class="menu_items" src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" height="40" width="40"></a>')
		  	$( "#3" ).append('<a href="https://www.linkedin.com/in/steve-tseng-b5234237"><img class="menu_items" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" height="40" width="40"></a>')
		  	$( "#4" ).append('<h4 class="menu_items">Biography</h4>')
		  	$( "#5" ).append('<h4 class="menu_items">Engineering</h4>')
		  	$( "#6" ).append('<h4 class="menu_items">Contact</h4>')
		  })
		  .mouseleave(function(){
		  	$(".header").find('.menu_items').remove()
		  });

		var visible = false;
		var htmlCssJs = false;

	  	$(window).on('scroll',function() {
	    var scrolltop = $(this).scrollTop();
	    if(scrolltop >= 5) {
	    	if(!htmlCssJs){
	      	$('nav').find('ul').append('<li><img src="./img/html.png" height="75" width="75"></li>');
	      	$('nav').find('ul').append('<li><img src="./img/css3.svg" height="75" width="75"></li>');
	      	$('nav').find('ul').append('<li><img src="./img/javascript.png" height="75" width="55"></li>');
	    		htmlCssJs = true;
	      }
	    }
	    if(scrolltop > 500 && !visible){
	    	visible = true;
	    	$('nav').find('ul').append("<li><img id='angular' height='70' width='70' src='./img/angular.png'></li>")
	    } else if (scrolltop < 500){
	    	visible = false;
	    	$('#angular').remove();
	    }
	  	})
});


