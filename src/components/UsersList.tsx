import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUsers } from "../redux/userSlice";

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <Link to="/users/create">➕ Create New User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img
              src={user.avatar}
              alt={user.first_name}
              style={{
                width: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <strong>
              {user.first_name} {user.last_name}
            </strong>{" "}
            - {user.email}
            <Link to={`/users/edit/${user.id}`}>✏️ Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
