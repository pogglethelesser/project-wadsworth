(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('searchmethod', {
                url: '/',
                template: '<search-method></search-method>'

                })
            .state('search', {
                url: '/search',
                template: '<div><h1>Search</h1><p>Placeholder</p></div>'

                })
            .state('search.text',{
                url: '/search/{searchtext}',
                template: '<div><h1>Search by Text</h1><p>Placeholder</p></div>'
                })
            ;
    }
})();
