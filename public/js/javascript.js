$(document).ready( ()=> {
		$( ".header" )
		  .mouseenter(function() {
		  	$( "#1" ).append('<a href="https://www.facebook.com/stevetseng17"><img class="menu_items" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" height="40" width="40"></a>')
		  	$( "#2" ).append('<a href="https://github.com/SteveTseng"><img class="menu_items" src="http://image.flaticon.com/icons/svg/25/25231.svg" height="40" width="40"></a>')
		  	$( "#3" ).append('<a href="https://www.linkedin.com/in/steve-tseng-b5234237"><img class="menu_items" src="http://icons.iconarchive.com/icons/sicons/basic-round-social/512/linkedin-icon.png" height="40" width="40"></a>')
		  	$( "#4" ).append('<h4 class="menu_items">Biography</h4>')
		  	$( "#5" ).append('<h4 class="menu_items">Engineering</h4>')
		  	$( "#6" ).append('<h4 class="menu_items">Contact</h4>')
		  })
		  .mouseleave(function(){
		  	$(".header").find('.menu_items').remove()
		  });


	  $(window).on('scroll',function() {
	    var scrolltop = $(this).scrollTop();
	    if(scrolltop >= 0) {
	      $('nav').fadeIn(250);
	    }
	    else if(scrolltop <= 210) {
	      $('nav').fadeOut(250);
	    }
	  });
});

