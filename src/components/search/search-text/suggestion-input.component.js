(function() {
    'use strict';

    angular
    	.module('app.suggestion')
    	.component('suggestionInput', componentFunction())
    	.controller('SuggestionInputController', ControllerFunction);

    	   // ----- componentFunction -----
    componentFunction.$inject = [];

    /* @ngInject */
    function componentFunction() {
        var component = {
            templateUrl: 'components/search/search-text/suggestion-input.component.html',
            bindings: {
                onSuggestionSelected: "&?",
                currentSuggestion: "<?"
            },
            controller: 'SuggestionInputController',
            controllerAs: 'suggestInputCtrl'
        };

        return component;
    }

   // ----- ControllerFunction -----
    ControllerFunction.$inject = ['suggestionService'];

    /* @ngInject */
    function ControllerFunction(suggestionService) {
        var _this = this;

        _this.selectedSuggestion = undefined;


        _this.$onInit = $onInit;
        _this.getSuggestion = getSuggestion;

        //Private 
        function $onInit() {
        }

        function getSuggestion(searchTerm) {
        	return suggestionService.searchAsync(searchTerm);
        }
    }


})();