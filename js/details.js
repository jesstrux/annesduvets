function actionButtonClick(){
	var action = $('#actionButton').data('action');

	perFormAction(action);
	setActionButton(action);
}
function setActionButton(curAction){
	var next = {action : '', icon : ''};
	if(curAction === 'hideImages'){
		next.action = 'showImages';
		next.icon = 'zmdi zmdi-image';
	}
	else if(curAction === 'showImages'){
		next.action = 'hideImages';
		next.icon = 'zmdi zmdi-info';
	}
	else if(curAction === 'closeImagePreview'){
		next.action = 'hideImages';
		next.icon = 'zmdi zmdi-info';

		$('.action-buttons').removeClass('rotated');
		$('#nextImage').prop('id', 'nextBtn');
		$('#prevImage').prop('id', 'prevBtn');
	}

	// Called when a user previews an image
	else{
		next.action = 'closeImagePreview';
		next.icon = 'zmdi zmdi-close';

		$('.action-buttons').addClass('rotated');
		$('#nextBtn').prop('id', 'nextImage');
		$('#prevBtn').prop('id', 'prevImage');
	}

	$('#actionButton').data('action', next.action);
	$('#actionButton').find('i').prop('class', next.icon);
}
function perFormAction(action){
	if (action === 'showImages'){
		$('.la-card .card-content.textual').addClass('zoomOut');
		$('.la-card .card-content.imagery').removeClass('fadeOutRight').addClass('fadeInRight');
		TweenMax.staggerFrom(".card-content.imagery .col", 1, {scale: 0.9, rotate: 30, delay : .8}, 0.1);
	}
	else if (action === 'hideImages'){
		$(this).prop('id', 'showImages');
		$(this).find('i').removeClass('zmdi-info').addClass('zmdi-image');
		$('.la-card .card-content.textual').removeClass('zoomOut').addClass('zoomIn');
		$('.la-card .card-content.imagery').addClass('fadeOutRight');
	}
	else if(action === 'closeImagePreview'){
		$('.imagery').find('.row').animate({'opacity': 1});
		TweenMax.to(".image-viewer", .5, {scale:0});
	}
}

$(document).on('click', '#nextImage', function(){
	var nextimg = parseInt($('img.next').index() + 2);
	
	if(nextimg === 10)
		nextimg = 1;

	$('.imagery').find('img.prev').removeClass('prev');
	$('.imagery').find('img.current').removeClass('current').addClass('prev');
	$('.imagery').find('img.next').removeClass('next').addClass('current');
	$('.imagery img:nth-child('+nextimg+')').addClass('next');
});

$(document).on('click', '#prevImage', function(){
	var previmg = parseInt($('img.prev').index());
	
	if(previmg === 0)
		previmg = 9;

	$('.imagery').find('img.next').removeClass('next');
	$('.imagery').find('img.current').removeClass('current').addClass('next');
	$('.imagery').find('img.prev').removeClass('prev').addClass('current');
	$('.imagery img:nth-child('+previmg+')').addClass('prev');
});

$(document).on('click', '.card-content.imagery .col', function(e){
	$('.imagery').find('.row').css({'opacity': 0});
	var index = $(this).eq();
	index = index.context._gsTweenID;
	index = parseInt(index.substring(1) - 1);

	var imageRoll = 0;
	$(this).parents('.imagery').find('.col img').each(function(){
		var img = $('<img>');
		img.attr('src', $(this).attr('src'));

		var prev = index - 1;
			if(prev < 0)
				prev = 8;
		var next = index + 1;
			if(next > 8)
				next = 0;

		if (imageRoll == prev) {
			img.addClass('prev');
		}else if(imageRoll == index) {
			img.addClass('current');
		}else if(imageRoll === next){
			img.addClass('next');
		}

		imageRoll++;

		$(".image-viewer").append(img);
	});

	TweenMax.to(".image-viewer", .5, {scale:1});

	setActionButton(null);
});

$(document).on('click', '.image-viewer', function(){
	$('.imagery').find('.row').animate({'opacity': 1});
	TweenMax.to(".image-viewer", .5, {scale:0});

	setActionButton('closeImagePreview');
});