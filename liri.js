//TO READ AND SET ANY ENVIRONMENT VARIABLES WITH dotenv
require("dotenv").config();

//USE AXIOS FOR REQUESTS 
let axios= require("axios");

//FILE SYSTEMS STANARD TO NODE 
const fs = require("fs");
//IMPORT keys.js AND STORE AS VARIABLE 
var keys = require("./keys.js");

// Spotify API and WRAPPER 
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// REQUIRE MOMENT 
const moment = require("moment");

//OMDB API
let omdb = keys.omdb;

//BANDS IN TOWN API 
let bandsintown= keys.bandsintown;

//USER INPUT AND COMMAND 
let userInput=process.argv[2];
let userQuery=process.argv[3];

function userCommand(userInput, userQuery) {
    switch (userInput) {
      case "concert-this":
        concertThis(userQuery);
        break;
      case "spotify-this-song":
        spotifyThis(userQuery);
        break;
      case "movie-this":
        movieThis(userQuery);
        break;
      case "do-what-it-says":
        doThis();
        break;
      default:
        console.log("Sorry idgi");
        break;
    }
  }
  
  userCommand(userInput, userQuery);

  // Search Bandsintown artist events API for an artist and render: venue name, venue location, event date(MM/DD/YYYY)
// https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp

function concertThis(artist) {
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          artist +
          "/events?app_id=codingbootcamp"
      )
      .then(function(response) {
        // console.log(response)
        console.log("Venue name:", response.data[0].venue.name);
        console.log("Venue location:", response.data[0].venue.city);
        // Format event date
        var eventDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log("Event date:", eventDate);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // Show the following info about song: artist(s), song name, preview link of song, album
// If no song is provided, default to "The Sign" by Ace of Base

function spotifyThis(song) {
    // If no song is provided, default to "The Sign" by Ace of Base
    if (!song) {
      song = "The Sign Ace of Base"; // adding artist name here bc "the sign" returning harry styles response
    }
  
    spotify.search({ type: "track", query: song }, function(err, data) {
      if (err) {
        return console.log(err);
      }
      console.log("Artist(s): ", data.tracks.items[0].album.artists[0].name);
      console.log("Preview: ", data.tracks.items[0].preview_url);
      console.log("Album: ", data.tracks.items[0].album.name);
    });
  }

  // Output the following info: title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
// If user doesn't type movie, output "Mr. Nobody"

function movieThis(movie) {
  // If user doesn't type movie, output "Mr. Nobody"
  if (!movie) {
    movie = "Mr. Nobody";
    console.log(
      "If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/"
    );
    console.log("It's on Netflix!");
  }

  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
    .then(function(data) {
      var results = `
            Title: ${data.data.Title}
            Year: ${data.data.Year}
            IMDB rating: ${data.data.Rated}
            Rotten Tomatoes rating: ${data.data.Ratings[1].Value}
            Country: ${data.data.Country}
            Language: ${data.data.Language}
            Plot: ${data.data.Plot}
            Actors: ${data.data.Actors}
            `;

      console.log(results);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Take the text inside random.txt and use it call one of LIRI's commands
function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    data = data.split(",");
    var userInput = data[0];
    var userQuery = data[1];

    userCommand(userInput, userQuery);

    // switch (userInput) {
    //     case "concert-this":
    //         concertThis(userQuery)
    //         break;
    //     case "spotify-this-song":
    //         spotifyThis(userQuery)
    //         break;
    //     case "movie-this":
    //         movieThis(userQuery)
    //         break;
    //     default:
    //         break;

    // }
  });
}