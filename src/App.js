import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

//API Key = 2ff868df
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=2ff868df';


const movie1 = { //movie object
  "Title": "Rise of the Planet of the Apes",
  "Year": "2011",
  "imdbID": "tt1318514",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYzE3ZmNlZTctMDdmNy00MjMzLWFmZmYtN2M5N2YyYTQ1ZDJjXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
}

const Cat = () => {

  const [movies, setMovies] = useState([]); //setting up dynamic display of movies for an array
  const [searchTerm, setSearchTerm] = useState(''); //setting search to an empty string at start/initial load 


  useEffect(() => {
    searchMovies('Apes'); //search for this on initial load
  }, []); 



  const searchMovies = async (title) => { //searching titles
    const response = await fetch(`${API_URL}&s=${title}`); //searching api for titles 
    const data = await response.json(); //parsing the code | await means it will take some time to do 
    
    setMovies(data.Search); //displaying movies within the search aspect (console.log(data.search))
  };


  return (
    <div className="app"> 
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          placeholder="Search for a Movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img 
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
          />
      </div>

      {movies?.length > 0 //looping through all elements 
        ? ( //run this if true
          <div className="container">
            {movies.map((movie) => ( //looping over movies | each movie
              <MovieCard movie={movie}/> //passing movie prop to MovieCard 
            ))}
          </div>
        ) : //else do this
        (
          <div className="empty"> 
            <h2>No Movies Found</h2>
          </div>
        )}

    </div>
  );
}

export default Cat;