(function() {
    'use strict';

    angular
    	.module('app.search')
    	.component('suggestionResult',componentFunction())
        .controller('SuggestionResultController', ControllerFunction);

    // ----- componentFunction -----
    componentFunction.$inject = [];

    /* @ngInject */
    function componentFunction() {
        var component = {
            templateUrl: 'components/search/suggestion/suggestion-result.component.html',
            bindings: {
                model: "=",
                onClick: "&?"
            },
            controller: 'SuggestionResultController',
            controllerAs: 'suggestCtrl'
        };

        return component;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {
        /* jshint validthis: true */
        var _this = this;

        _this.$onInit = $onInit;
        _this.getIcon = getIcon;


        //Private 
        function $onInit() {
        }

        function handleClick() {
            if (_this.onClick !== undefined) return _this.onClick(_this.model);
        }

        function getIcon() {
            switch (_this.model.icon_class) {
                case 'PAR': 
                case 'VAL':
                    return 'fa-home';
                    break;
                default:
                    return 'fa-map-marker';
                    break;
            }
        }

    }

})();