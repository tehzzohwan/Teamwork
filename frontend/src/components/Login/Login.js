import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import './Login.css';

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login () {
  const navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setUsername(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
     const result = await AuthService.login(email, password);
      if (result.status === 'success') {
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/home");
        window.location.reload();
      } else {
        setLoading(false);
        setMessage(result.error);
      }  setLoading(false);
    }
  };

  return (
      <main className="form-signin w-100 m-auto pt-5">
      <Form onSubmit={handleLogin} ref={form}>
        <h1 className="h3 mb-3 fw-normal">Please log in</h1>

        <div className="form-floating">
          <input 
            type="email" 
            className="form-control" 
            id="floatingInput" 
            value={email}
            onChange={onChangeEmail}
            validations={[required]}
            placeholder="name@example.com"
            />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input 
            type="password" 
            className="form-control" 
            id="floatingPassword" 
            value={password}
            onChange={onChangePassword}
            validations={[required]}
            placeholder="Password"
            />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input 
            className="form-check-input" 
            type="checkbox" 
            value="remember-me" 
            id="flexCheckDefault"
            />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit" disabled={( email && password) ? false : true}>
          {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )} 
              <span>Log in</span>
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2023</p>

        {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

        <CheckButton style={{ display: "none" }} ref={checkBtn} />

      </Form>
    </main>
  )
}


