import React from "react";
import NominatedMovieDetails from "./NominatedMovieDetails";
import TheatersIcon from "@material-ui/icons/Theaters";
import Add from "@material-ui/icons/Add";

const NominationsList = ({ nominations, onDelete }) => {
  return (
    <div className="nominations-list">
      <div className="title"><TheatersIcon style={{ fontSize: "xx-large" }} /><h2>Your nominations</h2></div>
       
      {nominations.length === 0 ? (
        <div className="no-nominations">
         
          <p>You dont't have any nominations yet. Search a movie and add a nomination.</p>

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
