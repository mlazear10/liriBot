var request = require('request');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var exportKeys = require("./keys.js");
var inquirer = require("inquirer");

var fs = require("fs");

var args = process.argv;

inquirer.prompt([
{
  type: "list",
  message: "What do you want to do? Console log or select one of the following choices!",
  choices: ["movie-this", "spotify-this-song", "my-tweets"],
  name: "choice"
},  ])
.then(function(inquirerResponse) {
  // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
  var exec = require('child_process').exec, child;
  
  child = exec('node liri ' + inquirerResponse.choice,
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
               console.log('exec error: ' + error);
          }
      });

  // args[2] = inquirerResponse.choice;
  // console.log(inquirerResponse.choice);
});

if (args[2] === "movie-this"){

  //IF USER MADE A MOVIE CHOICE
  if(args[3] !== undefined) {
    var movieName = args[3];
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    
    
    request(queryURL, function (error, response, body)  {
      var title = "Title: " + JSON.parse(body).Title;
      var year = "Year: " + JSON.parse(body).Year;
      var IMDBrating = "IMDB Rating: " + JSON.parse(body).imdbRating;
      var rottenTomatoes = "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value;
      var country = "Country: " + JSON.parse(body).Country;
      var language = "Language: " + JSON.parse(body).Language;
      var plot = "Plot: " + JSON.parse(body).Plot;
      var actors = "Actors: " + JSON.parse(body).Actors;
      console.log(title);
      console.log(year);
      console.log(IMDBrating);
      console.log(rottenTomatoes);
      console.log(country);
      console.log(language);
      console.log(plot);
      console.log(actors);
      console.log("This data has been logged to log.txt!");
      var combineText = '\r\n' + title + '\r\n' + year + '\r\n' + IMDBrating + '\r\n' + rottenTomatoes + '\r\n' + country + '\r\n' + language + '\r\n' + plot + '\r\n' + actors + '\r\n';
      fs.appendFile('log.txt', combineText, function (err) {
        if (err) throw err;
      });

    });
  }else {
  
var movieName = "mr+nobody";
var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


request(queryURL, function (error, response, body)  {

  var title = "Title: " + JSON.parse(body).Title;
  var year = "Year: " + JSON.parse(body).Year;
  var IMDBrating = "IMDB Rating: " + JSON.parse(body).imdbRating;
  var rottenTomatoes = "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value;
  var country = "Country: " + JSON.parse(body).Country;
  var language = "Language: " + JSON.parse(body).Language;
  var plot = "Plot: " + JSON.parse(body).Plot;
  var actors = "Actors: " + JSON.parse(body).Actors;
  console.log(title);
  console.log(year);
  console.log(IMDBrating);
  console.log(rottenTomatoes);
  console.log(country);
  console.log(language);
  console.log(plot);
  console.log(actors);
  console.log("This data has been logged to log.txt!");
  var combineText = '\r\n' + title + '\r\n' + year + '\r\n' + IMDBrating + '\r\n' + rottenTomatoes + '\r\n' + country + '\r\n' + language + '\r\n' + plot + '\r\n' + actors + '\r\n';
  fs.appendFile('log.txt', combineText, function (err) {
    if (err) throw err;
  });

});
  }
}

//IF USER TYPED spotify-this-song
if (args[2]==="spotify-this-song"){


 var spotify = new Spotify({
 id: exportKeys.spotifyKeys.client_id,
 secret: exportKeys.spotifyKeys.client_secret
});

//IF THE USER MADE A SONG CHOICE 
if(args[3] !== undefined) {

  spotify.search({ type: 'track', query: args[3] }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
   
   var findSong = "";
   var songIndex = 0;
   var wasSongFound = false;
   for (var i = 0; i < data.tracks.items.length; i++) {
    
   
       if(data.tracks.items[i].name === args[3]){
         
         findSong = "exact song name found! Name of Song: "
         songIndex = i;
         wasSongFound=true;
       }
   
     
   
     
   }
   
   if(wasSongFound === false){
     var findSong = "Exact song name not found, but here's the closest thing I found: ";
   }
   
   
   var artistsArray = []
   for (var i = 0; i < data.tracks.items[songIndex].artists.length; i++) {
     artistsArray.push(data.tracks.items[songIndex].artists[i].name);
     
   }
   
   console.log(findSong + data.tracks.items[songIndex].name);
   console.log("Artists(s): " + artistsArray);
   console.log("Link: " + data.tracks.items[songIndex].external_urls.spotify);
   console.log("Album: " + data.tracks.items[songIndex].album.name);
   console.log("This data has been logged to log.txt!");
   var songName = findSong + data.tracks.items[songIndex].name;
   var artists = "Artists(s): " + artistsArray;
   var link = "Link: " + data.tracks.items[songIndex].external_urls.spotify;
   var album = "Album: " + data.tracks.items[songIndex].album.name;
   var combineText = '\r\n' + songName + '\r\n' + artists + '\r\n' + link + '\r\n' + album + '\r\n';
   fs.appendFile('log.txt', combineText, function (err) {
    if (err) throw err;
  });
   });

}else {   // DEFAULT CHOICE 

  spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
   
   var findSong = "";
   var songIndex = 0;
   var wasSongFound = false;
   for (var i = 0; i < data.tracks.items.length; i++) {
    
   
       if(data.tracks.items[i].name === "The Sign"){
         
         findSong = "No song choice was made, default song chosen! Name of Song: "
         songIndex = i;
         wasSongFound=true;
       }
   
     
   
     
   }
   
   if(wasSongFound === false){
     var findSong = "Exact song name of default not found, but here's the closest thing I found: ";
   }
   
   
   var artistsArray = []
   for (var i = 0; i < data.tracks.items[songIndex].artists.length; i++) {
     artistsArray.push(data.tracks.items[songIndex].artists[i].name);
     
   }
   
   console.log(findSong + data.tracks.items[songIndex].name);
   console.log("Artists(s): " + artistsArray);
   console.log("Link: " + data.tracks.items[songIndex].external_urls.spotify);
   console.log("Album: " + data.tracks.items[songIndex].album.name);
   console.log("This data has been logged to log.txt!");
   var songName = findSong + data.tracks.items[songIndex].name;
   var artists = "Artists(s): " + artistsArray;
   var link = "Link: " + data.tracks.items[songIndex].external_urls.spotify;
   var album = "Album: " + data.tracks.items[songIndex].album.name;
   var combineText = '\r\n' + songName + '\r\n' + artists + '\r\n' + link + '\r\n' + album + '\r\n';
   fs.appendFile('log.txt', combineText, function (err) {
    if (err) throw err;
  });
   });

}


}



//IF USER TYPES my-tweets

if (args[2]==="my-tweets"){
 
var client = new Twitter({
  consumer_key: exportKeys.twitterKeys.consumer_key,
  consumer_secret: exportKeys.twitterKeys.consumer_secret,
  access_token_key: exportKeys.twitterKeys.access_token_key,
  access_token_secret: exportKeys.twitterKeys.access_token_secret
});
 
var params = {screen_name: 'tgwalker93'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    
   for(i=0; i<20; i++){
    var tweet = "tweet: " + tweets[i].text + "---------- Created at: " + tweets[i].created_at;
    console.log(tweet);
    fs.appendFile('log.txt', '\r\n' + tweet + '\r\n', function (err) {
      if (err) throw err;
    });
   }
   console.log("This data has been added to the log.txt file!"); 
  }
});

}


if (args[2]==="do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(",");
    console.log("I choose to call this in the console: " +"node liri " + output[0] + " " + output[1]);

    var exec = require('child_process').exec, child;
    
    child = exec('node liri ' + output[0] +" "+ output[1],
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });

  });

    


}