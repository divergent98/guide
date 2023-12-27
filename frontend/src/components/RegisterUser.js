import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const initialState = {
  userFirstName: "",
  userLastName: "",
  userName: "",
  userEmail: "",
  userPhone: "",
  userPassword: "",
  userProfileImage: "",
  userBirthDate: "",
  userInterests: [],
  userAbout: "",
};

const RegisterUser = () => {
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [path, setPath] = useState(""); // Initialize path as an empty string
  const pathArray = []; // If you want to store multiple paths as an array
  const [pathArrayState, setPathArrayState] = useState([]);
  const [message, setMessage] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const interests = [
    "Hiking",
    "Paragliding",
    "Culinary Experiences",
    "Photography Tours",
    "Camping",
    "Museum and Gallery Visits",
    "Zipline",
    "Rock Climbing",
    "Horseback Riding",
    "Beach Relaxation",
    "Fishing",
    "Geocaching",
    "Sightseeing",
    "Bungee Jumping",
    "Parachuting",
    "Whitewater Kayaking",
    "Skiing",
    "Shopping",
    "City Tours",
    "Spa and Wellness",
    "Cultural and Heritage Tours",
    "Cycling Tours",
    "Train Journeys",
    "Wine and Brewery Tours",
  ];
  const toggleInterest = (interest) => {
    // Toggle the selected interest
    console.log(selectedInterests);
    setSelectedInterests((prevState) =>
      prevState.includes(interest)
        ? prevState.filter((item) => item !== interest)
        : [...prevState, interest]
    );
  };
  const navigate = useNavigate();
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dhawwwo4n",
          uploadPreset: "kpkdwfiu",
        },
        function (error, data) {
          console.log("Received data:", data.info.files);
          if (data && data.info && data.info.files) {
            const uploadInfo = data.info.files;
            uploadInfo.forEach((item, index) => {
              console.log(`Element ${index}:`, item.uploadInfo);
              pathArray.push(item.uploadInfo.url);
            });

            setPathArrayState(pathArray);

            // Set post.image to the first URL in pathArrayState

            // Push path to the array if you want to store multiple paths
            console.log(pathArray);
          } else {
            console.error("The expected data structure is not present.", error);
          }
        }
      );
    };
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
    };
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

  function validateForm() {
    const errors = {};
    if (!formState.userProfileImage) {
      errors.userProfileImage = "Profile Image is required";
    }
    if (!formState.userFirstName) {
      errors.userFirstName = "First Name is required";
    }
    if (!formState.userLastName) {
      errors.userLastName = "Last Name is required";
    }
    if (!formState.userName) {
      errors.userName = "Username is required";
    }
    const usernameExists = users.some(
      (user) => user.userName === formState.userName
    );
    if (usernameExists) {
      errors.userNname = "Username already exists. Please choose another.";
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!formState.userEmail || !emailPattern.test(formState.userEmail)) {
      errors.userEmail = "Please enter a valid email address";
    }
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (
      !formState.userPassword ||
      !passwordPattern.test(formState.userPassword)
    ) {
      errors.userPassword =
        "Password must contain at least one number, one uppercase letter, and one special character.";
    }
    if (!formState.userProfileImage) {
      errors.userProfileImage = "Profile Image is required";
    }
    const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (
      !formState.userBirthDate ||
      !birthDatePattern.test(formState.userBirthDate)
    ) {
      errors.userBirthDate = "Please enter a valid birth date (YYYY-MM-DD)";
    } else {
      const birthDate = new Date(formState.userBirthDate);
      const currentDate = new Date();
      if (birthDate > currentDate) {
        errors.userBirthDate = "Birth date cannot be in the future";
      }
    }
  
    if (!formState.userAbout) {
      errors.userAbout = "About is required";
    }
    setFormErrors(errors);
    console.log(formErrors);
    return Object.keys(errors).length === 0;

  }


  async function addUser() {
    try {
      if (!validateForm()) {
        return;
      }
      const user = { ...formState };
      user.userInterests = selectedInterests  || [];
      const createUserInput = {
        ...user,
        userInterests: user.userInterests.filter(Boolean),
      };

      axios.post("/createUser", createUserInput)
      .then((res) =>console.log(res))
      .catch((err) =>console.log("i am printing this error",err));
     
      setFormState(initialState);
      navigate("../login"); // Change this to the appropriate route
    } catch (err) {
      console.log("error creating user:", err);
    }
  }
  formState.userProfileImage = pathArrayState[0];
  function removeImage() {
    setInput("userProfileImage", "");
    setMessage("");
    window.location.reload();
  }
  function uploadImage() {
    widgetRef.current.open();
    setMessage("click on the image to remove");
  }
  return (
    <div className=" registration-background">
    
        <div className="container pt-4">
          <div className="row justify-content-center">
          <div className="col-lg-6 m-auto">
          <div className="pt-4 pb-2">
            <h5 className="card-title text-left pb-0 font-size-42 text-light font-weight-bold franklin">
              Create an Account to<br>
              </br>
              Register as a User
            </h5>
            <p className="text-left small  text-light franklin font-size-18">
              Enter your personal details to create user account
            </p>

            <p className="text-left small  text-light franklin font-size-18 mb-0 ">
             You already have an account? <Link className="color-blue-gray" to="/user-login">Log in here</Link> .
            </p>
            <p className="text-left small  text-light franklin font-size-18 mt-0 pt-0">
             Do you want to  <Link className="color-blue-gray" to="/register-guide">register as a guide</Link>?
            </p>
                </div>
        </div>
            <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3 custom-card-registration">
                <div className="card-body">
               
                  <div className="row g-3">
                
                  <div className="col-12 mt-3">
                  <div className="row justify-content-center">
                    {" "}
                    <div className="col-3 mt-3">
                      <img
                        onClick={removeImage}
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        data-bs-original-title="Tooltip on right"
                        className="profile-image-registration"
                        src={formState.guideProfileImage}
                      ></img>

                      <input
                        className="form-control hidden"
                        onChange={(event) =>
                          setInput("userProfileImage", event.target.value)
                        }
                        value={formState.userProfileImage}
                        placeholder="Profile Image"
                      />
                    </div>
                  </div>{" "}
                  <div className="row justify-content-center text-center">
                    <div className="col-6">
                      {" "}
                      <p className="franklin font-size-12 color-midnight-blue">
                        {message}
                      </p>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    {" "}
                    <div className="col-2 ">
                      <button
                        className="view-button border border-1 border-color-midnight franklin color-midnight-blue"
                        onClick={uploadImage}
                      >
                        Upload
                      </button>
                      {formErrors.userProfileImage && (
                        <p className="text-danger">
                          {formErrors.userProfileImage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                      <div className="col-4">
                   
                        <input
                          className="form-control-custom"
                          onChange={(event) =>
                            setInput("userFirstName", event.target.value)
                          }
                          value={formState.userFirstName}
                          placeholder="First Name"
                        />
                        {formErrors.userFirstName && (
                          <p className="text-danger">
                            {formErrors.userFirstName}
                          </p>
                        )}
                      </div>
                      <div className="col-4">
                       
                        <input
                          className="form-control-custom"
                          onChange={(event) =>
                            setInput("userLastName", event.target.value)
                          }
                          value={formState.userLastName}
                          placeholder="Last Name"
                        />
                        {formErrors.userLastName && (
                          <p className="text-danger">
                            {formErrors.userLastName}
                          </p>
                        )}
                      </div>
                      <div className="col-4">
               
                        <input
                          className="form-control-custom"
                          onChange={(event) =>
                            setInput("userName", event.target.value)
                          }
                          value={formState.userName}
                          placeholder="Username"
                        />
                        {formErrors.userName && (
                          <p className="text-danger">{formErrors.userName}</p>
                        )}
                      </div>
                      <div className="col-6">

                        <input
                          className="form-control-custom"
                          onChange={(event) =>
                            setInput("userEmail", event.target.value)
                          }
                          value={formState.userEmail}
                          placeholder="Email"
                        />
                        {formErrors.userEmail && (
                          <p className="text-danger">{formErrors.userEmail}</p>
                        )}
                      </div>     
                      <div className="col-6">
                        {" "}
                       
                        <input
                          className="form-control-custom"
                          type="password"
                          onChange={(event) =>
                            setInput("userPassword", event.target.value)
                          }
                          value={formState.userPassword}
                          placeholder="Password"
                        />
                        {formErrors.userPassword && (
                          <p className="text-danger">
                            {formErrors.userPassword}
                          </p>
                        )}
                      </div>
                      <div className="col-6">
                        {" "}
                      
                        <input
                          className="form-control-custom"
                          onChange={(event) =>
                            setInput("userPhone", event.target.value)
                          }
                          value={formState.userPhone}
                          placeholder="Phone"
                        />
                        {formErrors.userPhone && (
                          <p className="text-danger">{formErrors.userPhone}</p>
                        )}
                      </div>{" "}
                 
              
                    
                      <div className="col-6">
                     
                        <input
                          className="form-control-custom"
                          onChange={(event) =>
                            setInput("userBirthDate", event.target.value)
                          }
                          value={formState.userBirthDate}
                          placeholder="Birth Date"
                        />
                        {formErrors.userBirthDate && (
                          <p className="text-danger">
                            {formErrors.userBirthDate}
                          </p>
                        )}
                      </div>
                      <div className="col-12">
                      <label
                    className="form-label franklin color-midnight-blue"
                    htmlFor="guideInterests"
                  >
                    Interests (pick your interests):
                  </label>
                        <div className="interest-buttons">
                          {interests.map((interest) => (
                            <button
                              key={interest}
                              className={`btn interest-button ${
                                selectedInterests.includes(interest)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => toggleInterest(interest)}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                        {formErrors.userInterests && (
                          <p className="text-danger">
                            {formErrors.userInterests}
                          </p>
                        )}
                      </div>
                      <div className="col-12">
                        {" "}

                        <textarea
                          className="form-control-custom"
                          onChange={(event) =>
                            setInput("userAbout", event.target.value)
                          }
                          rows={5}
                          value={formState.userAbout}
                          placeholder="About"
                        />
                        {formErrors.userAbout && (
                          <p className="text-danger">{formErrors.userAbout}</p>
                        )}
                      </div>    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 bg-color-midnight-blue franklin border border-0 rounded-5"
                        onClick={addUser}
                      >
                        Create User
                      </button>
                    </div>
                    </div>
                    {/* Add other input fields here... */}
                
                  </div>
                </div>
              </div>
            </div>
   </div>

    
    </div>
  );
};

export default RegisterUser;
