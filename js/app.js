angular.module('annes', ['ngAnimate', 'ui.router', 'annes.controllers', 'annes.services'])

.directive('actionMenu', [function(){
  var directive = {
    restrict: 'E',
    templateUrl: 'templates/menu.html',
    link: link
  };

  return directive;

  function link(scope, element, attrs) {
    element.on('click', toggle);

    function toggle() {
      element.toggleClass('open');
    }
  }
}])

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'MainCtrl'
    })

    .state('productsMain', {
        url: '/productsMain',
        templateUrl: 'templates/products-main.html',
        controller: 'ProductsCtrl'
    })

    .state('productsDetailed', {
        url: '/productsDetailed',
        params : { pid: null },
        templateUrl: 'templates/products-detailed.html',
        controller: 'DetailsCtrl'
    });

    $urlRouterProvider.otherwise('/');
});
