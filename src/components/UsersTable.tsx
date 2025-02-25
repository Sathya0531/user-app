import React, { useState } from "react";
import "../styles/form_styles.css";
import { User } from "../redux/userSlice";
import EditUserForm from "./EditUserForm"; // Create this component

interface UsersTableProps {
  users: User[];
  onDeleteUser: (id: number) => void;
  onUpdateUser: (id: number, user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onDeleteUser,
  onUpdateUser,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="users-container">
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
                  <button
                    className="edit-btn"
                    onClick={() => setSelectedUser(user)}
                  >
                    Edit
                  </button>
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

      {selectedUser && (
        <div className="edit-panel">
          <button className="close-btn" onClick={() => setSelectedUser(null)}>
            ✖
          </button>
          <EditUserForm
            user={selectedUser}
            onUpdateUser={onUpdateUser}
            closeForm={() => setSelectedUser(null)}
          />
        </div>
      )}
    </div>
  );
};

export default UsersTable;
