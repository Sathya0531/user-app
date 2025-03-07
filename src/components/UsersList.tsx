import { Grid3x3, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { deleteUser, fetchUsers, updateUser, User } from "../redux/userSlice";
import "../styles/styles.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import UsersGrid from "./UsersGrid";
import UsersTable from "./UsersTable";

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, totalPages, currentPage, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]); // Fetch data when currentPage changes

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async (id: number, userData: User) => {
    try {
      await dispatch(updateUser({ id, userData }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // **Filter users based on search text**
  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="users-list">
      <div className="toolbar">
        <div className="left-panel">
          <h2>Users</h2>
        </div>
        <div className="right-panel">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <Link to="/users/create" className="edit-btn">
            Create User
          </Link>
        </div>
      </div>

      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
          onClick={() => setViewMode("table")}
        >
          <Grid3x3 size={18} /> Table
        </button>
        <button
          className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          <List size={18} /> Card
        </button>
      </div>

      {viewMode === "table" ? (
        <UsersTable
          users={filteredUsers}
          onDeleteUser={handleDelete}
          onUpdateUser={handleUpdateUser}
        />
      ) : (
        <UsersGrid
          users={filteredUsers}
          onDeleteUser={handleDelete}
          onUpdateUser={handleUpdateUser}
        />
      )}

      <Pagination
        totalPages={totalPages}
        onPageChange={(page: number) => dispatch(fetchUsers(page))}
        currentPage={currentPage}
      />
    </div>
  );
};

export default UsersList;
