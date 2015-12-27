angular.module('annes', ['ngAnimate', 'ui.router', 'annes.controllers', 'annes.services'])

.directive('action-menu', [function actionMenu(){
  var directive = {
    restrict: 'E',
    template: '<div class="circle_menu"><i class="zmdi zmdi-plus menu_btn"></i></div><div class="menu"><i class="zmdi {{page.icon}} menu_itm" ng-repeat="page in vm.pages" ng-click="vm.open(page.tpl)"></i></div>',
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
