import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");
  const [termValid, setTermValid] = useState(false);

  const inputCheck = (input) => {
    input.length > 0 ? setTermValid(true) : setTermValid(false);
  };

  const inputChangeHandler = (event) => {
    inputCheck(event.target.value);
    setTerm(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    
    if (termValid) {
      props.onSubmit(1, term.trim());
      console.log("Term Submitted");
    } else {
      console.log("Term Invalid");
    }
  };

  return (
    <div className="search-bar">
      <form action="." onSubmit={searchSubmitHandler}>
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
