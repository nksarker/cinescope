import { useState, useEffect } from 'react'
import './App.css'
import SearchIcon from './assets/search.svg';
import MovieCard from './MovieCard';

//api=3b3463b4
const api_url = 'http://www.omdbapi.com?apikey=3b3463b4';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async(title) => {
    const response = await fetch(`${api_url}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  return (
    <div className='app'>
      <h1 className='heading'>CineScope</h1>
      <div className='search'>
        <input placeholder='Search for movies' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)}/>
      </div>
      {
        movies?.length>0?
        (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>   
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  )
}

export default App
