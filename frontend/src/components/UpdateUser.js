import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import * as Icon from "react-bootstrap-icons";
const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState({
    userFirstName: "",
    userLastName: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userName: "",
    userProfileImage: "",
    userBirthDate: "",
    userInterests: [],
    userAbout: "",
  });
  const [path, setPath] = useState(""); // Initialize path as an empty string
  const pathArray = []; // If you want to store multiple paths as an array
  const [pathArrayState, setPathArrayState] = useState([]);
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
    console.log(selectedInterests);
    setSelectedInterests((prevState) =>
      prevState.includes(interest)
        ? prevState.filter((item) => item !== interest)
        : [...prevState, interest]
    );
  };
  useEffect(() => {
    fetchUserById(userId)
  }, []);
  async function fetchUserById(userId) {
    try {
      const response = await axios.get(`/user/${userId}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  }
  useEffect(() => {
    if (user) {
      setFormState({
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userName: user.userName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        userName: user.userName,
        userProfileImage: user.userProfileImage,
        userBirthDate: user.userBirthDate,
        userInterests: user.userInterests,
        userAbout: user.userAbout,
      });
      setSelectedInterests(user.userInterests);
    }
  }, [user]);
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
/*     if (!formState.userInterests || formState.userInterests.length === 0) {
      errors.userInterests = "At least one interest is required";
    } */
    if (!formState.userAbout) {
      errors.userAbout = "About is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
  
  async function updateUserFunc() {
    

    try {
        console.log("Before validation");
        validateForm();
        console.log("After validation, before axios request");
      console.log("hello")
        const updatedUser = {
          id: userId,
          userFirstName: formState.userFirstName,
          userLastName: formState.userLastName,
          userName: formState.userName,
          userEmail: formState.userEmail,
          userPhone: formState.userPhone,
          userProfileImage: formState.userProfileImage,
          userBirthDate: formState.userBirthDate,
          userInterests: formState.userInterests,
          userAbout: formState.userAbout,
        };
        setFormState(updatedUser);
      console.log("Before axios request");
    await axios.put(`/updateUser/${userId}`, formState);
  
    console.log("User updated successfully:", formState);
  
    navigate(-1); // Navigate to user details page after successful update
  } catch (error) {
    console.error("Validation failed. Please check the form for errors.", error);
    // You might want to handle or display the validation error here
  }
  }
  formState.userProfileImage = pathArrayState[0];
  if (!user) {
    return <div>Loading...</div>;
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
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
    <>
      <Layout firstName={user.userFirstName} lastName={user.userLastName} />
     <div className='container mt-5 pt-5'>
     <Icon.ArrowBarLeft className="font-size-18 color-blue-gray"/>
     <HashLink to={`../single-user/${userId}#view-trips`} className="letter-spacing franklin font-size-14 color-blue-gray ps-0 ms-0">
     BACK TO PROFILE
        </HashLink>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card px-3 py-5 custom-card">
      <div>
      <h2 className="franklin font-size-16 color-blue-gray letter-spacing text-center">
                      UPDATE USER
                    </h2>
        <div className="col-12 mt-3">
                  <div className="center-inner-element-no-height">
                    {" "}
                    <div className=" mt-3 ">
                      <img
                        onClick={removeImage}
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        data-bs-original-title="Tooltip on right"
                        className="profile-image-registration"
                        src={formState.userProfileImage || ""}
                      ></img>

                      <input
                        className="form-control hidden"
                        onChange={(event) =>
                          setInput("userProfileImage", event.target.value)
                        }
                        value={formState.userProfileImage || ""}
                        placeholder="Profile Image"
                      />
                    </div>
                  </div>{" "}
                  <div className="center-inner-element-no-height">
                    <div className="">
                      {" "}
                      <p className="franklin font-size-12 color-midnight-blue">
                        {message}
                      </p>
                    </div>
                  </div>
                  <div className="center-inner-element-no-height">
                    {" "}
                    <div className="">
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
        <div className="col-12">
        <input
                        className="hidden"
                        onChange={(event) =>
                          setInput("userEmail", event.target.value)
                        }
                        value={formState.userEmail}
                        placeholder="Email"
                      />
                            <input
                        className="hidden"
                        type="password"
                        onChange={(event) =>
                          setInput("userPassword", event.target.value)
                        }
                        value={formState.userPassword}
                        placeholder="Password"
                      />
                           <input
                        className="hidden"
                        onChange={(event) =>
                          setInput("userName", event.target.value)
                        }
                        value={formState.userName}
                        placeholder="Username"
                      />
          
          <input className="form-control-custom"
            onChange={(event) => setInput("userFirstName", event.target.value)}
            value={formState.userFirstName || ""}
            placeholder="First Name"
          />
          {formErrors.userFirstName && (
            <p className="text-danger">{formErrors.userFirstName}</p>
          )}
        </div>
        <div className="col-12">
          {" "}
        
          <input className="form-control-custom"
            onChange={(event) => setInput("userLastName", event.target.value)}
            value={formState.userLastName || ""}
            placeholder="Last Name"
          />
          {formErrors.userLastName && (
            <p className="text-danger">{formErrors.userLastName}</p>
          )}
        </div>

        <div className="col-12">
        
          <input className="form-control-custom"
            onChange={(event) => setInput("userPhone", event.target.value)}
            value={formState.userPhone || ""}
            placeholder="Phone"
          />
          {formErrors.userPhone && (
            <p className="text-danger">{formErrors.userPhone}</p>
          )}
        </div>

        <div className="col-12">
          {" "}
         

          {formErrors.userProfileImage && (
            <p className="text-danger">{formErrors.userProfileImage}</p>
          )}
        </div>
        <div className="col-12">
          {" "}
        
          <input className="form-control-custom"
            onChange={(event) => setInput("userBirthDate", event.target.value)}
            value={formState.userBirthDate || ""}
            placeholder="Birth Date"
          />
          {formErrors.userBirthDate && (
            <p className="text-danger">{formErrors.userBirthDate}</p>
          )}
        </div>
        <div className="col-12">
                        <label className="mt-3 form-label franklin color-midnight-blue" htmlFor="guideInterests">
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
                        {formErrors.guideInterests && (
                          <p className="text-danger">
                            {formErrors.guideInterests}
                          </p>
                        )}
                      </div>
        <div className="col-12">
       
          <textarea className="form-control-custom mt-3"
            onChange={(event) => setInput("userAbout", event.target.value)}
            value={formState.userAbout || ""}
            placeholder="About"
            rows={5}
          />
          {formErrors.userAbout && (
            <p className="text-danger">{formErrors.userAbout}</p>
          )}
        </div>
      </div>
            <div className="col-12 center-inner-element-no-height">
      <button className="mt-5 btn btn-primary w-25 bg-color-midnight-blue franklin border border-0 rounded-5" onClick={updateUserFunc}>
        Update User
      </button></div>
      </div>
            </div>
          </div>
        </section>
        </div>
    </>
  );
};

export default UpdateUser;
