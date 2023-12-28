import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [loginError, setLoginError] = useState("");
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGuides();
  }, []);
  async function fetchGuides() {
    axios
      .get("/guides")
      .then((res) => {
        console.log(res.data);
        setGuides(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const customAuth = (event) => {
    event.preventDefault();
    console.log(guides);
    let foundGuide = null;

    guides.forEach((guide) => {
      if (
        guide.guideUsername === username &&
        guide.guidePassword === password
      ) {
        foundGuide = guide;
      }
    });

    if (foundGuide) {
      // Navigate after setting the id
      setId(foundGuide.id);
      navigate(`/single-guide/${foundGuide._id}`);
    } else {
      setLoginError(
        "Invalid credentials. Please check your username and password."
      );
    }
  };

  const navigateToRegistration = useNavigate();
  return (
    <div>
      <div className="registration-background">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-9 col-md-6 ">
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

                        <form className="row g-3 ">
                          <div className="col-12">
                            <input
                              placeholder="Username"
                              type="text"
                              name="username"
                              className="form-control-custom"
                              required
                              id="username"
                              value={username}
                              onChange={handleUsernameChange}
                            />
                          </div>

                          <div className="col-12">
                            <input
                              className="form-control-custom"
                              placeholder="Password"
                              type="password"
                              id="password"
                              value={password}
                              onChange={handlePasswordChange}
                              required
                            />
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
                          <div className="col-12"></div>
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
            <h5 className="card-title text-left pb-0 font-size-42 text-light font-weight-bold franklin">
            Empower Your Expertise, Connect with Explorers
            </h5>
            <p className="text-left small  text-light franklin font-size-18">
            Join Our Guide Community and Showcase Your Passion for Unforgettable Journeys!
            </p>

            <p className="text-left small  text-light franklin font-size-18 mb-0 ">
             You don't have an guide account? <Link className="color-blue-gray" to="/register-guide">Register now</Link> .
            </p>
            <p className="text-left small  text-light franklin font-size-18 mt-0 pt-0">
             If you have user account <Link className="color-blue-gray" to="/user-login">log in here</Link>?
            </p>
                </div></div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Login;
