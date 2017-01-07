(function() {
    'use strict';

    angular
        .module('jhipSpatialApp')
        .controller('ShopController', ShopController);

    ShopController.$inject = ['$scope', '$state', '$stateParams','Shop'];

    function ShopController ($scope, $state, $stateParams, Shop) {
        var vm = this;

        vm.shops = [];


        if ($state.current.name === 'shop.findNearBy') {
            loadByFindNearBy();
        }
        else {
            loadAll();
        }

        function loadByFindNearBy() {
            console.info ("loadByFindNearBy()")
            console.info ("lat:" + $stateParams.lat + ",lon:" + $stateParams.lon)
            Shop.findNearBy({
                lat: new Number($stateParams.lat),
                lon: new Number($stateParams.lon)
            }, onSuccess, onError);
            function onSuccess(data, headers) {
                vm.shops = data;
            }
            function onError (error) {
                console.info(error.data.message);
            }

        }
        function loadAll() {
            Shop.query(function(result) {
                vm.shops = result;
                vm.searchQuery = null;
            });
        }
    }
})();
