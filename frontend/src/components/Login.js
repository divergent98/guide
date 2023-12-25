import React from "react";
import { useState, useEffect, useRef } from "react";
import  axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

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
      if (guide.guideUsername === username && guide.guidePassword === password) {
        foundGuide = guide;
      }
    });
  
    if (foundGuide) {
      // Navigate after setting the id
      setId(foundGuide.id);
      navigate(`/single-guide/${foundGuide.id}`);
    } else {
      console.log("no such user");
    }
  };
  
  const navigateToRegistration = useNavigate();
  return (
    <div>
<div className="container">

<section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">


        <div className="card mb-3">

          <div className="card-body">

            <div className="pt-4 pb-2">
              <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
              <p className="text-center small">Enter your username & password to login</p>
            </div>

            <form className="row g-3 " >

              <div className="col-12">
                <label for="yourUsername" className="form-label">Username</label>
                <input
                type="text" name="username" className="form-control"  required
        
            id="username"
            value={username}
            onChange={handleUsernameChange}
            
          />
              </div>

              <div className="col-12">
                <label for="yourPassword" className="form-label">Password</label>
                <input
                 className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
              </div>

           
              <div className="col-12">
                <button className="btn btn-primary w-100" onClick={customAuth}>Login</button>
              </div>
              <div className="col-12">
              
              <button className="btn btn-link w-100" onClick={() => navigateToRegistration("/register-guide")}>
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
 {/*      <form>
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button onClick={customAuth}>Login</button>
      </form>  */}
      <div></div>
    </div>
  );
};

export default Login;
