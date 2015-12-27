angular.module('annes', ['ngAnimate', 'ui.router', 'annes.controllers', 'annes.services'])

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
