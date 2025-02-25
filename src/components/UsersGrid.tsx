import React, { useEffect, useRef, useState } from "react";
import { User } from "../redux/userSlice";

import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/styles.css";
import "../styles/user_grid.css";

import EditUserForm from "./EditUserForm";

interface UsersGridProps {
  users: User[];
  onDeleteUser: (id: number) => void;
  onUpdateUser: (id: number, user: User) => void;
}

const UsersGrid: React.FC<UsersGridProps> = ({
  users,
  onDeleteUser,
  onUpdateUser,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [modalStyle, setModalStyle] = useState({});
  const gridRef = useRef<HTMLDivElement>(null);

  const openModal = (user: User, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedUser(user);
    setIsEditMode(false);

    const cardRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const gridRect = gridRef.current?.getBoundingClientRect();

    if (gridRect) {
      setModalStyle({
        position: "absolute",
        top: `${cardRect.top - gridRect.top}px`,
        left: `${cardRect.left - gridRect.left}px`,
        width: `${cardRect.width}px`,
        height: `${cardRect.height}px`,
      });
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    setSelectedUser(null);
  }, [users]);

  return (
    <div className="users-grid" ref={gridRef} style={{ position: "relative" }}>
      {users.map((user) => (
        <div
          key={user.id}
          className="user-card"
          onClick={(e) => openModal(user, e)}
        >
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
          </div>
        </div>
      ))}

      {/* Modal positioned exactly over clicked grid item */}
      {selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="action-buttons">
              <button
                className="icon-btn edit-icon"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                className="icon-btn delete-icon"
                onClick={() => {
                  onDeleteUser(selectedUser.id);
                  setSelectedUser(null);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && isEditMode && (
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

export default UsersGrid;
