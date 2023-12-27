import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
const initialState = {
  guideProfileImage: "",
  guideFirstName: "",
  guideLastName: "",
  guideUsername: "",
  guideEmail: "",
  guidePassword: "",
  guideLocation: "",
  guideInterests: [],
  guidePhone: "",
  guideBirthDate: "",
  guideAbout: "",
};

function RegisterGuide() {
  const [guides, setGuides] = useState([]);
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [message, setMessage] = useState("");
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

  const navigate = useNavigate();
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  console.log(cloudinaryRef);
  useEffect(() => {
    fetchGuides();
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

  async function fetchGuides() {
    axios
      .get("/guides")
      .then((res) => {
        console.log(res.data);
        setGuides(res.data);
      })
      .catch((err) => console.log(err));
  }

  function validateForm() {
    const errors = {};
    if (!formState.guideProfileImage) {
      errors.guideProfileImage = "Profile Image is required";
    }
    if (!formState.guideFirstName) {
      errors.guideFirstName = "First Name is required";
    }
    if (!formState.guideLastName) {
      errors.guideLastName = "Last Name is required";
    }
    if (!formState.guideUsername) {
      errors.guideUsername = "Username is required";
    }
    const usernameExists = guides.some(
      (guide) => guide.guideUsername === formState.guideUsername
    );
    if (usernameExists) {
      errors.guideUsername = "Username already exists. Please choose another.";
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!formState.guideEmail || !emailPattern.test(formState.guideEmail)) {
      errors.guideEmail = "Please enter a valid email address";
    }
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (
      !formState.guidePassword ||
      !passwordPattern.test(formState.guidePassword)
    ) {
      errors.guidePassword =
        "Password must contain at least one number, one uppercase letter, and one special character.";
    }

    const phoneNumberPattern = /^[0-9]{9}$/;
    if (
      !formState.guidePhone ||
      !phoneNumberPattern.test(formState.guidePhone)
    ) {
      errors.guidePhone = "Please enter a valid 10-digit phone number";
    }

    if (!formState.guideLocation) {
      errors.guideLocation = "Location is required";
    }
    /*       if (!formState.guideInterests || formState.guideInterests.length === 0) {
        errors.guideInterests = "At least one interest is required";
      }
   */
    const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (
      !formState.guideBirthDate ||
      !birthDatePattern.test(formState.guideBirthDate)
    ) {
      errors.guideBirthDate = "Please enter a valid birth date (YYYY-MM-DD)";
    } else {
      const birthDate = new Date(formState.guideBirthDate);
      const currentDate = new Date();
      if (birthDate > currentDate) {
        errors.guideBirthDate = "Birth date cannot be in the future";
      }
    }
    if (!formState.guideAbout) {
      errors.guideAbout = "About is required";
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function addGuide() {
    try {
      if (!validateForm()) {
        return;
      }
      const guide = { ...formState };
      console.log(guide);
      guide.guideInterests = selectedInterests || [];
      const createGuideInput = {
        ...guide,
        guideInterests: guide.guideInterests.filter(Boolean),
      };
      console.log(createGuideInput);
      axios
        .post("/createGuide", createGuideInput)
        .then((res) => console.log(res))
        .catch((err) => console.log("i am printing this error", err));

      setFormState(initialState);
      navigate("../login");
    } catch (err) {
      console.log("error creating guide:", err);
    }
  }

  formState.guideProfileImage = pathArrayState[0];
  function removeImage() {
    setInput("guideProfileImage", "");
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
      <div className="row  ">
        <div className="col-lg-6 m-auto">
          <div className="pt-4 pb-2">
            <h5 className="card-title text-left pb-0 font-size-42 text-light font-weight-bold franklin">
              Create an Account to<br>
              </br>
              Register as a Guide
            </h5>
            <p className="text-left small  text-light franklin font-size-18">
              Enter your personal details to create guide account
            </p>

            <p className="text-left small  text-light franklin font-size-18 mb-0 ">
             You already have an account? <Link className="color-blue-gray" to="/login">Log in here</Link> .
            </p>
            <p className="text-left small  text-light franklin font-size-18 mt-0 pt-0">
             You don't want to be a guide? <Link className="color-blue-gray" to="/register-user">Register as User</Link> .
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
                          setInput("guideProfileImage", event.target.value)
                        }
                        value={formState.guideProfileImage}
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
                      {formErrors.guideProfileImage && (
                        <p className="text-danger">
                          {formErrors.guideProfileImage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <input
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guideFirstName", event.target.value)
                    }
                    value={formState.guideFirstName}
                    placeholder="First Name"
                  />
                  {formErrors.guideFirstName && (
                    <p className="text-danger">{formErrors.guideFirstName}</p>
                  )}
                </div>
                <div className="col-4">
                  <input
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guideLastName", event.target.value)
                    }
                    value={formState.guideLastName}
                    placeholder="Last Name"
                  />
                  {formErrors.guideLastName && (
                    <p className="text-danger">{formErrors.guideLastName}</p>
                  )}
                </div>
                <div className="col-4">
                  <input
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guideUsername", event.target.value)
                    }
                    value={formState.guideUsername}
                    placeholder="Username"
                  />
                  {formErrors.guideUsername && (
                    <p className="text-danger">{formErrors.guideUsername}</p>
                  )}
                </div>
                <div className="col-6">
                  <input
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guideEmail", event.target.value)
                    }
                    value={formState.guideEmail}
                    placeholder="Email"
                  />
                  {formErrors.guideEmail && (
                    <p className="text-danger">{formErrors.guideEmail}</p>
                  )}
                </div>
                <div className="col-6">
                  <input
                    className="form-control-custom"
                    type="password"
                    onChange={(event) =>
                      setInput("guidePassword", event.target.value)
                    }
                    value={formState.guidePassword}
                    placeholder="Password"
                  />
                  {formErrors.guidePassword && (
                    <p className="text-danger">{formErrors.guidePassword}</p>
                  )}
                </div>
                <div className="col-4">
                  <input
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guideLocation", event.target.value)
                    }
                    value={formState.guideLocation}
                    placeholder="Location"
                  />
                  {formErrors.guideLocation && (
                    <p className="text-danger">{formErrors.guideLocation}</p>
                  )}
                </div>
                <div className="col-4">
                  <input
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guidePhone", event.target.value)
                    }
                    value={formState.guidePhone}
                    placeholder="Phone"
                  />
                  {formErrors.guidePhone && (
                    <p className="text-danger">{formErrors.guidePhone}</p>
                  )}
                </div>

                <div className="col-4">
                  <input
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guideBirthDate", event.target.value)
                    }
                    value={formState.guideBirthDate}
                    placeholder="Birth Date"
                  />
                  {formErrors.guideBirthDate && (
                    <p className="text-danger">{formErrors.guideBirthDate}</p>
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
                          selectedInterests.includes(interest) ? "selected" : ""
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  {formErrors.guideInterests && (
                    <p className="text-danger">{formErrors.guideInterests}</p>
                  )}
                </div>

                <div className="col-12">
                  <textarea
                    className="form-control-custom"
                    onChange={(event) =>
                      setInput("guideAbout", event.target.value)
                    }
                    rows={5}
                    value={formState.guideAbout}
                    placeholder="About"
                  />
                  {formErrors.guideAbout && (
                    <p className="text-danger">{formErrors.guideAbout}</p>
                  )}
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary w-100 bg-color-midnight-blue franklin border border-0 rounded-5"
                    onClick={addGuide}
                  >
                    Create Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default RegisterGuide;
