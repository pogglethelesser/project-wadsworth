(function() {
    'use strict';

    angular
    	.module('app.search')
    	.component('suggestionResults',componentFunction())
        .controller('SuggestionResultsController', ControllerFunction);

    // ----- componentFunction -----
    componentFunction.$inject = [];

    /* @ngInject */
    function componentFunction() {
        var component = {
            templateUrl: 'components/search/suggestion/suggestion-results.component.html',
            bindings: {
                items: "=",
                onItemSelected: "&",
                currentItem: "<?"
            },
            controller: 'SuggestionResultsController',
            controllerAs: 'suggestRstCtrl'
        };

        return component;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$timeout'];

    /* @ngInject */
    function ControllerFunction($timeout) {
        var _this = this;

        _this.$onInit = $onInit;
        _this.isCurrent = isCurrent;
        _this.setCurrent = setCurrent;

        _this.current = 0;


        //Private 
        function $onInit() {
        }

        function handleSelection(selectedItem) {
            _this.currentItem = selectedItem;
        }

        function isCurrent(index) {
            return _this.current == index;
        }

        function setCurrent(index) {
            _this.current = index;
        }

    }

})();