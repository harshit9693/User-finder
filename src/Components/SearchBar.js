import React from "react";
import userStore from "../Stores/UserStore";
import { observer } from "mobx-react-lite";

const SearchBar = observer(() => {
  const handleSearch = (event) => {
    userStore.setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={userStore.searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />
    </div>
  );
});

export default SearchBar;
