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
    console.log(username, password)
    users.forEach((user) => {
      if (user.userName === username && user.userPassword === password) {
        foundUser = user;
      }
    });
console.log(foundUser)
    if (foundUser) {
      // Navigate after setting the id
      navigate(`/single-user/${foundUser._id}`);
    } else {
      setLoginError(
        "Invalid credentials. Please check your username and password."
      );
    }
  };

  const navigateToRegistration = useNavigate();
  const navigateToUser = useNavigate();
  return (
    <div className="registration-background">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-9 col-md-6">
                <div className="center-inner-element">
                  <div className="card mb-3 custom-card-registration">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center franklin font-weight-24 color-midnight-blue pb-0 fs-4">
                          Log in to Your Account
                        </h5>
                        <p className="text-center franklin font-weight-14 color-midnight-blue small">
                          Enter your username & password to log in
                        </p>
                      </div>

                      <form className="row g-3">
                        <div className="col-12">
                       
                          <input
                            className="form-control-custom"
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
                        
                          <input
                            className="form-control-custom"
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
                              className="btn btn-primary w-100 bg-color-midnight-blue franklin border border-0 rounded-5"
                            onClick={customAuth}
                          >
                            Log in
                          </button>
                        
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="center-inner-element">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-left pb-0 font-size-42 color-midnight-blue font-weight-bold franklin">
                  Discover Your Destination with Local Insight
                </h5>
                <p className="text-left small  text-light franklin font-size-18">
                  Your Travel Companion, Your Local Guide App
                </p>

                <p className="text-left small  text-light franklin font-size-18 mb-0 ">
                  You don't have an user account?{" "}
                  <Link className="color-blue-gray" to="/register-user">
                    Register now
                  </Link>{" "}
                  .
                </p>
                <p className="text-left small  text-light franklin font-size-18 mt-0 pt-0">
                  If you have guide account{" "}
                  <Link className="color-blue-gray" to="/">
                    log in here
                  </Link>
                  ?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
