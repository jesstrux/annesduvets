angular.module('annes.services', [])  
  .factory('$myConfigs', [function(){
    var configs = {
      openProduct : false
    }

    return{
      get : function(){
        return configs;
      },
      set : function(newConfigs){
        configs = newConfigs;
        // alert('changes made' + configs.openProduct);
      }
    };
  }])
  .factory('Products', ['$http', function($http){
    var products = [
      {
        "name" : "Mashuka",
        "large" : "img/bed1.jpg",
        "cover" : "img/bed-cover2.jpg",
        "cover_trans" : "img/bed-home2.png",
        "bg_top_class" : "grey lighten-2",
        "bg_class" : "grey lighten-3 grey-text text-darken-2",
        "btn_class" : "grey",
        "desc" : "Kwa upande wa mashuka, dicta aliquam alias, odit, ex odio quae fugiat, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quax odio quae fugiat, aperiam."
      },
      {
        "name" : "Mataulo",
        "large" : "img/towel.jpg",
        "cover" : "img/towel-cover.jpg",
        "cover_trans" : "img/towel-home.png",
        "bg_top_class" : "grey lighten-3",
        "bg_class" : "grey lighten-5",
        "btn_class" : "light-blue lighten-1",
        "desc" : "Mataulo hayo sasa consectetur adipisicing elit. Dicta aliquam alias, odit, ex odio quae fugiat, aperiam molestias accusamus ipsam, a? Illo qui rerum deserunt facilis, pariatur veritatis, dolorum quae."
      },
      {
        "name" : "Foronya",
        "large" : "img/pillow.jpg",
        "cover" : "img/pillow-cover.jpg",
        "cover_trans" : "img/pillow-home.png",
        "bg_top_class" : "grey lighten-2",
        "bg_class" : "grey lighten-3 grey-text text-darken-2",
        "btn_class" : "light-green lighten-2",
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
      }
    ];
    return{
      all : function(){
        return images;
      }
    };
  }]);