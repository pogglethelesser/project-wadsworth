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

            _this.clickHandle = clickHandle;

            //Private 
            function $onInit() {
            }

            function $onChanges(vars) {
            }

            function clickHandle() {
                if (_this.onClick !== undefined) _this.onClick();
            }
        }],
        controllerAs: 'ctrl'
    });