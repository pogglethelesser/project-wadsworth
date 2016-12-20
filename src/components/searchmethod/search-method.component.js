angular.module('app.searchMethod')
    .component('searchMethod',
    {
        templateUrl: 'components/searchmethod/search-method.component.html',
        bindings: {
            onPropertySelected: "&?",
            currentProperty: "<?"
        },
        controller: [function () {
            var _this = this;

            _this.$onInit = $onInit;

            _this.searchByText = searchByText;
            _this.searchByMap = searchByMap;            
            _this.searchByLocation = searchByLocation;

            //Private 
            function $onInit() {
            }

            function searchByText() {
                alert('Placeholder - Search By Text');
            }

            function searchByMap() {
                alert('Placeholder - Search By Map');
            }

            function searchByLocation() {
                alert('Placeholder - Search by Location');
            }

        }],
        controllerAs: 'searchMthdCtrl'
        
    });