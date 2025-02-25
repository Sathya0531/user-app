import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { createUser, fetchUsers } from "../redux/userSlice";

interface CreateUserFormProps {}

const CreateUserForm: React.FC<CreateUserFormProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.avatar
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(createUser(formData));
    dispatch(fetchUsers(1));
    navigate("/users");
  };

  return (
    <div className="create-form">
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-lable">
            <span style={{ color: "red", marginRight: "3px" }}>*</span>
            <label>Email:</label>
          </div>
          <input
            type="email"
            placeholder="Please enter Email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <div className="form-lable">
            <span style={{ color: "red", marginRight: "3px" }}>*</span>
            <label>First Name:</label>
          </div>
          <input
            type="text"
            name="first_name"
            placeholder="Please enter First Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <div className="form-lable">
            <span style={{ color: "red", marginRight: "3px" }}>*</span>
            <label>Last Name:</label>
          </div>
          <input
            type="text"
            name="last_name"
            placeholder="Please enter Last Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <div className="form-lable">
            <span style={{ color: "red", marginRight: "3px" }}>*</span>
            <label>Profile Image Link:</label>
          </div>

          <input
            type="text"
            placeholder="Please enter Profile Image Link"
            name="avatar"
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
