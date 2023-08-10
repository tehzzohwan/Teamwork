import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import './Register.css'

import AuthService from "../../services/auth.service";

const Register = () => {
  const form = useRef();

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    job_role: "",
    role: "",
    department: "",
    gender: "",
    address: ""
  });

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    const response = await AuthService.register(inputs)
        if (response.status === "success") {
         setMessage(response.data.message);
         setSuccessful(true);
         setInputs({});

        } else {
            setMessage(response.data.error);
        }
  };

  return (
    <main className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                   <Form className="needs-validation" onSubmit={handleRegister} ref={form} noValidate>
                    {!successful && (  
                     <div className="row">
                      <div className="col-md-6 mb-4">

                        <div className="form-floating">
                          <input
                            type="text"
                            id="firstName"
                            className="form-control form-control-md"
                            name="first_name"
                            value={inputs.first_name}
                            onChange={handleChange}
                            required />
                          <label htmlFor="firstName">First Name</label>
                          <div class="valid-feedback">
                            Looks good!
                          </div>
                          <div class="invalid-feedback">
                            This section is required.
                          </div>
                        </div>

                      </div>
                      <div className="col-md-6 mb-4">

                        <div className="form-floating">
                          <input
                            type="text"
                            id="lastName"
                            className="form-control form-control-md"
                            name="last_name"
                            value={inputs.last_name}
                            onChange={handleChange}
                            required />
                          <label className="form-label" htmlFor="lastName">Last Name</label>
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4">

                          <div className="form-floating ">
                            <input
                              id="address"
                              type="text"
                              className="form-control form-control-md"
                              name="address"
                              value={inputs.address}
                              onChange={handleChange}
                              required />
                            <label htmlFor="address" className="form-label">Address</label>
                          </div>

                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <h6 className="mb-2 pb-1">
                            Gender:
                          </h6>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="femaleGender"
                              value="female"
                              checked={inputs.gender === "female"}
                              onChange={handleChange}
                               />
                            <label className="form-check-label" htmlFor="femaleGender">Female</label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="maleGender"
                              value="male"
                              checked={inputs.gender === "male"}
                              onChange={handleChange} />
                            <label className="form-check-label" htmlFor="maleGender">Male</label>
                          </div>

                        </div>

                        <div className="col-md-6 mb-4">

                          <h6 className="mb-2 pb-1">Role: </h6>

                          <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="adminRole"
                                value="admin"
                                checked={inputs.role === "admin"}
                                onChange={handleChange}
                                 />
                            <label className="form-check-label" htmlFor="adminRole">Admin</label>
                          </div>

                          <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="employeeRole"
                                value="employee"
                                checked={inputs.role === "employee"}
                                onChange={handleChange} />
                            <label className="form-check-label" htmlFor="employeeRole">Employee</label>
                          </div>

                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-floating">
                            <input
                              type="email"
                              id="emailAddress"
                              className="form-control form-control-md"
                              name="email"
                              value={inputs.email}
                              onChange={handleChange}
                              required />
                            <label className="form-label" htmlFor="emailAddress">Email</label>
                          </div>

                        </div>
                        <div className="col-md-6 mb-4 pb-2">

                          <div className="form-floating">
                            <input
                              type="password"
                              id="password"
                              className="form-control form-control-md"
                              name="password"
                              value={inputs.password}
                              onChange={handleChange}
                              required />
                            <label className="form-label" htmlFor="password">Password </label>
                          </div>

                        </div>
                      </div><div className="row">
                        <div className="col-6 input-group mb-3">
                          <label className="input-group-text" htmlFor="jobRole">Job Role</label>
                          <select className="form-select" name="job_role" value={inputs.job_role} onChange={handleChange} id="jobRole" required>
                            <option defaultValue>Choose...</option>
                            <option value="manager">Manager</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="h_o_d">H.O.D</option>
                            <option value="staff">Staff</option>
                          </select>
                        </div>

                        

                       <div className="col-6 input-group mb-3">
                          <label className="input-group-text" htmlFor="department">Department</label>
                          <select className="form-select" name="department" value={inputs.department} onChange={handleChange} id="department" required>
                          <option defaultValue>Choose...</option>
                            <option value="human_recources">Human Resources</option>
                            <option value="marketing">Marketing</option>
                            <option value="accounting">Accounting</option>
                            <option value="kitchen">Kitchen</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4 pt-2 col-5">
                        <button className="btn btn-primary w-100 py-2" type="submit" disabled={(inputs.length >= 8) ? true : false}>Register</button>
                      </div>
                    </div>
                    )}
                    {message && (
                      <div className="form-group">
                        <div 
                          className={
                            successful ? "alert alert-success" : "alert alert-danger"
                          }
                        >
                          {message}
                        </div>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
    
)
};

export default Register;
