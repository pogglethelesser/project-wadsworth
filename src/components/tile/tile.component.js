(function () {

    'use strict';

    angular.module('app.tile')
        .component('tile', componentFunction())
        .controller('TileController', ControllerFunction);

     // ----- componentFunction -----
    componentFunction.$inject = [];

    /* @ngInject */
    function componentFunction() {
        var component = {
            templateUrl: 'components/tile/tile.component.html',
            bindings: {
                color: "@",
                title: "@",
                icon: "@",
                onClick: "&?",
            },
            controller: 'TileController',
            controllerAs: 'ctrl'
        };

        return component;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {
        var _this = this;

        _this.$onInit = $onInit;
        _this.$onChanges = $onChanges;

        _this.clickHandle = clickHandle;

        //Private 
        function $onInit() {
        }

        function $onChanges(vars) {
        }

        function clickHandle() {
            if (_this.onClick !== undefined) _this.onClick();
        }
    }

})();