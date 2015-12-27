(function() {
    'use strict';
    angular.module('app')
        .service('settingsService', ['$q', SettingsService]);

    function SettingsService() {
        return {
            returnTest: returnTest
        }
    }

    function returnTest() {
        return "hello";
    };
})();
