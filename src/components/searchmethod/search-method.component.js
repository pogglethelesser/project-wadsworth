angular.module('app.searchMethod')
    .component('searchMethod',
    {
        templateUrl: 'components/searchmethod/search-method.component.html',
        bindings: {
            onPropertySelected: "&?",
            currentProperty: "<?"
        },
        controller: ['$log', function ($log) {
            var _this = this;

            _this.busy = false;
            _this.search = search;
            _this.selectItem = selectItem;
            _this.getAddressText = getAddressText;
            _this.$onInit = $onInit;
            _this.$onChanges = $onChanges;

            //Private 
            function $onInit() {
            }

            function $onChanges(vars) {
                if (vars.currentProperty && vars.currentProperty.currentValue) {
                    _this.searchText = _this.currentProperty.address;
                }
            }


            function search(searchTerm) {
 /*               blockUI.start();

                return searchService.searchAsync(searchTerm)
                    .finally(function () {
                        blockUI.stop();
                    });*/
            }

            function getAddressText(propertyAddress) {
                return propertyAddress.label;
            }

            function selectItem(propertyAddress) {

                if (propertyAddress) {
                    if (_this.onPropertySelected) {
                        _this.onPropertySelected({ propertyAddress: propertyAddress });
                    }
                }
            }
        }]
    });