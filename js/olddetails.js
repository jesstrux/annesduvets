angular.module('annes', ['ngAnimate'])
  // .constant('TweenMax', TweenMax)
  .controller('DetailsCtrl', function ($scope, Products, Gallery) {
    $scope.products = Products.all();
    $scope.gallery = Gallery.all();
    $scope.currentProductIdx = 0;
    $scope.currentProduct = $scope.products[$scope.currentProductIdx];
    $scope.currentState = 'productDetail';
    $scope.fullImageView = false;
    $scope.currentImage = '';
    $scope.nextImage = '';
    $scope.prevImage = '';

    setTimeout(function(){
      TweenMax.from("#details", 2, {x:1180, width:400, ease: Expo.easeOut});
      TweenMax.from(".textual", .5, {scale:0.8, y:20, delay : 1});
      TweenMax.from(".product-details .section-head", 1, {opacity: 0, x:40, delay : 1.2});
      TweenMax.from(".product-details p", 1, {opacity: 0 , x:30, delay : 1.2});
      TweenMax.from(".product-image", 2.5, {opacity:0, delay : 1});
      TweenMax.to(".action-buttons, #back-button", .5, {opacity:1, delay:1});
    },20);

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
  .factory('Products', ['$http', function($http){
    var products = [
      {
        "name" : "Mataulo",
        "cover" : "img/towel-cover.jpg",
        "desc" : "Mataulo hayo sasa consectetur adipisicing elit. Dicta aliquam alias, odit, ex odio quae fugiat, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quae."
      },
      {
        "name" : "Mashuka",
        "cover" : "img/bed-cover2.jpg",
        "desc" : "Kwa upande wa mashuka, dicta aliquam alias, odit, ex odio quae fugiat, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quax odio quae fugiat, aperiam."
      },
      {
        "name" : "Foronya",
        "cover" : "img/pillow-cover.jpg",
        "desc" : "Ukiona foronya zetu, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quae rum deserunt facilis, pariatur veritatis, dolorum giat, aperiam molestiasty."
      }
    ];
    return{
      all : function(){
        return products
      }
    };
  }])
  .factory('Gallery', ['$http', function($http){
    var images = [
      {
        "src" : "img/towel.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/towel6.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/towel3.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/towel5.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/bed1.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/bed2.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/towel7.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/pillow2.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/pillow.jpg",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      },
      {
        "src" : "img/pillow3.png",
        "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
      }
    ];
    return{
      all : function(){
        return images;
      }
    };
  }]);