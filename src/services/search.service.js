(function() {
    'use strict';

	angular
		.module('app.esri')
	    .service('searchService', searchService);

	    searchService.$inject = ['$http', '$q', 'searchSettings', 'layerQueryService', 'esriTypes'];

	    //Private
	    function searchService($http, $q, searchSettings, layerQueryService, esriTypes) {
            var _this = this;

            _this.searchAsync = searchAsync;
            _this.getFeatureAsync = getFeatureAsync;

            //Private
            function searchAsync(item) {

            }

            function isNoResultPlaceholder(item) {
                return item.value.keydescription === "No Matching Results";
            }

            function getFeatureAsync(item) {
                return esriTypes.onReady(function(esri) {

                    var feature = {
                        label: item.label,
                        point: new esri.Point({
                            x: item.x,
                            y: item.y,
                            spatialReference: new esri.SpatialReference(item.srid)
                        })
                    }

                    return $q.all([
                            addCoreFeatureAsync(feature),
                            addUrbanDeterminationAsync(feature)
                        ])
                        .then(function() {
                            return feature;
                        });
                });

                function addUrbanDeterminationAsync(feature) {
                    return layerQueryService.queryAsync(searchSettings.urbanZoneLayerUrl,
                        {
                            shape: feture.point,
                            shapetype: 'esriGeometryPoint'
                        })
                        .then(function (layerResponse) {
                            feature.isRural = layerResponse.features.length === 0;
                            return feature;
                        });
                }

                function addCoreFeatureAsync(feature) {
                	// Check for a featureset that matches the supplied item - lookup by icon_class else default to parcel lookup





                    switch (feature.icon_class) {
                        case 'PAR':
                        case 'VAL':
                            return getCoreFeatureDataAsync(feature);
                        default:
                            return $q.when(feature);
                    }
                }

                function getCoreFeatureDataAsync(feature) {
                    return layerQueryService.queryAsync(searchSettings.coreLayerUrl,
                        {
                            shape: feature.point,
                            shapetype: 'esriGeometryPoint'
                        })
                        .then(function (layerResponse) {

                            feature.coreFeature = layerResponse.features[0];
                            return feature;
                        });
                }
            }
        }

})();