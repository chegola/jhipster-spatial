(function() {
    'use strict';

    angular
        .module('jhipSpatialApp')
        .controller('ShopController', ShopController);

    ShopController.$inject = ['$scope', '$state', '$stateParams','Shop', 'NgMap'];

    function ShopController ($scope, $state, $stateParams, Shop, NgMap) {
        var vm = this;
        vm.shops = [];
        vm.geom = [];
        vm.do_mouseover = do_mouseover;
        vm.do_mouseleave = do_mouseleave;
        vm.hoverRow = null;
        NgMap.getMap().then(function(map) {
            vm.map = map;
        });
        vm.shop = null;
        vm.showInfo = showInfo;

        function showInfo(evt, index) {
            vm.shop = vm.geom[index];
            vm.map.showInfoWindow('foo', this);
        }

        if (vm.km == null) {
            vm.km = 1;
        }

        function do_mouseleave(evt, index) {
            console.debug("Enter ng-mouseleave: " + index);
            vm.geom[index].animation = "Animation.STOP";
        }

        function do_mouseover(evt, index) {
            console.debug("Enter ng-mouseover:" + index);
            vm.geom[index].animation = "Animation.BOUNCE";
            vm.hoverRow = index;
        }

        if ($state.current.name === 'shop.findNearBy') {
            loadByFindNearBy();
        }
        else {
            loadAll();
        }

        function loadByFindNearBy() {
            console.info ("loadByFindNearBy() lat:" + $stateParams.lat + ",lon:" + $stateParams.lon + ",km:" + $stateParams.km)
            Shop.findNearBy({
                lat: new Number($stateParams.lat),
                lon: new Number($stateParams.lon),
                km: new Number($stateParams.km)
            }, onSuccess, onError);
            function onSuccess(data, headers) {
                vm.shops = data;
                vm.km = $stateParams.km;
                populateResult();
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
