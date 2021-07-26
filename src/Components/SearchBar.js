import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");
  const [termValid, setTermValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setTermValid(term.trim().length > 0);
    }, 600);

    return () => {
      clearTimeout(identifier);
    };
  }, [term]);

  const inputChangeHandler = (event) => {
    console.log(event.target.value)
    setTerm(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();

    termValid && props.onSubmit(1, term.trim());
  };

  return (
    <div className="search-bar">
      <form onSubmit={searchSubmitHandler}>
        <div className="search-input">
          <SearchIcon />
          <input
            htmlFor="search term"
            type="search"
            value={term}
            placeholder="Search..."
            onChange={inputChangeHandler}
          ></input>
        </div>

        <button className="search-submit" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
