import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = "mern-deploy-test-production.up.railway.app";

const emptyForm = {
  name: "",
  email: "",
  age: ""
};

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setMessage("Could not load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      ...formData,
      age: Number(formData.age)
    };

    try {
      const url = editingUserId
        ? `${API_BASE_URL}/users/${editingUserId}`
        : `${API_BASE_URL}/users`;

      const method = editingUserId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      setFormData(emptyForm);
      setEditingUserId(null);
      setMessage(editingUserId ? "User updated" : "User added");
      fetchUsers();
    } catch (error) {
      setMessage("Could not save user");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age
    });
    setEditingUserId(user._id);
    setMessage("Editing selected user");
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE"
      });
      setMessage("User deleted");
      fetchUsers();
    } catch (error) {
      setMessage("Could not delete user");
    }
  };

  const handleCancelEdit = () => {
    setFormData(emptyForm);
    setEditingUserId(null);
    setMessage("Edit cancelled");
  };

  return (
    <div className="app">
      <div className="container">
        <h1>User Manager</h1>
        <p className="subtitle">Simple MERN CRUD app for managing users</p>

        <form className="user-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <div className="button-row">
            <button type="submit">
              {editingUserId ? "Update User" : "Add User"}
            </button>
            {editingUserId && (
              <button type="button" className="secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p className="message">{message}</p>}

        <div className="user-list">
          <h2>All Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => (
              <div className="user-card" key={user._id}>
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>Age: {user.age}</p>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
