(function () {

    'use strict';

    angular.module('app.searchMethod')
        .component('searchMethod', componentFunction())
        .controller('SearchMethodController', ControllerFunction);


    // ----- componentFunction -----
    componentFunction.$inject = [];

    /* @ngInject */
    function componentFunction() {
        var component = {
            templateUrl: 'components/searchmethod/search-method.component.html',
            bindings: {
                onPropertySelected: "&?",
                currentProperty: "<?"
            },
            controller: 'SearchMethodController',
            controllerAs: 'searchMthdCtrl'
        };

        return component;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state'];

    /* @ngInject */
    function ControllerFunction($state) {
        var _this = this;

        _this.$onInit = $onInit;

        _this.searchByText = searchByText;
        _this.searchByMap = searchByMap;            
        _this.searchByLocation = searchByLocation;

        //Private 
        function $onInit() {
        }

        function searchByText() {
            $state.go('search_text');
        }

        function searchByMap() {
            $state.go('search_map');
        }

        function searchByLocation() {
            $state.go('search_location');
        }
    }

})();