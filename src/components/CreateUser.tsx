import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { createUser } from "../redux/userSlice";

const CreateUser: React.FC = () => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createUser({ name, job }));
    navigate("/users");
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="Job"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
