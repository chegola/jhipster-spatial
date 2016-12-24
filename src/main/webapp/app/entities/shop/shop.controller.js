(function() {
    'use strict';

    angular
        .module('jhipSpatialApp')
        .controller('ShopController', ShopController);

    ShopController.$inject = ['$scope', '$state', 'Shop'];

    function ShopController ($scope, $state, Shop) {
        var vm = this;

        vm.shops = [];

        loadAll();

        function loadAll() {
            Shop.query(function(result) {
                vm.shops = result;
                vm.searchQuery = null;
            });
        }
    }
})();
