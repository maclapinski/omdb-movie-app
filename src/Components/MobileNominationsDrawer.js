import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TheatersIcon from "@material-ui/icons/Theaters";
import NominatedMovieDetails from "./NominatedMovieDetails";
import Badge from "@material-ui/core/Badge";
import empty from "../media/11192-empty.json";
import LottieAnimation from "../Components/Lottie";

const useStyles = makeStyles({
  list: {
    width: "auto",
  },
  fullList: {
    width: "auto",
  },
});

export default function MobileNominationsDrawer({
  nominations,
  nominationsNumber,
  onDelete,
}) {
  const classes = useStyles();
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ right: open });
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <h2>Your nominations</h2>
      {nominations.length === 0 ? (
        <div className="no-nominations">
          <p>You don't have any nominated movies.</p>
          <LottieAnimation lotti={empty} height={150} width={150} />
        </div>
      ) : (
        <List>
          {nominations.map((movie) => (
            <ListItem button key={movie.imdbID}>
              <NominatedMovieDetails
                key={movie.imdbID}
                title={movie.Title}
                imdbID={movie.imdbID}
                poster={movie.Poster}
                year={movie.Year}
                isNominated={movie.isNominated}
                onDelete={onDelete}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <nav className="navbar">
        <Button onClick={toggleDrawer(true)}>
          <Badge badgeContent={nominationsNumber} color="secondary">
            <TheatersIcon style={{ fontSize: "xx-large" }} />
          </Badge>
        </Button>
      </nav>

      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer(false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
}
