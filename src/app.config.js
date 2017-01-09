(function() {
    'use strict';

    angular.module('app')
        .config([
            'searchSettings', 'featuresetsHelperProvider', function (searchSettings, featuresetsHelperProvider) {
                featuresetsHelperProvider.init(searchSettings.baseUrl, searchSettings.groupId);
            }
        ])

        .run([
            'featuresetsHelper', function (featuresetsHelper) {
                featuresetsHelper.load();
            }
        ]);
})();