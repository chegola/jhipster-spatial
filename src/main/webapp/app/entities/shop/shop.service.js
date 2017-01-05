(function() {
    'use strict';
    angular
        .module('jhipSpatialApp')
        .factory('Shop', Shop);

    Shop.$inject = ['$resource'];

    function Shop ($resource) {
        var resourceUrl =  'api/shops/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'findNearBy' : {method: 'GET', isArray: true, url: 'api/shops/findNearBy/:lat'}
        });
    }
})();
