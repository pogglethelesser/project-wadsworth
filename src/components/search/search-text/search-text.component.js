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
    ControllerFunction.$inject = ['$scope', 'suggestionService','featuresetsHelper'];

    /* @ngInject */
    function ControllerFunction($scope, suggestionService, featuresetsHelper) {
        var _this = this;

        _this.search = { searchTerm: '' };
        _this.suggestions = suggestionService.suggestions;
        _this.previousSearches = [
            {
                title: '200 Tuam Street',
                subtitle: 'Example previous location',
                icon_class: 'VAL',
                x: 0,
                y: 0,
                srid: 2193,
                key: '',
                latitude: 0,
                longitude: 0
            }
        ];

        _this.$onInit = $onInit;
        _this.clearSearch = clearSearch;

        // Load the datasets
        featuresetsHelper.getLayersAsync().then(function(data) {
            _this.featuresets = data;
        });

        // Watch search term to initiate suggestion query
        $scope.$watch('searchTextCtrl.search.searchTerm', searchTermWatchHandler, true);


        //Private 
        function $onInit() {

        }

        function searchTermWatchHandler (current, original) {
            if (current !== undefined && current.length <=  (_this.minChars === undefined ? 0 : _this.minChars)) {
                resetSuggestions();
            } else {
                suggestionService.updateSuggestions(current);
            }
        }

        function resetSuggestions() {
            suggestionService.clearSuggestions();
        } 

        function clearSearch() {
            _this.search.searchTerm = '';
            resetSuggestions();
        }
    }

})();