// GLOBAL VARIABLES
// ============================================================================================================================

require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var typeRequest = process.argv[2]
var dataRequest = process.argv.slice(3).join("+");

// FUNCTIONS ==================================================================================================================

function switchFunction() {

    switch (typeRequest) {
        case "spotify-this-song":
            spotifyFunction();
            break;
        case "concert-this":
            bandsInTownFunction();
            break;
        case "movie-this":
            OMDBFunction();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

// Spotify Function
function spotifyFunction() {
    if (dataRequest) {
        spotify.search({ type: 'track', query: dataRequest, limit: 1 })
            .then(function (spotifyResponse) {
                console.log("Artist: " + spotifyResponse.tracks.items[0].album.artists[0].name);
                console.log("Song Name: " + spotifyResponse.tracks.items[0].name);
                console.log("Preview Url: " + spotifyResponse.tracks.items[0].preview_url);
                console.log("Album Name: " + spotifyResponse.tracks.items[0].album.name);
            })
    }
    else {
        spotify.search({ type: 'track', query: "The Sign", limit: 10 })
            .then(function (spotifyResponse) {
                console.log("Artist: " + spotifyResponse.tracks.items[5].album.artists[0].name);
                console.log("Song Name: " + spotifyResponse.tracks.items[5].name);
                console.log("Preview Url: " + spotifyResponse.tracks.items[5].preview_url);
                console.log("Album Name: " + spotifyResponse.tracks.items[5].album.name);
            })
    }

}
// Bands in Town Function
function bandsInTownFunction() {
    var bandsRequest;
    bandsRequest = dataRequest;
    if (dataRequest) {
        axios
            .get("https://rest.bandsintown.com/artists/" + bandsRequest + "/events?app_id=codingbootcamp")
            .then(function (bandsResponse) {
                for (i = 0; i < bandsResponse.data.length; i++) {

                    console.log("Venue: " + bandsResponse.data[i].venue.name);
                    // console.log(bandsResponse.request._events);
                    console.log("Venue Location: " + bandsResponse.data[i].venue.city + ", " + bandsResponse.data[i].venue.region);
                    console.log("Date of Event: " + moment(bandsResponse.data[i].datetime).format('MM/DD/YYYY'));
                    console.log("--------------------------");
                }
            })
    }
    else {
        bandsRequest = "Celine Dion";
        axios
            .get("https://rest.bandsintown.com/artists/" + bandsRequest + "/events?app_id=codingbootcamp")
            .then(function (bandsResponse) {
                for (i = 0; i < bandsResponse.data.length; i++) {

                    console.log("Venue: " + bandsResponse.data[0].venue.name);
                    // console.log(bandsResponse.request._events);
                    console.log("Venue Location: " + bandsResponse.data[0].venue.city + ", " + bandsResponse.data[0].venue.region);
                    console.log("Date of Event: " + moment(bandsResponse.data[0].datetime).format('MM/DD/YYYY'));
                    console.log("--------------------------");
                }
            })

    }
}

// OMDB Function
function OMDBFunction() {
    var OMDBRequest;
    OMDBRequest = dataRequest;
    if (dataRequest) {
        axios
            .get("http://www.omdbapi.com/?apikey=trilogy&t=" + OMDBRequest)
            .then(function (OMDBResponse) {
                console.log("* Title: " + OMDBResponse.data.Title);
                console.log("* Year of Release: " + OMDBResponse.data.Year);
                console.log("* IMDB Rating: " + OMDBResponse.data.Ratings[0].Value);
                console.log("* Rotton Tomatoes Rating: " + OMDBResponse.data.Ratings[1].Value);
                console.log("* Country of Production: " + OMDBResponse.data.Country);
                console.log("* Language: " + OMDBResponse.data.Language);
                console.log("* Plot: " + OMDBResponse.data.Plot);
                console.log("* Actors: " + OMDBResponse.data.Actors);
            })
    }
    else {
        OMDBRequest = "Mr. Nobody";
        axios
            .get("http://www.omdbapi.com/?apikey=trilogy&t=" + OMDBRequest)
            .then(function (OMDBResponse) {
                console.log("* Title: " + OMDBResponse.data.Title);
                console.log("* Year of Release: " + OMDBResponse.data.Year);
                console.log("* IMDB Rating: " + OMDBResponse.data.Ratings[0].Value);
                console.log("* Rotton Tomatoes Rating: " + OMDBResponse.data.Ratings[1].Value);
                console.log("* Country of Production: " + OMDBResponse.data.Country);
                console.log("* Language: " + OMDBResponse.data.Language);
                console.log("* Plot: " + OMDBResponse.data.Plot);
                console.log("* Actors: " + OMDBResponse.data.Actors);
            })
    }
}

// Do what it says function
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var randomText = data.split(",");
        typeRequest = randomText[0];
        dataRequest = randomText[1];
        switchFunction();
    })
}


switchFunction();