import React, { useEffect, useRef, useState } from "react";
import { User } from "../redux/userSlice";

interface EditUserFormProps {
  user: User;
  onUpdateUser: (id: number, updatedUser: User) => void;
  closeForm: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  onUpdateUser,
  closeForm,
}) => {
  const [formData, setFormData] = useState<User>({ ...user });
  const formRef = useRef<HTMLDivElement>(null); // Ref for form container

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        closeForm(); // Close form when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [closeForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData.id, formData);
    closeForm();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-form" ref={formRef}>
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Image Link:</label>
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
    </div>
  );
};

export default EditUserForm;
