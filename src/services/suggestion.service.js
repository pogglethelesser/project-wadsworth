(function() {
    'use strict';

    angular
    	.module('app.suggestion')
        .service('suggestionService', suggestionService);

		suggestionService.$inject = ['$http', '$q', 'esriTypes', 'suggestionSettings', '$sce']; 

        function suggestionService($http, $q, esriTypes, suggestionSettings, $sce) {
        	var _this = this;

        	_this.searchAsync = searchAsync;

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

        }
    
})();