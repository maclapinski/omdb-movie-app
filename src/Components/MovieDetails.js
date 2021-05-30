import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Add from '@material-ui/icons/Add';

const MovieDetails = ({
  title,
  imdbID,
  year,
  poster,
  isNominated,
  onNomination,
}) => {
  const defaultPoster =
    "https://www.reelviews.net/resources/img/default_poster.jpg";
  const moviePosterSrc = poster === "N/A" ? defaultPoster : poster;
  const nominationHandler = (event) => {
    const nominatedMovie = {
      Title: title,
      Year: year,
      imdbID: imdbID,
      Poster: moviePosterSrc,
      isNominated: true,
    };

    onNomination(nominatedMovie);
  };
  return (
    <div className="movie-details">
      <img src={moviePosterSrc} alt={title}></img>
      <div className="details">
        {title.length > 25 ? (
          <Tooltip title={<h2>{title}</h2>} placement="top">
            <div className="title">
              <p>{title}</p>
            </div>
          </Tooltip>
        ) : (
          <div className="title">
            <p>{title}</p>
          </div>
        )}
        <div className="year">
          <p>{year}</p>
        </div>
        <button
          type="button"
          value={imdbID}
          disabled={isNominated}
          onClick={nominationHandler}
        >
          <Add /> <p>Nominate</p>
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
