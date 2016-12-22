/* global _ */

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('_', _)
        .constant('api', 'http://localhost:7203/api')
        .constant('suggestionSettings', 
	        {
		        serviceUrl: 'http://api.canterburymaps.govt.nz/viewerwebservices/Search.ashx',
		        coreLayerUrl: '//gis.ecan.govt.nz/arcgis/rest/services/Public/Region_Base/MapServer/6',
		        urbanZoneLayerUrl: '//gis.ecan.govt.nz/arcgis/rest/services/Beta/PropertySearch/MapServer/10',
		        maxResults: 10,
		        filterClasses: 'VAL,PAR,NAM,RDI',
		        filterGeoTags: '',
		        searchClasses: [],
		        spatialReference: 2193
		    })
	    .constant('mapSettings',
		    {
		        baseUrl: "//www.arcgis.com/sharing/rest/",
		        baseMapId: "17ea68e0628140da919d16e49e878e79",
		        groupId: "936041e3d7504ceb9c980dea635da0d2",
		        ruralTagName: "Rural",
		        urbanTagName: "Urban",
		        proxyUrl: 'proxy.ashx',
		        geometryServiceUrl: "//gis.ecan.govt.nz/arcgis/rest/services/Utilities/Geometry/GeometryServer"
		    });
})();
