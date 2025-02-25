import { Grid3x3, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { deleteUser, fetchUsers } from "../redux/userSlice";
import "../styles.css"; // Import styles
import SearchBar from "./SearchBar";
import UsersGrid from "./UsersGrid";
import UsersTable from "./UsersTable";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 2) {
      return [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="pagination-btn-container">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? "selected" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

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

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
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
        <UsersTable users={filteredUsers} onDeleteUser={handleDelete} />
      ) : (
        <UsersGrid users={filteredUsers} onDeleteUser={handleDelete} />
      )}

      <Pagination
        totalPages={totalPages} // Use API response
        onPageChange={(page) => dispatch(fetchUsers(page))}
        currentPage={currentPage}
      />
    </div>
  );
};

export default UsersList;
