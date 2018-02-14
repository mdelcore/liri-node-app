// dependencies stored as variables
var keys = require('./key.js');
var twitter = require('twitter');
var spotify = require('spotify');
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
		movieForMe();
		break;

		case 'do-what-it-says':
		followTheTextBook();
		break;

	}
};