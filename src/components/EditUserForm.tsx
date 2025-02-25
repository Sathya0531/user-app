import React, { useState } from "react";
import { User } from "../redux/userSlice";

interface EditUserFormProps {
  user: User;
  onUpdateUser: (id: number, user: User) => void;
  closeForm: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  onUpdateUser,
  closeForm,
}) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData.id, formData);
    closeForm();
  };

  return (
    <div className="edit-form">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-lable">
            <span style={{ color: "red", marginRight: "3px" }}>*</span>
            <label>Email:</label>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.first_name}
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
            value={formData.last_name}
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
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" className="cancel-btn" onClick={closeForm}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
