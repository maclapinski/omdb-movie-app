import React from "react";
import NominatedMovieDetails from "./NominatedMovieDetails";

const NominationsList = ({ nominations, onDelete }) => {
  return (
    <div className="nominations-list">
      <div className="title"><h2>Your nominations</h2></div>
       
      {nominations.length === 0 ? (
        <div className="no-nominations">
         
          <p>You don't have any nominated movies. Search a movie and add a nomination.</p>

        </div>
      ) : (
        nominations.map((movie) => {
          return (
            <NominatedMovieDetails
              key={movie.imdbID}
              title={movie.Title}
              imdbID={movie.imdbID}
              poster={movie.Poster}
              year={movie.Year}
              isNominated={movie.isNominated}
              onDelete={onDelete}
            />
          );
        })
      )}
      {}
    </div>
  );
};
export default NominationsList;
