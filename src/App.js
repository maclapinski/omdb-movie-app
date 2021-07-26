import React, { useState } from "react";
import { createPortal } from "react-dom";
import MobileNominationsDrawer from "./Components/MobileNominationsDrawer";
import SearchBar from "./Components/SearchBar";
import omdb from "./api/omdb";
import LottieAnimation from "../src/Components/Lottie";
import MovieList from "./Components/MovieList";
import PageButtons from "./Components/PageButtons";
import NominationsList from "./Components/NominationsList";
import movieClapper from "../src/media/movie-clapper-open.svg";
import cinema from "./media/45737-cinema-infos-and-resources.json";
import SnackBar from "./Components/Snackbar";
import "./styles/css/style.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [nominationsList, setNominationsList] = useState([]);
  const [nominationsNumber, setNominationsNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(1);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  console.log("App running");

  const termSubmitHandler = async (number, term) => {
    setIsLoading(true)
    const apiKey = "d4e0320";
    setSearchTerm(term);
    setPageNumber(number);
    const response = await omdb.get("", {
      params: { s: term.trim(), page: number, apikey: apiKey },
    });

    if (response.data.Response === "True") {
      
      if (number === 1) {
        setPageCount(response.data.totalResults);
      }
      const searchData = duplicateCheck(response.data.Search);

      setMovieList(nominationsCheck(searchData));
      setIsLoading(false)
    } else {
      handleAlertOpen(
        "No movies found. Incorrect or too short search term.",
        "error"
      );
      setMovieList([]);
    }
    setPageNumber(number);
  };
  const pageNumberChangeHandler = (number) => {
    
    termSubmitHandler(number, searchTerm);
  };

  const nominationHandler = (nominatedMovie) => {
    if (nominationsNumber === 5) {
      handleAlertOpen("You can't nominate more than 5 movies!", "error");
    } else {
      setIsNominatedProperty(nominatedMovie.imdbID, true);
      setNominationsNumber(nominationsNumber + 1);
      if (nominationsNumber === 4) {
        console.log(nominationsNumber);
        handleAlertOpen(
          "You successfully nominated the fifth movie and used all your nominations!",
          "success"
        );
      } else {
        handleAlertOpen("Movie successfully nominated!", "success");
      }

      setNominationsList((prevNominations) => {
        return [...prevNominations, nominatedMovie];
      });
    }
  };

  //find move deleted from nominations list, update nominations list,
  //set nominate button active for the deleted movie
  const nominationDeleteHandler = (imdbID) => {
    const nominations = [...nominationsList];
    const updatedNominations = nominations.filter(
      (nomination) => nomination.imdbID !== imdbID
    );

    setNominationsList(updatedNominations);
    handleAlertOpen("Nomination successfully removed!", "success");
    setIsNominatedProperty(imdbID, false);
    setNominationsNumber(nominationsNumber - 1);
  };

  const setIsNominatedProperty = (imdbID, isNomination) => {
    const searchResults = [...movieList];

    searchResults.forEach((movie) => {
      if (imdbID === movie.imdbID) {
        movie.isNominated = isNomination;
      }
    });

    setMovieList([...searchResults]);
  };

  //set number of pages for current search
  const setPageCount = (totalResults) => {
    if ((totalResults / 10) % 1 === 0) {
      setLastPageNumber(parseInt(totalResults / 10));
    } else if (totalResults < 10) {
      setLastPageNumber(1);
    } else {
      setLastPageNumber(parseInt(totalResults / 10 + 1));
    }
  };

  // sort and remove duplicated objects
  const duplicateCheck = (results) => {
    const sortedResults = [...results].sort((a, b) =>
      a.imdbID === b.imdbID ? 1 : b.imdbID > a.imdbID ? -1 : 0
    );

    for (let i = 1, prevMovie = 0; i < sortedResults.length; i++) {
      if (sortedResults[i].imdbID === sortedResults[prevMovie].imdbID) {
        sortedResults.splice(sortedResults.indexOf(sortedResults[i]), 1);
        i--;
      } else {
        prevMovie++;
      }
    }
    return sortedResults;
  };

  const nominationsCheck = (results) => {
    const checkedResults = [...results];

    checkedResults.forEach((result) => {
      nominationsList.forEach((nomination) => {
        if (result.imdbID === nomination.imdbID) {
          result.isNominated = true;
        } else {
          result.isNominated = false;
        }
      });
    });

    return checkedResults;
  };

  const handleAlertOpen = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <div className="wrapper">
      <div className="body">
        <MobileNominationsDrawer
          nominations={nominationsList}
          onDelete={nominationDeleteHandler}
          nominationsNumber={nominationsNumber}
        />
        <div className="container">
          <div className="title">
            <img src={movieClapper} alt={"movie clapper"} />
            <h1>Movie Nominations</h1>
          </div>

          <SearchBar onSubmit={termSubmitHandler} />
          {movieList.length === 0 ? (
            <div className="search-intro">
              <LottieAnimation lotti={cinema} height={200} width={200} />
              <p>
                Use the search bar above to find movies you want to nominate.
                You can choose five.
              </p>
              <p>
                If you change your mind you can remove movies from the
                nomination list at any time.
              </p>
              <p>Enjoy!</p>
            </div>
          ) : (
            <div>
              {isLoading ? <p>Loading...</p>: <MovieList
                onNomination={nominationHandler}
                searchResults={movieList}
              />}
              
              <PageButtons
                pageNumber={pageNumber}
                lastPageNumber={lastPageNumber}
                onChange={pageNumberChangeHandler}
              />
            </div>
          )}
        </div>
        <NominationsList
          nominations={nominationsList}
          onDelete={nominationDeleteHandler}
        />
        {createPortal(
          <SnackBar
            alertState={openAlert}
            close={handleAlertClose}
            message={alertMessage}
            type={alertType}
          />,
          document.getElementById("alert-root")
        )}
      </div>
    </div>
  );
};

export default App;
