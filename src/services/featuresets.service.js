(function() {
    'use strict';

	angular
		.module('app.esri')
	    .provider('featuresetsHelper', featuresetsHelperProvider);

	    featuresetsHelperProvider.$inject = [];

	    /* @ngInject */
	    function featuresetsHelperProvider () {
	    	/* jshint validatethis:true */
	    	this.$get = featuresetsHelper;
	    	this.init = init;

		    featuresetsHelper.$inject = ['$http', '$interpolate', '$q', '$sce', 'searchSettings', 'layerQueryService', 'featuresetFactory', 'esriTypes'];

		    /* @ngInject */
		    function featuresetsHelper($http, $interpolate, $q, $sce, searchSettings, layerQueryService, featuresetFactory, esriTypes) {
		    	var featuresetsDeferred = $q.defer();

		    	var service = {
	                load: load,
	                getLayersAsync: getLayersAsync,
	                getRuralLayersAsync: getRuralLayersAsync,
	                getUrbanLayersAsync: getUrbanLayersAsync,
	                getLayersByTagAsync: getLayersByTagAsync
		    	};

		    	return  service;

		    	////////////////

		    	function getLayersAsync() {
		    		return featuresetsDeferred.promise;
		    	}

	            function getRuralLayersAsync() {
	                return featuresetsDeferred.promise.then(function(layers) {
	                    return filterLayersByTag(layers, searchSettings.ruralTagName);
	                });
	            }

	            function getUrbanLayersAsync() {
	                return featuresetsDeferred.promise.then(function(layers) {
	                    return filterLayersByTag(layers, searchSettings.urbanTagName);
	                });
	            }

	            function getLayersByTagAsync(tag) {
	                return featuresetsDeferred.promise.then(function(layers) {
	                    return filterLayersByTag(layers, tag);
	                });
	            }


	            function load() {
	                loadMapsAsync()
	                    .then(function(layers) {
	                        featuresetsDeferred.resolve(layers);
	                    });
	            }

	            function loadMapsAsync() {
	                var mapUrl =
	                    $sce.trustAsResourceUrl(
	                    	$interpolate('{{baseUrl}}/search?f=json&q=group:%22{{groupId}}%22%20AND%20type:%22Web%20Map%22&num=100')({
		                        baseUrl: _baseUrl,
		                        groupId: _groupId
		                    	})
	                    );

	                return $http.jsonp(mapUrl)
	                    .then(function(mapResponse) {
	                        var layerPromises = [];
	                        _.forEach(mapResponse.data.results,
	                            function(map) {
	                                layerPromises.push(loadMapLayersAsync(map));
	                            });

	                        return $q.all(layerPromises)
	                            .then(function(layers) {
	                                var datasets = _.chain(layers)
	                                    .flatten()
	//                                    .uniqBy(function(layer) {
	//                                        return layer.id;
	//                                    })
	                                    .value();

	                                   return datasets;

	                                /*return _.chain(layers)
	                                    .flatten()
	                                    .uniqBy(function(layer) {
	                                        return layer.id;
	                                    })
	                                    .value();*/
	                            });
	                    })
	                    .catch(function(error) {
	                    	alert(error);
	                    });
	            }

	            function loadMapLayersAsync(map) {
	                var url =
	                    $sce.trustAsResourceUrl(
		                    $interpolate('{{baseUrl}}/content/items/{{itemId}}/data/?f=json')({
		                        baseUrl: _baseUrl,
		                        itemId: map.id
		                    })
		                );

	                return $http.jsonp(url)
	                    .then(function(response) {
	                            var operationalLayerPromises = _.map(response.data.operationalLayers,
	                                function(operationalLayer) {
	                                    return loadLayerAsync(operationalLayer.url)
	                                        .then(function(layer) {
	                                            return featuresetFactory.createAsync(map, layer, operationalLayer);
	                                        });
	                                });

	                            return $q.all(operationalLayerPromises);
	                        }
	                    )
	                    .catch(function(error) {
	                    	alert(error);
	                    });
	            }

	            function loadLayerAsync(layerUrl) {
	                var url =
	                    $sce.trustAsResourceUrl(layerUrl + "?f=pjson");

	                return $http.get(url)
	                    .then(function(layerResponse) {
	                        return layerResponse.data;
	                    });
	            }


		    }

            //Private 
            var _baseUrl, _groupId;

            function init(baseUrl, groupId) {
                _baseUrl = baseUrl;
                _groupId = groupId;
            }

            function filterLayersByTag(layers, tagName) {
                return _.filter(layers,
                    function(layer) {
                        return _.includes(layer.tags, tagName);
                    });
            }

	    }

})();