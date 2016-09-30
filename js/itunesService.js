angular.module('itunes').service('itunesService', function($http, $q){
  this.getSongData = function(artist){
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    }).then(function(response){
      var songs = response.data.results;
      var finalArtist = [];
        for(var i = 0; i < songs.length; i++){
          finalArtist.push({
            Play: songs[i].previewUrl,
            Artist: songs[i].artistName,
            Collection: songs[i].collectionName,
            AlbumArt: songs[i].artworkUrl100,
            Type: songs[i].type,
            CollectionPrice: songs[i].collectionPrice
          });
        }
      deferred.resolve(finalArtist);
    })
    return deferred.promise;
  }
});
