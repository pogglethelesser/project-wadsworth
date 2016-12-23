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
                currentProperty: "<?",
                minChars: "@?"
            },
            controller: 'SearchTextController',
            controllerAs: 'searchTextCtrl'
        };

        return component;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', 'suggestionService'];

    /* @ngInject */
    function ControllerFunction($scope, suggestionService) {
        var _this = this;

        _this.search = { searchTerm: '' };
        _this.suggestions = suggestionService.suggestions;

        _this.$onInit = $onInit;

        // Watch search term to initiate suggestion query
        // $scope.$watch('_this.searchTerm', searchTermWatchHandler);
        $scope.$watch('searchTextCtrl.search.searchTerm', function (current, original) {
            if (current !== undefined && current.length <=  (_this.minChars === undefined ? 0 : _this.minChars)) {
                suggestionService.clearSuggestions();
            } else {
                suggestionService.updateSuggestions(current);
            }
        }, true);


        //Private 
        function $onInit() {

        }

/*
        function searchTermWatchHandler (current, original) {
            if (_this.minChars === undefined || (current !== undefined && current.length < _this.minChars)) {
                suggestionService.clearSuggestions();
            } else {
                suggestionService.updateSuggestions(current);
            }
        }
*/
    }

})();