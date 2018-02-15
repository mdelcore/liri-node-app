// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// dependencies stored as variables
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// capture user input, and tell user what to type in
console.log('Type my-tweets, spotify-this-song, movie-this, or do-what-it-says to get started!');

//process[2] choses action, process [3] is search prameter for spotify or movie 
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

// to process multiple words
	for (var i = 4; i < process.argv.length; i++) {
	 	secondCommand += '+' + process.argv[i];
	 }

function theSwitch() {
	// switch statement to declare what action to execute
	switch(userCommand) {
		case 'my-tweets':
		fetchTweets();
		break;

		case 'spotify-this-song':
		spotifyMe();
		break;

		case 'movie-this':
		aMovieForMe();
		break;

		case 'do-what-it-says':
		followTheTextBook();
		break;

	}
};

// functions & options
function fetchTweets() {
	console.log('Tweets headed your way!');
	var client = new Twitter(keys.twitter);
	// new variable for twitter and to load keys from keys.js
	var client = new Twitter ({
		consumer_key: keys.twitter.consumer_key,
		consumer_secret: keys.twitter.consumer_secret,
		access_token_key: keys.twitter.access_token_key,
		access_token_secret: keys.twitter.access_token_secret,

	});

	// parameters for twitter function
	var parameters = {
		screen_name: 'cnn',
		count: 20
	};

	// to call the get method on our client variable twitter instance
	var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
};//end fetchTweets


function spotifyMe(){
	console.log("This is my JAM!");
	var spotify = new Spotify(keys.spotify);

	// variable for search term

	var searchTrack;
	if (secondCommand === undefined) {
		searchTrack = "The Sign";
	}
	else {
		searchTrack = secondCommand;
	}
// launch spotify search
	spotify.search({type:'track', query:searchTrack}, function(err, data){
		if (err) {
			console.log('Error Occurred: ' + err);
			return;
		}
		else {
			console.log('Artist: ' + data.tracks.items[0].artists[0].name);
			console.log('Song: ' + data.tracks.items[0].name);
			console.log('Album: ' + data.tracks.items[0].album.name);
			console.log('Preview Here: ' + data.tracks.items[0].preview_url);
		}
	});
};//end spotifyMe

function aMovieForMe(){
	console.log("Netflix All Day!");

// launch movie search
var searchMovie;
if(secondCommand === undefined){
	searchMovie = 'Me. Nobody';
}
else{
	searchMovie = secondCommand;
};

var url ='http://www.omdbapi.com/?i=tt3896198&apikey=675ade1c&' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
request(url, function(error, response, body){
	if(!error && response.statusCode == 200){
		console.log("Title: " + JSON.parse(body)["Title"]);
        console.log("Year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        // console.log("Actors: " + JSON.parse(breakody)["Actors"]);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	}
});

};//end aMovieForMe

function followTheTextbook(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

     	//split data, declare variables
     	var dataArr = data.split(',');
        userCommand = dataArr[0];
        secondCommand = dataArr[1];
        //if multi-word search term, add.
        for(i=2; i<dataArr.length; i++){
            secondCommand = secondCommand + "+" + dataArr[i];
        };
        //run action
		theSwitch();
		
    	};//end else

    });//end readfile

};//end followTheTextbook

theSwitch();






















