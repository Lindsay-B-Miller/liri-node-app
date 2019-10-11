require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var typeRequest = process.argv[2]
var dataRequest = process.argv[3]

// nodeArgs.slice(2).join("+");


switch (typeRequest) {
    case "spotify-this-song":
        spotifyFunction();
        break;
    case "concert-this":
        bandsInTownFunction();
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