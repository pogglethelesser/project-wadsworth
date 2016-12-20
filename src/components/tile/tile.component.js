angular.module('app.tile')
    .component('tile',
    {
        templateUrl: 'components/tile/tile.component.html',
        bindings: {
            color: "@",
            title: "@",
            icon: "@",
            onClick: "&?",
        },
        controller: [function () {
            var _this = this;

            _this.$onInit = $onInit;
            _this.$onChanges = $onChanges;

            //Private 
            function $onInit() {
            }

            function $onChanges(vars) {
            }

            function clickHandler() {
                if (_this.onClick !== undefined) _this.onClick();
            }
        }],
        controllerAs: 'ctrl'
    });