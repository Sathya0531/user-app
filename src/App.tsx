import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import Login from "./components/Login";
import Register from "./components/Register";
import UsersList from "./components/UsersList";
import { store } from "./redux/store";
import "./App.css"; // Import CSS file for styling

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
