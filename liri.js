var keys = require("./key.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var getMyTweets = function() {
    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'foofighters'}
    client.get('statuses/user_timeline', params, function(error, tweets, response){ 
    if(!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(' ');
            console.log(tweets[i].text);
        } 
    }
    });
}

var getArtistNames = function(artist) {
    return artist.name;
}

var songChoice = function(songName) {
    var spotify = new Spotify({
        id: keys.spotify.Client_ID,
        secret: keys.spotify.Client_Secret,
    });

    spotify.search({ type: 'track', query: songName, limit: 20 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
          console.log(i + 1);
          console.log('Artist/Band: ' + songs[i].artists.map(getArtistNames));
          console.log('Song Title: ' + songs[i].name);
          console.log('Preview URL: ' + songs[i].preview_url);
          console.log('Album Name: ' + songs[i].album.name);
          console.log('-------------------------------------');
        }
       });
};

// var chooseMovie = function(movieName) {
//     request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=9e300465", function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         console.log('----------------');
//         console.log(body);
//       }
//     })
// }

function omdbThisMovie(movieTitle) {
    var request = require("request");
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=9e300465", function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var jsonData = JSON.parse(body);

        console.log('-------------------------------------');
        // console.log("Title: " + JSON.parse(body).Title);
        // console.log("Year: " + JSON.parse(body).Year);
        // console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
        // console.log("Country: " + JSON.parse(body).Country);
        // console.log("Language: " + JSON.parse(body).Language);
        // console.log("Plot: " + JSON.parse(body).Plot);
        // console.log("Actors: " + JSON.parse(body).Actors);
        console.log(body);
      }
    });
    }


var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' : getMyTweets();
        break;
        case 'spotify-this-song' : songChoice(functionData);
        break;
        case 'movie-this' : omdbThisMovie();
        break;
        default:
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);