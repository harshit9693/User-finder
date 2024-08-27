import { makeAutoObservable } from "mobx";
import axios from "axios";

class UserStore {
  users = [];
  searchQuery = "";
  loading = false;
  error = null;
  currentPage = 1;
  usersPerPage = 15;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUsers = async () => {
    this.loading = true;
    try {
      const response = await axios.get("https://randomuser.me/api/?results=100");
      this.users = response.data.results;
      this.error = null;
    } catch (error) {
      this.error = "Failed to fetch users";
    } finally {
      this.loading = false;
    }
  };

  setSearchQuery = (query) => {
    this.searchQuery = query.toLowerCase();
  };

  get filteredUsers() {
    return this.users.filter((user) => {
      const fullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
      return (
        fullName.includes(this.searchQuery) ||
        user.name.first.toLowerCase().includes(this.searchQuery) ||
        user.name.last.toLowerCase().includes(this.searchQuery)
      );
    });
  }
  

  setPage = (pageNumber) => {
    this.currentPage = pageNumber;
  };

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }
}

const userStore = new UserStore();
export default userStore;
