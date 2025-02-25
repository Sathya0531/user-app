import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import { User } from "../redux/userSlice";

interface UsersGridProps {
  users: User[];
  onDeleteUser: (id: number) => void;
}

const UsersGrid: React.FC<UsersGridProps> = ({ users, onDeleteUser }) => {
  return (
    <div className="users-grid">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-content">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="profile-img"
            />
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>{user.email}</p>
            {/* <div className="action-buttons">
            <Link to={`/users/edit/${user.id}`} className="edit-btn">
              Edit
            </Link>
            <button
              className="delete-btn"
              onClick={() => onDeleteUser(user.id)}
            >
              Delete
            </button>
          </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersGrid;
