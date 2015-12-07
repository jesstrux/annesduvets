$(document).ready(function(){
	$('.tooltipped').tooltip({delay: 50});
	
	TweenMax.staggerFrom(".parallelogram", 1, {y:-100, delay: 0.5}, 0.4);
	// TweenMax.to("#share-button", 1, {scale:1, opacity:1, delay: 1});
	// TweenMax.from("#home-link", 1, {scale:0, opacity:0, delay: 1});

	// showProducts();

	var previewing = false;
	var color;

	$('.parallelogram .btn').click(function(){
		previewing = true;

		$('#details').css({'z-index':2, opacity: 1, width: 100+'%'}).attr('class', '');

		var classList = $(this).parents('.parallelogram').attr('class').split(/\s+/);
		
		$.each(classList, function(index, item) {
		    if (item === 'parallelogram') {
		        //do nothing
		    }else{
		    	$('#details').addClass(item);
		    }
		});
		
		$('#details').classList = '';
		$('#details .jura').addClass(color);
		$('#top-banner').addClass(color);
		$('#top-banner .section-head').addClass(color+'-text');
		
		// SETTING UP FOR #THECOOLMDEFFECT
		$(this).parents('.parallelogram').addClass('open').find('.desc').addClass('this-desc');
		var el = $(this).parents('.parallelogram');
		var left = el.position().left, w = el.css('width');

		var header = $(this).parents('.parallelogram').find('.section-head').text();
		var para = $(this).parents('.parallelogram').find('p').text();

		$(".jura h4").text(header);
		$(".jura p").text(para);

		// #THECOOLMDEFFECT
		TweenMax.from("#details", 1, {x:left, width:w, ease: Expo.easeOut});
		// TweenMax.staggerFrom(".jura img", 0.5, {opacity:0, scale: 0.9, delay : 0.4}, 0.4);
		TweenMax.from(".card", .6, {opacity:0, y:100, delay: .5});
		TweenMax.from("#details .section-head", 1, {opacity: 0, x:150});
		// TweenMax.from("p.flow-text", .7, {opacity: 0, y:50, delay: .5});
		TweenMax.from(".jura h4", 1, {opacity: 0 ,x:-50, delay: 0.6}, 0.4);
		// TweenMax.from(".jura p", 1, {opacity: 0 , x:100, delay : 0.4}, 0.4);
		TweenMax.staggerFrom(".jura .card-content", 1, {scale: 0.9, rotate: 30, delay: 1}, 0.4);
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
		TweenMax.to(".this-desc", .1, {opacity:1});
		TweenMax.staggerFrom(".this-desc .section-head, .this-desc p", .5, {y:50}, 0.1);
		TweenMax.from(".this-desc .btn", .5, {scale:1.1, opacity: 0});

		// CLEANING UP AFTER MYSELF
		TweenMax.to("#details", .001, {x:0, width:100+'%', 'z-index':0, opacity: 0, delay: .1, ease: Expo.easeOut});
		$('.parallelogram.open').removeClass('open');
		$('.this-desc').removeClass('this-desc');

		$('#details .jura').removeClass(color);
		$('#top-banner').removeClass(color);
		$('#top-banner .section-head').removeClass(color+'-text');

		previewing = false;
	}

	// $(document).on('click', '#showImages', function(){
	// 	$(this).prop('id', 'hideImages');
	// 	$(this).find('i').removeClass('zmdi-image').addClass('zmdi-info');
	// 	$('.la-card .card-content.textual').addClass('zoomOut');
	// 	$('.la-card .card-content.imagery').removeClass('fadeOutRight').addClass('fadeInRight');

	// 	TweenMax.staggerFrom(".card-content.imagery .col", 1, {scale: 0.9, rotate: 30, delay : .8}, 0.1);
	// });

	// $(document).on('click', '#hideImages', function(){
	// 	$(this).prop('id', 'showImages');
	// 	$(this).find('i').removeClass('zmdi-info').addClass('zmdi-image');
	// 	$('.la-card .card-content.textual').removeClass('zoomOut').addClass('zoomIn');
	// 	$('.la-card .card-content.imagery').addClass('fadeOutRight');
	// });

	// $(document).on('click', '.card-content.imagery .col', function(e){
	// 	var startX = e.clientX - e.offsetX;
	// 	var startY = e.clientY - e.offsetY;

	// 	console.log(e.offsetX + ' ,' + e.offsetY);
	// 	console.log(startX + ' , ' + startY);
	// 	// var startX = e.clientX - $('.card-content .row').position().left;
	// 	// var startY = e.clientY - $('.card-content .row').position().top;

	// 	$('.imagery').find('.row').css({'opacity': 0});
	// 	// $(".image-viewer").css({display: 'block'});
	// 	TweenMax.to(".image-viewer", .5, {scale:1});
	// });

	// $(document).on('click', '.image-viewer', function(){
	// 	$('.imagery').find('.row').animate({'opacity': 1});
	// 	// TweenMax.to(".image-viewer", .5, {scale:1});
	// 	TweenMax.to(".image-viewer", .5, {scale:0});
	// 	// $(this).removeClass('to-scale').css({'z-index': 1});
	// });
});

function showProducts(){
	// $('body').addClass('showing-products');
	// $('.extras p').slideDown(1000);
}