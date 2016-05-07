angular.module('annes.controllers', [])

.controller('ParentCtrl', function($scope, $timeout){
  $scope.openProduct = true;
})

.controller('MainCtrl', function($scope, $location, $state, $timeout){
  TweenMax.from(".main-header", 1.2, {opacity:0, x:10});
  TweenMax.from(".motto", 1.2, {opacity:0, x:-40, delay:0.2});
})

.controller('ProductsCtrl', function($scope, $myConfigs, Products){
  $scope.products = Products.all();
  var configs = $myConfigs.get();
  $scope.openProduct = configs.openProduct;
  
  if(!$scope.openProduct)
    TweenMax.staggerFrom(".parallelogram", 1.2, {y:-80}, 0.4);
  else{
    TweenMax.from(".parallelogram:nth("+$scope.openProduct+") img", .8, {y:-34, ease: Back.easeOut});
    TweenMax.staggerFrom(".parallelogram:nth("+$scope.openProduct+") .desc .section-head, .parallelogram:nth("+$scope.openProduct+") .desc p", .5, {y:50}, 0.1);
    TweenMax.from(".parallelogram:nth("+$scope.openProduct+") .desc .btn", .5, {scale:1.1, opacity: 0});
  }

  var newConfigs = {
    openProduct : false
  }

  $myConfigs.set(newConfigs);

  $('.parallelogram .btn').click(function(){
      var classList = $(this).parents('.parallelogram').attr('class').split(/\s+/);
      $.each(classList, function(index, item) {
        if (item === 'parallelogram') {
            //do nothing
        }else{
          $('#details').addClass(item);
        }
      });

      $(this).parents('.parallelogram').addClass('open').find('.desc').addClass('this-desc');
      var el = $(this).parents('.parallelogram');
      var left = el.position().left + 120, w = el.css('width');
      $('.action-buttons a:first, .action-buttons a:last').css({opacity:1,'z-index':0});
  });
})

.controller('DetailsCtrl', function ($scope, $timeout, $state, $stateParams, $myConfigs, Products, Gallery) {
  $scope.products = Products.all();
  $scope.gallery = Gallery.all();
  $scope.currentProductIdx = $stateParams.pid;

  if(!$stateParams.pid && !$stateParams.pid === 0)
    $state.go('productsMain');

  $scope.currentProduct = $scope.products[$scope.currentProductIdx];
  $scope.currentState = 'productDetail';
  $scope.fullImageView = false;
  $scope.currentImage = '';
  $scope.nextImage = '';
  $scope.prevImage = '';
  $scope.bgClass = $scope.currentProduct.bg_class;
  $scope.btnClass = $scope.currentProduct.btn_class;

  var newConfigs = {
    openProduct : $scope.currentProductIdx
  }

  $myConfigs.set(newConfigs);

  var left = parseFloat(100 + parseFloat(394.188 * $scope.currentProductIdx))+'px';
  var w    = 394.188+'px';

  $('.action-buttons a:first, .action-buttons a:last').css({'z-index':0});
  $timeout(function(){
    $('.action-buttons a:first, .action-buttons a:last').css({opacity:1});
    TweenMax.from(".action-buttons a:first", .2, {opacity:0, y:170+'%', delay:1.3});
    TweenMax.from(".action-buttons a:last", .2, {opacity:0, y:-170+'%', delay:1.3});
  },350);

  TweenMax.from("#details", 1, {x:left, width:w, ease: Expo.easeOut});

  $timeout(function(){
    TweenMax.to(".textual", .5, {display:'block'});
    TweenMax.from(".textual", .5, {scale:0.8, y:20, delay : 0.1});
    TweenMax.from(".product-image", 2.5, {opacity:0, delay : 1});
    TweenMax.from(".product-details .section-head", 1, {opacity: 0, x:40, delay : 1.2});
    TweenMax.from(".product-details p", 1, {opacity: 0 , x:30, delay : 1.2});
  }, 700);

  $timeout(function(){
    TweenMax.from("#top-banner", .5, {y:-100+'%',opacity:0, delay:.8});
    TweenMax.staggerTo("#back-button", .5, {opacity:1, delay:1});
    TweenMax.to("#actionButton", .5, {opacity:1, 'z-index' : 1, delay:1.3});
  },1);

  $scope.actionButtonClick = function(){
    if($scope.currentState === 'productDetail')
      $scope.currentState = 'productImages';
    else if($scope.currentState === 'productImages')
      $scope.currentState = 'productDetail';
    else if($scope.currentState === 'previewingImages'){
      $scope.currentState = 'productImages';
      $scope.fullImageView = false;
    }
  }

  $scope.prevButtonClick = function(){
    TweenMax.from(".product-details", .7, {y:-30, ease: Back.easeOut});
    // TweenMax.from(".product-image", .8, {x:10,opacity:0.7});
    if($scope.currentState === 'previewingImages'){
      setImages($scope.prevImage);
    }
    else{
      // $scope.currentState = 'productDetail';
      var idx = $scope.currentProductIdx;
      $scope.currentProductIdx = ( idx === 0 ) ? $scope.products.length - 1 : idx - 1; 
      $scope.currentProduct = $scope.products[$scope.currentProductIdx];
      $scope.bgClass = $scope.currentProduct.bg_class;
      var newConfigs = {openProduct : $scope.currentProductIdx}
      $myConfigs.set(newConfigs);
    }
  }

  $scope.nextButtonClick = function(){
    TweenMax.from(".product-details", .6, {y:50});
    // TweenMax.from(".product-image", .8, {x:-10,opacity:0.7});

    if($scope.currentState === 'previewingImages'){
      setImages($scope.nextImage);
    }
    else{
      // $scope.currentState = 'productDetail';
      var idx = $scope.currentProductIdx;
      $scope.currentProductIdx = ( idx === $scope.products.length - 1 ) ? 0 : idx + 1; 
      $scope.currentProduct = $scope.products[$scope.currentProductIdx];
      $scope.bgClass = $scope.currentProduct.bg_class;
      var newConfigs = {openProduct : $scope.currentProductIdx}
      $myConfigs.set(newConfigs);
    }
  }

  $scope.preview = function(idx){
    setImages(idx);
    $scope.currentState = 'previewingImages';
  }

  $scope.galleryImageClick = function(img){
    if(img.current)
      $scope.fullImageView = !$scope.fullImageView;
    else if(img.next)
      setImages($scope.nextImage);
    else if(img.prev)
      setImages($scope.prevImage);
  }

  function setImages(idx){
    resetImages();

    var current, prev, next, len;
    len = $scope.gallery.length;
    current = $scope.currentImage = idx;
    prev = (idx - 1 < 0) ? len - 1 : idx - 1;
    next = (idx + 1 > (len - 1)) ? 0 : idx + 1;
    
    $scope.nextImage = next;
    $scope.prevImage = prev;

    $scope.gallery[current].current = true;
    $scope.gallery[prev].prev = true;
    $scope.gallery[next].next = true;
  }

  function resetImages(){
    var len = $scope.gallery.length;
    for (var i = 0; i < len; i++) {
      $scope.gallery[i].current = false;
      $scope.gallery[i].prev = false;
      $scope.gallery[i].next = false;
    };
  }
})