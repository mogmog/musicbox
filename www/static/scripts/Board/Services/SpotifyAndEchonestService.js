'use strict';

/*Here I am wrapping the resources in a promise. Someday this might be done in Angular and it can be taken out.*/
Application.Services.factory('SpotifyAndEchoNestService', ['EchoNestService', 'SpotifyService', '$q',
    function(EchoNestService, SpotifyService, $q) {

        return {

            get : function (obj) {

                var deferred = $q.defer();

                EchoNestService.get(obj).then(function (resp) {
                   return _.chain(resp.response.songs).map(function(song){return song.tracks}).flatten().map(function(album){return album.foreign_release_id.split("spotify:album:")[1]}).values()._wrapped;
                }).then(function(ids){

                        SpotifyService.get({ids : ids.join(",")}).then(function(albums){
                            deferred.resolve(albums);
                        })
                    });

                return deferred.promise;
            }
        }
    }]);
