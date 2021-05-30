import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NominatedMovieDetails from "./NominatedMovieDetails";
import "./MobileNominationsMenu.css";

const MobileNominationsMenu = ({ nominations, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [len, setLen] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const nominationsLength = () => {
    const x = [...nominations];
    setLen(x.length);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Nominations {len}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {nominations.map((movie) => {
          return (
            <MenuItem>
              <NominatedMovieDetails
                key={movie.imdbID}
                title={movie.Title}
                imdbID={movie.imdbID}
                poster={movie.Poster}
                year={movie.Year}
                isNominated={movie.isNominated}
                onDelete={onDelete}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
export default MobileNominationsMenu;
