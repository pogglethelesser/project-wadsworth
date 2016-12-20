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
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {
        var _this = this;

        _this.$onInit = $onInit;

        _this.searchByText = searchByText;
        _this.searchByMap = searchByMap;            
        _this.searchByLocation = searchByLocation;

        //Private 
        function $onInit() {
        }

        function searchByText() {
            alert('Placeholder - Search By Text');
        }

        function searchByMap() {
            alert('Placeholder - Search By Map');
        }

        function searchByLocation() {
            alert('Placeholder - Search by Location');
        }
    }

})();