'use strict';

Application.Services.factory('EchoNestServiceResource', ['$resource',
    function($resource) {

        var Headers     = {"Accept" : "application/json", "Content-Type" : "application/json"};

        return $resource('http://developer.echonest.com/api/v4/playlist/static',
            {}, {
                get    :  {method: 'GET',     headers : Headers, params:{bucket : ['tracks', 'id:spotify'], genre: '@genre', limit : true, results : 1, api_key : 'YTBBANYZHICTAFW2P', type : 'genre-radio'}}
            });
    }]);

Application.Services.factory('EchoNestService', ['EchoNestServiceResource', '$q',
    function(EchoNestServiceResource, $q) {

        return {

            get : function (obj) {
                var deferred = $q.defer();
                EchoNestServiceResource.get(obj, function (resp) {deferred.resolve(resp);});
                return deferred.promise;
            }
        }

}]);

