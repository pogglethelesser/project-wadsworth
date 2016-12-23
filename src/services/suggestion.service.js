(function() {
    'use strict';

    angular
    	.module('app.suggestion')
        .service('suggestionService', suggestionService);

		suggestionService.$inject = ['$http', '$q', 'esriTypes', 'suggestionSettings', '$sce']; 

        function suggestionService($http, $q, esriTypes, suggestionSettings, $sce) {
        	var _this = this;

        	_this.searchAsync = searchAsync;
            _this.clearSuggestions = clearSuggestions;
            _this.updateSuggestions = updateSuggestions;
            _this.suggestions = [];

        	// Private
        	function searchAsync(searchTerm) {
                var url = $sce.trustAsResourceUrl(suggestionSettings.serviceUrl);
        		return $http.jsonp(url, 
                    {
                        method: 'POST',
                        params: {
                            searchclass: suggestionSettings.filterClasses,
                            searchlimit: suggestionSettings.maxResults,
                            searchterm: searchTerm,
                            searchgeotag: suggestionSettings.filterGeoTags,
                            f: 'pjson'
                        },
                        responseType: 'json'
        			})
        			.then(function(response) {
                        if (!response.data || !response.data.searchResults) {
                            return [];
                        }

                        if (response.data.searchResults.length === 1 && isNoResultPlaceholder(response.data.searchResults[0])) {
                            return [];
                        }

                        return response.data.searchResults;
                    })
                    .catch(function (error) {
                        var i = error;
                    });;
        		;

        	}

        	function handleSuggestions (response) {
                if (!response.data || !response.data.searchResults) {
                    return [];
                }

                if (response.data.searchResults.length === 1 && isNoResultPlaceholder(response.data.searchResults[0])) {
                    return [];
                }

                return response.data.searchResults;
        	}

        	function isNoResultPlaceholder(item) {
                return item.value.keydescription === "No Matching Results";
            }

            function clearSuggestions() {
                _this.suggestions.length = 0;                
            }

            function updateSuggestions(searchTerm) {
                if (searchTerm === undefined) return;

                var items = _this.searchAsync(searchTerm)
                    .then(function (response) {
                        _this.clearSuggestions();
                        angular.forEach(response, function(value,key) {
                            var item = {
                                title: value.label,
                                subtitle: value.value.keydescription,
                                icon_class: value.value.searchclass,
                                x: value.value.x,
                                y: value.value.y,
                                srid: value.value.outSR,
                                key: value.value.searchkey,
                                latitude: value.value.latitude,
                                longitude: value.value.longitude
                            };

                            _this.suggestions.push(item);
                        });
                })
                    .catch(function(error){
                        var ii = 0;
                    });
            }
        }
    
})();