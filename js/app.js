angular.module('annes', ['ngAnimate'])
  .constant('TweenMax', TweenMax)
  .controller('MainCtrl', function ($scope, Products) {
    $scope.products = Products.all();
    $scope.currentProductIdx = 0;
    $scope.currentProduct = $scope.products[$scope.currentProductIdx];
    $scope.currentState = 'productDetail';
    $scope.fullImageView = false;
    $scope.currentImage = '';
    $scope.nextImage = '';
    $scope.prevImage = '';

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
      len = $scope.currentProduct.images.length;
      current = $scope.currentImage = idx;
      prev = (idx - 1 < 0) ? len - 1 : idx - 1;
      next = (idx + 1 > (len - 1)) ? 0 : idx + 1;
      
      $scope.nextImage = next;
      $scope.prevImage = prev;

      $scope.currentProduct.images[current].current = true;
      $scope.currentProduct.images[prev].prev = true;
      $scope.currentProduct.images[next].next = true;
    }

    function resetImages(){
      var len = $scope.currentProduct.images.length;
      for (var i = 0; i < len; i++) {
        $scope.currentProduct.images[i].current = false;
        $scope.currentProduct.images[i].prev = false;
        $scope.currentProduct.images[i].next = false;
      };
    }
  })
  .factory('Products', ['$http', function($http){
    var products = [
      {
        "name" : "Mataulo",
        "desc" : "Mataulo hayo sasa consectetur adipisicing elit. Dicta aliquam alias, odit, ex odio quae fugiat, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quae.",
        "images"  : [
          {
            "src" : "img/towel.jpg",
            "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
          },
          {
            "src" : "img/towel4.jpg",
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
            "src" : "img/towel6.jpg",
            "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
          },
          {
            "src" : "img/towel7.jpg",
            "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
          }
        ]
      },
      {
        "name" : "Mashuka",
        "desc" : "Kwa upande wa mashuka, dicta aliquam alias, odit, ex odio quae fugiat, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quae.",
        "images"  : [
          {
            "src" : "img/bed3.jpg",
            "caption" : "consectetur adipisicing elit. Dicta aliquam alias"
          }
        ]
      },
      {
        "name" : "Foronya",
        "desc" : "Ukiona fornya zetu, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quae.",
        "images"  : [
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
        ]
      }
    ];
    return{
      all : function(){
        return products
      }
    };
  }]);