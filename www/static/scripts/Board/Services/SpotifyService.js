'use strict';

Application.Services.factory('SpotifyServiceResource', ['$resource',
    function($resource) {

        var Headers     = {"Accept" : "application/json", "Content-Type" : "application/json"};

        return $resource('https://api.spotify.com/v1/albums/:id',
            {}, {
                get      :  {method: 'GET',                                                 headers : Headers, params:{id : '@id'}},
                query    :  {method: 'GET',   url :  'https://api.spotify.com/v1/albums',   headers : Headers, params:{ids : '@ids'}}
            });
    }]);

Application.Services.factory('SpotifyService', ['SpotifyServiceResource', '$q',
    function(SpotifyServiceResource, $q) {

        return {

            get : function (obj) {
                var deferred = $q.defer();
                SpotifyServiceResource.get(obj, function (resp) {deferred.resolve(resp);});
                return deferred.promise;
            },

            query : function (obj) {
                var deferred = $q.defer();
                SpotifyServiceResource.query(obj, function (resp) {deferred.resolve(resp);});
                return deferred.promise;
            }

        }

}]);

