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
            .state('dashboard', {
                url: '/',
                template: '<tmpl-dashboard></tmpl-dashboard>'
            })
            .state('searchmethod', {
                url: '/method',
                template: '<search-method></search-method>'

                })
            .state('search', {
                url: '/search',
                template: '<div><h1>Search</h1><p>Placeholder</p></div>'

                })
            ;
    }
})();
