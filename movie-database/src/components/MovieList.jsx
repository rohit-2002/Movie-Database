import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for fetching images from TMDb or any other public URL
  const imageBaseUrl = "http://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    axios.get('https://dummyapi.online/api/movies') // Replace with your actual API URL
      .then(response => {
        // Ensure the response contains a valid array of movies
        if (response.data && Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          setError("Invalid response format");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
        setError("Failed to fetch movie data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie-container">
      <h1>Movie Database</h1>
      <div className="movie-grid">
        {movies.map(movie => {
          // If the image path is local, use a fallback URL or your own image source.
          const movieImage = movie.image ? `${imageBaseUrl}${movie.image}` : 'https://via.placeholder.com/200x300.png?text=No+Image';

          return (
            <div className="movie-card" key={movie.id}>
              <img 
                src={movieImage} 
                alt={movie.movie} 
                onError={(e) => e.target.src = 'https://via.placeholder.com/200x300.png?text=No+Image'} // Fallback image if poster is broken
              />
              <div className="movie-info">
                <h2>{movie.movie}</h2>
                <p>Rating: {movie.rating}</p>
                <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">IMDb</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
