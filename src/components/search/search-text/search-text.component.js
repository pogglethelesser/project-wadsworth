(function() {
    'use strict';

    angular
    	.module('app.search')
    	.component('searchText',componentFunction())
        .controller('SearchTextController', ControllerFunction);

    // ----- componentFunction -----
    componentFunction.$inject = [];

    /* @ngInject */
    function componentFunction() {
        var component = {
            templateUrl: 'components/search/search-text/search-text.component.html',
            bindings: {
                onPropertySelected: "&?",
                currentProperty: "<?"
            },
            controller: 'SearchTextController',
            controllerAs: 'searchTextCtrl'
        };

        return component;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {
        var _this = this;

        _this.$onInit = $onInit;

        //Private 
        function $onInit() {
        }

    }

})();