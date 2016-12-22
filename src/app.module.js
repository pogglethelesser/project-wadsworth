(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features (listed alphabetically)
        'app.approot',
        'app.dashboard',
        'app.esri',
        'app.search',
        'app.searchMethod',
        'app.suggestion',
        'app.tile',
        'app.topnav',
        'esri.core'
    ]);
})();
