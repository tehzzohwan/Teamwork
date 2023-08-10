import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from  './components/Login/Login';
import Admin from  './components/Admin/Admin';
import Home from  './components/Home/Home';
import User from  './components/User/User';
import Register from  './components/Register/Register';
import Profile from  './components/Profile/Profile';
import Feed from './components/Article';
import Gif from './components/Gif';

import EventBus from "./common/EventBus";


import './App.css';

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

  if (user) {

    setCurrentUser(user);
    setShowAdminBoard(user.role ==="admin");
  }

  EventBus.on("logout", () => {
    logOut();
  });

  return () => {
    EventBus.remove("logout");
  };
}, []);

const logOut = () => {
  AuthService.logout();
  setShowAdminBoard(false);
  setCurrentUser(undefined);
};

  return (
    <div>
      <nav  className="custom-navbar navbar navbar-expand navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
        
        <Link to={"*"} className="navbar-brand">
          Teamwork
        </Link>
        <div className="navbar-nav mr-auto">
               
        {currentUser && (
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            </div>
          )}

          {showAdminBoard && (
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </div>

          <div className="d-flex">
            {currentUser ? (
          <div className=" navbar-nav ml-auto">
            <li className="nav-item ">
              <Link to={"/profile"} className="nav-link">
                {currentUser.first_name.toUpperCase()}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li> */}
          </div>
        )}
          </div>
        </div>
      </nav>

      <div className="container mt-3 pt-5">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<Feed />} />
          <Route path="/gif/:id" element={<Gif />} />
          <Route path="/del/:id" element={<User />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
