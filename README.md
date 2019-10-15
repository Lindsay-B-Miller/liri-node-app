# liri-node-app
The Liri Node App takes in user queries and returns information about songs, concerts, or movies. Based on the user's choice of spotify-this-song, movie-this, or concert-this (first argument), the app will generate and log information from Spotify, OMDB BandsInTown, respectively. Spotify is queried using their API while BandsInTown and OMDB are queried with axios. After selecting the intended source, the remaining words typed into the terminal are concatenated and used to search the respective database. Ex: spotify-this-song Hey Jude will take "Hey Jude" as a string to query the Spotify API. For each function, the app will return a default value when no value is entered after the first argument. In addition, the function do-what-it-says takes the parameters from the random.txt file and generates an output in the terminal.

## Getting Started
To set up your project locally:

### Prerequisites
1. Initialize a `package.json`: `npm init -y`
2. Install axios: npm install axios
3. Install moment: npm install moment
4. Install dotenv: npm install dotenv
5. Create a `.env` file. Inside the file, insert the following code, replacing the text after =  with your own Spotify API keys.
- Get a free Spotify API key at https://developer.spotify.com/my-applications/#!/

` ` `
SPOTIFY_ID=your-spotify-id

SPOTIFY_SECRET=your-spotify-secret
` ` `
### Installation
1. Clone the repo: `git clone git@github.com:Lindsay-B-Miller/liri-node-app.git`


## Usage
This app is designed to run in the terminal. As is customary with node, enter node [filename] before each of the directions below. For this app, node liri.js will run the program.
1. Type the first argument. This argument can be one of four choices: 
  a. `spotify-this-song` (runs the Spotify API)
  b. `movie-this` (runs axios to query OMDB)
  c. `concert-this` (runs axios to query BandsInTown)
  d. `do-what-it-says` (runs the arguments listed in the random.txt file--see #3 below)
2. Type the second argument. This argument will specify the data requested from a-c above. Because of the `.slice(3).join("+")`, this argument does not require quotations.

Examples: 
1. spotify-this-song: 
  `spotify-this-song Why Georgia`
  ![Spotify Screen Shot](/images/Spotify.jpg?raw=true)
2. movie-this:
  `movie-this Back to the Future`
  ![OMDB Screen Shot](/images/Movie.jpg?raw=true)
3. concert-this:
  `concert-this Big Wild`
  ![Concert Screen Shot](/images/ConcertScreenShot.jpg?raw=true)

## Notes: 
- The argument, `do-what-it-says` runs `switchFunction` using the arguments provided in the random.txt file. Any of the arguments a-c above will work in this file for argv[2], and any text after the first argument will query the database specified. To run this function, simply type `node liri.js do-what-it-says` into the terminal. 
![Do What It Says](/images/do-what-it-says.jpg?raw=true)
- If no argument is entered for process.argv[3] (after specifying `movie-this`, `spotify-this-song`, etc.), the app will run a default value. `spotify-this-song` will run with "The Sign," `movie-this` will run with "Mr. Nobody", and `concert-this` will run with "Celine Dion". `do-what-it-says` does not have a default value as both values are specified in the `random.txt` file.
1. `spotify-this-song`
  ![Spotify Blank](/images/SpotifyBlank.jpg?raw=true)
2. `movie-this`
  ![OMDB Screen Shot](/images/MovieBlank.jpg?raw=true)
3. `concert-this`
  ![Concert Blank](/images/ConcertBlank.jpg?raw=true)


## Contact
Lindsay B Miller created this project with instructions from Trilogy Education Services.

Project Link: https://github.com/Lindsay-B-Miller/liri-node-app

Deployed Link: https://lindsay-b-miller.github.io/liri-node-app/

