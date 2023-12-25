import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const interests = [
    "Hiking",
    "Concerts and Entertainment",
    "Paragliding",
    "Culinary Experiences",
    "Backpacking",
    "Photography Tours",
    "Camping",
    "Museum and Gallery Visits",
    "Zipline",
    "Nature and Wildlife Tours",
    "Rock Climbing",
    "Golfing",
    "Horseback Riding",
    "Beach Relaxation",
    "Outdoor Photography",
    "Fishing",
    "Language and Cooking Classes",
    "Geocaching",
    "Sightseeing",
    "Bungee Jumping",
    "Wildlife Safari",
    "Parachuting",
    "Whitewater Kayaking",
    "Survival Skills Training",
    "Skiing",
    "Horse-Drawn Carriage Rides",
    "Shopping",
    "City Tours",
    "Cruise Trips",
    "Spa and Wellness",
    "Hot Air Balloon",
    "Historical Reenactments",
    "Festivals",
    "Cultural and Heritage Tours",
    "Cycling Tours",
    "Train Journeys",
    "Skydiving",
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
  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p className="text-center small">
                      Enter your personal details to create an account
                    </p>
                  </div>
                  <div className="row g-3">
                    <div
                      id="first"
                   
                    >
                      <div className="col-12">
                        <label className="form-label">Profile Image</label>
                        <div className="col-2">
                          <button
                            className="w-100 btn btn-success custom-border-right"
                            onClick={() => widgetRef.current.open()}
                          >
                            Upload
                          </button>
                        </div>
                        <div className="col-10">
                          <input
                            className="form-control"
                            onChange={(event) =>
                              setInput("userProfileImage", event.target.value)
                            }
                            value={formState.userProfileImage}
                            placeholder="Profile Image"
                          />
                        </div>
                        {formErrors.userProfileImage && (
                          <p className="text-danger">
                            {formErrors.userProfileImage}
                          </p>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label">First Name</label>
                        <input
                          className="form-control"
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
                      <div className="col-12">
                        <label className="form-label">Last Name</label>
                        <input
                          className="form-control"
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
                      <div className="col-12">
                        <label className="form-label">Username</label>
                        <input
                          className="form-control"
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
                      <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control"
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
                      <div className="col-12">
                        {" "}
                        <label className="form-label">Phone</label>
                        <input
                          className="form-control"
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
                      <div className="col-12">
                        {" "}
                        <label className="form-label">Password</label>
                        <input
                          className="form-control"
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
              
                    </div>
                    <div
                      id="second"
                     
                    >
                      <div className="col-12">
                        <label className="form-label">Birth Date</label>
                        <input
                          className="form-control"
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
                        <label className="form-label" htmlFor="userInterests">
                          Interests (pick your interests)
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
                        <label className="form-label">About</label>
                        <input
                          className="form-control"
                          onChange={(event) =>
                            setInput("userAbout", event.target.value)
                          }
                          value={formState.userAbout}
                          placeholder="About"
                        />
                        {formErrors.userAbout && (
                          <p className="text-danger">{formErrors.userAbout}</p>
                        )}
                      </div>    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
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
      </section>
    </div>
  );
};

export default RegisterUser;
