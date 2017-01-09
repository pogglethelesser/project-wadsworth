(function() {
'use strict';

	angular
		.module('app.esri')
    	.service('geometryUtils', geometryUtils);

    geometryUtils.$inject =  ['esriTypes'];

    ////////////// 

    /* @ngInject */
   	function geometryUtils (esriTypes) {
            
    	var _this = this;
        _this.unionAsync = unionAsync;

        //Private
        function unionAsync(geometries) {
            return getExtentsFromGeometries(geometries).then(function (extents) {
                return unionExtents(extents);
            });
        }

        function getExtentsFromGeometries(geometries) {
            return esriTypes.onReady(function (esri) {
                return _.map(geometries,
                    function (geometry) {
                        if (geometry.extent) {
                            return geometry.extent;
                        }

                        return new esri.Extent({
                            xmin: geometry.x,
                            xmax: geometry.x,
                            ymin: geometry.y,
                            ymax: geometry.y,
                            spatialReference: {
                                wkid: geometry.spatialReference.wkid
                            }
                        });
                    });

            });
        }

        function unionExtents(extents) {
            return _.reduce(_.tail(extents),
                    function (reduceExtent, extent) {
                        if (!reduceExtent) {
                            return reduceExtent;
                        }
                        return reduceExtent.union(extent);
                    },
                    _.head(extents));
        }
    }
    
})();