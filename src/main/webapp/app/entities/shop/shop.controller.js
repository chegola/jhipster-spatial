(function() {
    'use strict';

    angular
        .module('jhipSpatialApp')
        .controller('ShopController', ShopController);

    ShopController.$inject = ['$scope', '$state', 'Shop'];

    function ShopController ($scope, $state, Shop) {
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
            Shop.findNearBy({
                lat: 13.8977156,
                lon: 100.375209
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
