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