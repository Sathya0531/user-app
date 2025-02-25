import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import { User } from "../redux/userSlice";

interface UsersTableProps {
  users: User[];
  onDeleteUser: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onDeleteUser }) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th></th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <img
                src={user.avatar}
                alt={user.first_name}
                className="profile-img"
              />
            </td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>
              <div className="action-buttons">
                <Link to={`/users/edit/${user.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
