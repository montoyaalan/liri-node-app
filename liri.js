require("dotenv").config();

var keys = require("./keys.js");

// Spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMDB
const request = require("request");