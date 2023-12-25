import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    axios
    .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const customAuth = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    let foundUser = null;

    users.forEach((user) => {
      if (user.userUsername === username && user.userPassword === password) {
        foundUser = user;
      }
    });

    if (foundUser) {
      // Navigate after setting the id
      navigate(`/single-user/${foundUser.id}`);
    } else {
      setLoginError(
        "Invalid credentials. Please check your username and password."
      );
    }
  };

  const navigateToRegistration = useNavigate();
  const navigateToUser = useNavigate();
  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <button
                className="btn btn-link w-100"
                onClick={() => navigateToRegistration("/login")}
              >
                Log in as a Guide?
              </button>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your username & password to login
                    </p>
                  </div>

                  <form className="row g-3">
                    <div className="col-12">
                      <label htmlFor="username">Username</label>
                      <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        required
                      />
                      {formErrors.username && (
                        <p className="text-danger">{formErrors.username}</p>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="password">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        required
                      />
                      {formErrors.password && (
                        <p className="text-danger">{formErrors.password}</p>
                      )}
                    </div>
                    <div className="col-12">
                      {loginError && (
                        <p className="text-danger">{loginError}</p>
                      )}
                      <button
                        className="btn btn-primary w-100"
                        onClick={customAuth}
                      >
                        Login
                      </button>
                      <button
                        className="btn btn-link w-100"
                        onClick={() => navigateToRegistration("/register-user")}
                      >
                        Create an Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginUser;
