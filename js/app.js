$(document).ready(function(){
	TweenMax.staggerFrom(".parallelogram", 1, {y:-100}, 0.4);

	showProducts();

	// $(window).scroll(function() {
	// 	$('#animatedElement').each(function(){
	// 	var imagePos = $(this).offset().top;

	// 	var topOfWindow = $(window).scrollTop();
	// 		if (imagePos < topOfWindow+400) {
	// 			$(this).addClass("slideUp");
	// 		}
	// 	});
	// });

	var previewing = false;

	$(window).on("navigate", function (event, data) {
	  var direction = data.state.direction;
	  alert(direction);
	  if (direction == 'back') {
	    // if(previewing){
	    	// event.preventDefault();
	    	return false;
	    	backToAllItems();
	    // }
	  }
	  if (direction == 'forward') {
	    // do something else
	  }
	});

	$('.parallelogram .btn').click(function(){
		previewing = true;

		$('#details').css({display:'block', width: 100+'%'}).attr('class', '');
		// $('#details').position({left:0, top: 0});

		var classList = $(this).parents('.parallelogram').attr('class').split(/\s+/);
		$.each(classList, function(index, item) {
		    if (item === 'parallelogram') {
		        //do nothing
		    }else{
		    	$('#details').addClass(item);
		    }
		});
		
		// SETTING UP FOR #THECOOLMDEFFECT
		$(this).parents('.parallelogram').addClass('open').find('.desc').addClass('this-desc');
		var el = $(this).parents('.parallelogram');
		var left = el.position().left, w = el.css('width');

		// #THECOOLMDEFFECT
		TweenMax.from("#details", 1, {x:left, width:w, ease: Expo.easeOut});
		$('#back-button').show();
	});

	$('#back-button').click(function(){
		// $('#details').hide();
		backToAllItems();
	});

	function backToAllItems(){
		var el = $('.parallelogram.open');
		var left = parseInt(el.position().left + 118), w = el.css('width');
		
		// RESTORING TO DEFAULT
		$('#back-button').hide();
		TweenMax.to("#details", 1.5, {x:left, width:w, ease: Expo.easeOut});
		TweenMax.from(".parallelogram.open img", 1, {y:-50, ease: Back.easeOut});
		TweenMax.to(".parallelogram.open img", 1, {opacity:1});
		TweenMax.to(".this-desc", .1, {opacity:1});
		TweenMax.staggerFrom(".this-desc .section-head, .this-desc p", .5, {y:50}, 0.1);
		TweenMax.from(".this-desc .btn", .5, {scale:1.1, opacity: 0});

		// CLEANING UP AFTER MYSELF
		TweenMax.to("#details", .001, {x:0, width:100+'%', delay: .1, display : 'none', ease: Expo.easeOut});
		$('.parallelogram.open').removeClass('open');
		$('.this-desc').removeClass('this-desc');

		previewing = false;
	}
});

function showProducts(){
	$('body').addClass('showing-products');
	$('.extras p').slideDown(1000);
}