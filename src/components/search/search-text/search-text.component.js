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

        var HOT_KEYS = [9, 13, 27, 38, 40];

        _this.activeIdx = -1;
        _this.minChars = _this.minChars === undefined ? 1 : _this.minChars;
        _this.searchTerm = '';
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
        _this.selectedItem = undefined;

        _this.$onInit = $onInit;
        _this.keyDownHandler = keyDownHandler;
        _this.clearSearch = clearSearch;

        // Load the datasets
        featuresetsHelper.getLayersAsync().then(function(data) {
            _this.featuresets = data;
        });

        // Watch search term to initiate suggestion query
        $scope.$watch('searchTextCtrl.searchTerm', searchTermWatchHandler, true);


        //Private 
        function $onInit() {

        }

        function keyDownHandler(evt) {

            // Check if "interesting" key was pressed
            if (_this.suggestions.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                return;
            }

            
            // if there's nothing selected (i.e. focusFirst) and enter or tab is hit, clear the results
            if (_this.activeIdx === -1 && (evt.which === 9 || evt.which === 13)) {
                resetSuggestions();
                //scope.$digest();
                return;
            }
            
              evt.preventDefault();

              if (evt.which === 40) {
                _this.activeIdx = (_this.activeIdx + 1) % _this.suggestions.length;
                //scope.$digest();
              } else if (evt.which === 38) {
                _this.activeIdx = (_this.activeIdx > 0 ? _this.activeIdx : _this.suggestions.length) - 1;
                //scope.$digest();
              } else if (evt.which === 13 || evt.which === 9) {
                //scope.$apply(function () {
                //  scope.select(scope.activeIdx);
                //});
              } else if (evt.which === 27) {
                evt.stopPropagation();

                resetSuggestions();
                //scope.$digest();
              }
        }

        function searchTermWatchHandler (current, original) {
            if (current === '' || current.length <=  _this.minChars) {
                resetSuggestions();
            } else {
                suggestionService.updateSuggestions(current);
            }
        }

        function resetSuggestions() {
            suggestionService.clearSuggestions();
        } 

        function clearSearch() {

            _this.searchTerm = '';
            resetSuggestions();
        }
    }

})();