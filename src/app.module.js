(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features (listed alphabetically)
        'app.approot',
        'app.dashboard',
        'app.topnav',
        'app.esri',
        'app.tile',
        'app.searchMethod'

        'esri.core'
    ]);
})();
