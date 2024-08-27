import React, { useEffect } from "react";
import UserList from "./Components/UserList";
import SearchBar from "./Components/SearchBar";
import Pagination from "./Components/Pagination";
import userStore from "./Stores/UserStore";
import "./App.css";

function App() {
  useEffect(() => {
    userStore.fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User List</h1>
        <SearchBar />
      </header>
      <div className="App-content">
        <UserList />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
