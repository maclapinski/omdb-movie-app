import React, { useState } from "react";
import SimpleMenu from "./Components/MobileNominationsMenu";
import MobileNominationsDrawer from "./Components/MobileNominationsDrawer";
import SearchBar from "./Components/SearchBar";
import omdb from "./api/omdb";
import MovieList from "./Components/MovieList";
import PageButtons from "./Components/PageButtons";
import NominationsList from "./Components/NominationsList";
import movieClapper from "../src/media/movie-clapper-open.svg";
import "./styles/css/style.css";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [nominationsList, setNominationsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(1);
  const [nominationsNumber, setNominationsNumber] = useState(0);

  const onTermChangeHandler = (term) => {
    setSearchTerm(term);
  };

  const onTermSubmitHandler = async (number) => {
    const apiKey = "d4e0320";
    const response = await omdb.get("", {
      params: { s: searchTerm, page: setPage(number), apikey: apiKey },
    });

    if (!number) {
      setPageCount(response.data.totalResults);
    }
    const searchData = duplicateCheck(response.data.Search);
    if (nominationsList.length === 0) {
      searchData.map((movie) => {
        movie.isNominated = false;
      });
      setMovieList(searchData);
    } else {
      nominationsCheck(searchData);
    }
  };
  const onPageNumberChangeHandler = (number) => {
    setPageNumber(number);
    onTermSubmitHandler(number);
  };

  const onNominationHandler = (nominatedMovie) => {
    setIsNominatedProperty(nominatedMovie.imdbID, false);
    setNominationsNumber(nominationsNumber + 1);
    // const searchResults = [...movieList];
    // searchResults.map((movie) => {
    //   if (nominatedMovie.imdbID === movie.imdbID) {
    //     movie.isNominated = true;
    //   }
    // });
    // setMovieList([...searchResults]);
    setNominationsList((prevNominations) => {
      return [...prevNominations, nominatedMovie];
    });
  };

  //find move deleted from nominations list, update nominations list,
  //set nominate button active for the deleted movie
  const onNominationDeleteHandler = (imdbID) => {
    const nominations = [...nominationsList];
    setNominationsNumber(nominationsNumber - 1);
    const checkDeleted = (nomination) => {
      console.log(nomination);
      return nomination.imdbID !== imdbID;
    };
    const updatedNominations = nominations.filter(checkDeleted);
    setNominationsList(updatedNominations);
    setIsNominatedProperty(imdbID, true);
  };

  const setIsNominatedProperty = (imdbID, isDeleteAction) => {
    const searchResults = [...movieList];
    searchResults.map((movie) => {
      if (imdbID === movie.imdbID && isDeleteAction) {
        movie.isNominated = false;
      } else if (imdbID === movie.imdbID && !isDeleteAction) {
        movie.isNominated = true;
      }
    });
    setMovieList([...searchResults]);
  };

  //set current page
  const setPage = (number) => {
    let page = 1;
    //if next or previous page button clicked,
    //new page number is provided and first part of the statement is activated.
    //if new search is submitted, page number is set to 1
    if (number) {
      page = number;
      setPageNumber(number);
    } else {
      setPageNumber(1);
    }
    return page;
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

  // sort and check if returned array of movies has duplicated objects
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
    const newResults = [...results];
    newResults.map((newResult) => {
      nominationsList.map((nomination) => {
        if (newResult.imdbID === nomination.imdbID) {
          newResult.isNominated = true;
        }
      });
    });
    setMovieList(newResults);
  };

  return (
    <div className="wrapper">
      <div className="body">
        <MobileNominationsDrawer
          nominations={nominationsList}
          onDelete={onNominationDeleteHandler}
          nominationsNumber={nominationsNumber}
        />
        <div className="container">
          <div className="title">
            <img src={movieClapper} alt={"movie clapper"} />
            <h1>Movie Nominations</h1>
          </div>

          <SearchBar
            onSubmit={onTermSubmitHandler}
            onChange={onTermChangeHandler}
          />
          {movieList.length === 0 ? (
            <div>
              <p>Search for movies you want to nominate.</p>
            </div>
          ) : (
            <div>
              <MovieList
                onNomination={onNominationHandler}
                searchResults={movieList}
              />{" "}
              <PageButtons
                pageNumber={pageNumber}
                lastPageNumber={lastPageNumber}
                onChange={onPageNumberChangeHandler}
              />
            </div>
          )}
        </div>
        <NominationsList
          nominations={nominationsList}
          onDelete={onNominationDeleteHandler}
        />
      </div>
    </div>
  );
};

export default App;
