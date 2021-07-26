import React from "react";
import MovieDetails from "./MovieDetails";

const MovieList = ({ searchResults, onNomination }) => {
  console.log("movie list running")
  return (
    <div className="movie-list">
      {searchResults.map((movie) => (
        <MovieDetails
          key={movie.imdbID}
          title={movie.Title}
          imdbID={movie.imdbID}
          poster={movie.Poster}
          year={movie.Year}
          isNominated={movie.isNominated}
          onNomination={onNomination}
        />
      ))}
    </div>
  );
};

export default MovieList;
