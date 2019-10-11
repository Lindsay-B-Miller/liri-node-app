require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var typeRequest = process.argv[2]
var dataRequest = process.argv.slice(3).join("+");




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
}



// Spotify Function
function spotifyFunction() {
    spotify.search({ type: 'track', query: dataRequest, limit: 1 })
        .then(function (spotifyResponse) {
            console.log("Artist: " + spotifyResponse.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + spotifyResponse.tracks.items[0].name);
            console.log("Preview Url: " + spotifyResponse.tracks.items[0].preview_url);
            console.log("Album Name: " + spotifyResponse.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        })
}

// Bands in Town Function
function bandsInTownFunction() {
    var bandsRequest;
    if (dataRequest !== undefined) {
        bandsRequest = dataRequest;
    }
    else {
        bandsRequest = "Celine Dion"
    }

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
        .catch(function (err) {
            console.log(err);
        })
}

// OMDB Function
function OMDBFunction() {
    var OMDBRequest;
    if (dataRequest !== undefined) {
        OMDBRequest = dataRequest;
    }
    else {
        OMDBRequest = "Mr. Nobody"
    }

    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody")
        .then(function (OMDBResponse) {
            // console.log(OMDBResponse.data);
            console.log("* Title: " + OMDBResponse.data.Title);
            console.log("* Year of Release: " + OMDBResponse.data.Year);
            console.log("* IMDB Rating: " + OMDBResponse.data.Ratings[0].Value);
            console.log("* Rotton Tomatoes Rating: " + OMDBResponse.data.Ratings[1].Value);
            console.log("* Country of Production: " + OMDBResponse.data.Country);
            console.log("*Language: " + OMDBResponse.data.Language);
            console.log("*Plot: " + OMDBResponse.data.Plot);
            console.log("*Actors: " + OMDBResponse.data.Actors);
        })
}