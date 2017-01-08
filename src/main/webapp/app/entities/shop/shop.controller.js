(function() {
    'use strict';

    angular
        .module('jhipSpatialApp')
        .controller('ShopController', ShopController);

    ShopController.$inject = ['$scope', '$state', '$stateParams','Shop'];

    function ShopController ($scope, $state, $stateParams, Shop) {
        var vm = this;

        vm.shops = [];
        vm.geom = [];

        vm.do_mouseover = do_mouseover;
        vm.do_mouseleave = do_mouseleave;

        function do_mouseleave(key) {
            console.debug("Enter ng-mouseleave: " + key);
            vm.geom[key].animation = "Animation.STOP";
        }

        function do_mouseover(key) {
            console.debug("Enter ng-mouseover:" + key);
            vm.geom[key].animation = "Animation.BOUNCE";
        }

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
                populateResult();
            });
        }

        function populateResult() {
            var arrayLength = vm.shops.length;
            for(var i=0; i < arrayLength; i++) {
                var obj = new Object();
                var shop = vm.shops[i];
                obj.key = i;
                obj.id = shop.id;
                obj.name = shop.name;
                obj.lat = shop.location.coordinates[0];
                obj.lon = shop.location.coordinates[1];
                obj.animation = "Animation.STOP";
                vm.geom[i] = obj;
            }
        }
    }
})();
