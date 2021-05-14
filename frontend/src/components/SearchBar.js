import React from "react";

export default function SearchBar({ searchHandler, onChangeHandler, value }) {
  return (
    <div className="horizontal-center mar-top-1">
      <div className="search">
        <input type="text" value={value} onChange={onChangeHandler} />
        <button onClick={searchHandler} className="mar-top-1 btn-primary-2">
          search
        </button>
      </div>
    </div>
  );
}
