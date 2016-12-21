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
                views: {
                    '': { 
                        templateUrl: 'components/search/search.component.html' 
                    },

                    'actionsPanel@search': {
                        template: 'Search Actions Panel'
                    },

                    'mapPanel@search': {
                        template: 'Map Panel'
                    }
                }
            })

            .state('search_text', {
                url: '/searchByText',
                views: {
                    '': { 
                        templateUrl: 'components/search/search.component.html' 
                    },

                    'actionsPanel@search_text': {
                        template: 'Search Actions Panel - search by text'
                    },

                    'mapPanel@search_text': {
                        template: 'Map Panel - search by text'
                    }
                }
            })

            .state('search_map', {
                url: '/searchByMap',
                views: {
                    '': { 
                        templateUrl: 'components/search/search.component.html' 
                    },

                    'actionsPanel@search_map': {
                        template: 'Search Actions Panel - search by map'
                    },

                    'mapPanel@search_map': {
                        template: 'Map Panel - search by map'
                    }
                }
            })

            .state('search_location', {
                url: '/searchByLocation',
                views: {
                    '': { 
                        templateUrl: 'components/search/search.component.html' 
                    },
                    
                    'actionsPanel@search_location': {
                        template: 'Search Actions Panel - search by location'
                    },

                    'mapPanel@search_location': {
                        template: 'Map Panel - search by location'
                    }
                }
            });

    }
})();
