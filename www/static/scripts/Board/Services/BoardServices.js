'use strict';

Application.Services.factory('BugzillaService', ['$q', '$http',
    function($q, $http) {

        var baseURL = '/proxy/bugzilla/jsonrpc.cgi';

        return {

            get : function (obj) {

                obj.paramsBugzilla_login = "zzz_belize@cyantechnology.com";
                obj.Bugzilla_password    = "Y8UBsvM8pRQi";

                var d = $q.defer();
                $http.get(baseURL + '?method=' + obj.method + '&params=' + JSON.stringify([obj.params])).success(function(data){
                    d.resolve(data);
                });
                return d.promise;

            }
        }

    }]);
