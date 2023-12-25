import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [selectedInterests, setSelectedInterests] = useState([]);
  
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

  return (
    <>
     <div className='container'>
        <div className="pagetitle mt-5 ms-3">
          <h1 >Upate trip</h1>
          
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card px-3 py-5">
      <div>
        <h2>Update User</h2>
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
          <label className="form-label">First Name</label>
          <input className="form-control"
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
          <label className="form-label">Last Name</label>
          <input className="form-control"
            onChange={(event) => setInput("userLastName", event.target.value)}
            value={formState.userLastName || ""}
            placeholder="Last Name"
          />
          {formErrors.userLastName && (
            <p className="text-danger">{formErrors.userLastName}</p>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Phone</label>
          <input className="form-control"
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
    value={formState.userProfileImage ? formState.userProfileImage : ""}
    placeholder="Profile Image"
  />
</div>
          {formErrors.userProfileImage && (
            <p className="text-danger">{formErrors.userProfileImage}</p>
          )}
        </div>
        <div className="col-12">
          {" "}
          <label className="form-label">Birth Date</label>
          <input className="form-control"
            onChange={(event) => setInput("userBirthDate", event.target.value)}
            value={formState.userBirthDate || ""}
            placeholder="Birth Date"
          />
          {formErrors.userBirthDate && (
            <p className="text-danger">{formErrors.userBirthDate}</p>
          )}
        </div>
        <div className="col-12">
          <label className="form-label">Interests</label>
          <input className="form-control"
            onChange={(event) =>
              setInput("userInterests", event.target.value.split(","))
            }
            value={formState.userInterests.join(",") || ""}
            placeholder="Interests (comma-separated)"
          />
          {formErrors.userInterests && (
            <p className="text-danger">{formErrors.userInterests}</p>
          )}
        </div>
        <div className="col-12">
          <label className="form-label">About</label>
          <input className="form-control"
            onChange={(event) => setInput("userAbout", event.target.value)}
            value={formState.userAbout || ""}
            placeholder="About"
          />
          {formErrors.userAbout && (
            <p className="text-danger">{formErrors.userAbout}</p>
          )}
        </div>
      </div>
            <div className="col-12">
      <button className="btn btn-primary my-5" onClick={updateUserFunc}>
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
