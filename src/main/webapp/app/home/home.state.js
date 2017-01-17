(function() {
    'use strict';

    angular
        .module('jhipSpatialApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                // authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/shop/current-position.html',
                    controller: 'ShopController',
                    controllerAs: 'vm'
                    /*templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'*/
                }
            }
        });
    }
})();
