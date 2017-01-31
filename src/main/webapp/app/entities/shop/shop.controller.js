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
        vm.do_mb_mouseover = do_mb_mouseover;
        vm.hoverRow = null;
        NgMap.getMap().then(function(map) {
            vm.map = map;
        });
        vm.shop = null;
        vm.showInfo = showInfo;
        //vm.mapbox = mapbox;
        angular.extend($scope, {
            bkkCenter: {
                lat: 13.724,
                lng: 100.493,
                zoom: 12
            },
            markers: {},
            center: {
                lat: 13.724,
                lng: 100.493,
                zoom: 4
            },
            defaults: {
                scrollWheelZoom: false
            },
            defaultIcon: {},
            awesomeMarkerIcon: {
                type: 'awesomeMarker',
                icon: 'tag',
                markerColor: 'red'
            }

        });

        if (vm.km == null) {
            vm.km = 1;
        }

        if ($state.current.name === 'shop.mbFindNearBy' || $state.current.name === 'shop.findNearBy') {
            loadByFindNearBy();
        }
        else {
            loadAll();
        }


        function showInfo(evt, index) {
            vm.shop = vm.geom[index];
            vm.map.showInfoWindow('foo', this);
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

        function do_mb_mouseleave(evt, index) {
            console.debug("Enter Mapbox ng-mouseleave: " + index);
            $scope.markers['a'+ index].focus = false;
        }

        function do_mb_mouseover(evt, index) {
            console.debug("Enter Mapbox ng-mouseover:" + index);
            //$scope.center.lat = vm.geom[index].lat;
            //$scope.center.lng = vm.geom[index].lon;
            //$scope.center.zoom = 1;
            $scope.markers['a'+ index].focus = true;
            //$scope.markers['a'+ index].icon = $scope.awesomeMarkerIcon;
            //$scope.markers['a'+ index].icon.markerColor = 'red';
            //console.debug($scope.markers.a1.focus);
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

                var mapboxObj = new Object;
                mapboxObj.lat = obj.lat;
                mapboxObj.lng = obj.lon;
                mapboxObj.message = obj.name;
                mapboxObj.focus = false;
                mapboxObj.draggable = false;
                mapboxObj.icon = {};
                var objElement = new Object;
                var prop_name = 'a' + i;
                objElement[prop_name] = mapboxObj;
                angular.extend($scope.markers, objElement);

            }
            console.info($scope.markers);
        }
    }
})();
