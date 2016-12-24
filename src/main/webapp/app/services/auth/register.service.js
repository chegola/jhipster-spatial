(function () {
    'use strict';

    angular
        .module('jhipSpatialApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
