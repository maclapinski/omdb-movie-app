import React from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const PageButtons = ({ pageNumber, onChange, lastPageNumber }) => {
  const onPageNumberChange = async (event) => {
    const nextPage = pageNumber + parseInt(event.currentTarget.value);
    onChange(nextPage);
  };

  return (
    <div className="page-change-buttons">
      <button
        type="button"
        value={-1}
        disabled={pageNumber > 1 ? false : true}
        onClick={onPageNumberChange}
        className="button-prev"
      >
        <ChevronLeftIcon />
      </button>
      <p>
        Page {pageNumber} of {lastPageNumber}
      </p>
      <button
        type="button"
        value={1}
        disabled={pageNumber !== lastPageNumber ? false : true}
        onClick={onPageNumberChange}
        className="button-next"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default PageButtons;
