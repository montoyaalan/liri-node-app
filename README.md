# liri-node-app
Homework for week 10

# LIRI BOT | homework 10

* LIRI will search Spotify for songs, Bandsintown for concerts, and OMDB for movies.

* LIRI sends request using Axios to Spotify, Bandsintown, and OMDB APIs. The following APIs and Node packages were used:
  * [OMDB API](http://www.omdbapi.com/)
  * [Bandsintown API](http://www.artists.bandsintown.com/bandsintown-api)
  * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
  * [Axios](https://www.npmjs.com/package/axios)
  * [Moment](https://www.npmjs.com/package/moment)
  * [DotEnv](https://www.npmjs.com/package/dotenv)
  
 * LIRI also uses the fs Node package and will take the text inside of random.txt and then use it to call one of LIRI's commands.
  

## Bandsintown
* Search Bandsintown artist events API for an artist and render: venue name, venue location, event date(MM/DD/YYYY).
  
```
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
```
##### node liri.js concert-this
![Image of spotifyThis](https://drive.google.com/file/d/10jWWx7B7NMQr8JmHlmKK86lBzAeXU3WP/view?usp=sharing)

   

## Spotify
* Show the following info about song: artist(s), song name, preview link of song, album. If no song is provided, default to "The Sign" by Ace of Base.

```
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
```
##### node liri.js spotify-this-song 505

![Image of spotifyThis](https://drivegoogle.com/uc?export=view&id=1BxZKCuelkO4iFxIkWTkcFO4fNdYkxdrC)


## OMDB
* Output the following info: title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors. If user doesn't type movie, output "Mr. Nobody."

```
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
```
##### node liri.js movie-this the notebook

![Image of spotifyThis](https://drive.google.com/file/d/1ujnjdkNSD82mr7rTsMQLjd5azbDNX3uk/view?usp=sharing
)



## FS doThis
* Take the text inside random.txt and use it call one of LIRI's commands. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.


```
function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    data = data.split(",");
    var userInput = data[0];
    var userQuery = data[1];

    userCommand(userInput, userQuery);

  });
}

```

##### node liri.js do-what-it-says


