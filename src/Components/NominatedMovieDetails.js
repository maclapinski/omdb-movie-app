import React from "react";

const NominatedMovieDetails = ({
  title,
  imdbID,
  year,
  poster,
  isNominated,
  onDelete,
}) => {
  const nominationDeleteHandler = (event) => {
    onDelete(event.target.value);
  };

  return (
    <div className="nomination" key={imdbID}>
      <img src={poster} alt={title}></img>
      <div className="details">
      <div className="title">
          <p>{title}</p>
        </div>
        <div className="year">
          <p>{year}</p>
        </div>
        <button type="button" value={imdbID} onClick={nominationDeleteHandler}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default NominatedMovieDetails;
