import React, { useState } from "react";
import axios from "axios";
import './style.css';
import './star-icon.svg'
import './star-icon'

function MovieSearch() {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState(null);

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleSearchClick = () => {
    if (movieName.length <= 0) {
      alert("Please enter a movie name");
    } else {
      axios
        .get(`http://www.omdbapi.com/?t=${movieName}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`)
        .then((response) => {
          if (response.data.Response === "True") {
            setMovieData(response.data);
          } else {
            alert(response.data.Error);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error occurred");
        });
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input type="text" id="movie-name" placeholder="Enter movie name here..." value={movieName} onChange={handleInputChange} />
        <button id="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      {movieData ? (
        <div id="result">
          <div className="info">
            <img src={movieData.Poster} className="poster" alt={movieData.Title} />
            <div>
              <h2>{movieData.Title}</h2>
              <div className="rating">
                {/* <img src="star-icon.svg" alt="star icon" /> */}
                <h4>IMDb Rating: {movieData.imdbRating}</h4>
              </div>
              <div className="details">
                <span>{movieData.Rated}</span>
                <span>{movieData.Year}</span>
                <span>{movieData.Runtime}</span>
              </div>
              <div className="genre">
                <div>{movieData.Genre.split(", ").join("    ")}</div>
              </div>
            </div>
          </div>
          <h3>Plot:</h3>
          <p>{movieData.Plot}</p>
          <h3>Cast:</h3>
          <p>{movieData.Actors}</p>
        </div>
      ) : null}
    </div>
  );
}

export default MovieSearch;
