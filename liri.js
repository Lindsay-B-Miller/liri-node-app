require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);



spotify
    .search({ type: 'track', query: 'Fill it Up Again', limit: 1 })
    .then(function (response) {
        console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Preview Url: " + response.tracks.items[0].preview_url);
        console.log("Album Name: " + response.tracks.items[0].album.name);
    })
    .catch(function (err) {
        console.log(err);
    });