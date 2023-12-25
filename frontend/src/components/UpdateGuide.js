import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";

import { Link } from "react-router-dom";
import Layout from "./Layout";

const UpdateGuide = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState();
  const [guides, setGuides] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [formState, setFormState] = useState({
    guideId: guideId,
    guideProfileImage: "",
    guideFirstName: "",
    guideLastName: "",
    guideUsername: "",
    guideEmail: "",
    guidePhone: "",
    guideLocation: "",
    guideBirthDate: "",
    guideInterests: [],
    guideAbout: "",
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
    fetchGuides();
    fetchGuideById(guideId);
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
  async function fetchGuideById(guideId) {
    try {
      const response = await axios.get(`/guide/${guideId}`);
      console.log(response.data);
      setGuide(response.data);
    } catch (error) {
      console.error("Error fetching guide by ID:", error);
    }
  }
  useEffect(() => {
    if (guide) {
      setFormState({
        guideId: guideId,
        guideProfileImage: guide.guideProfileImage,
        guideFirstName: guide.guideFirstName,
        guideLastName: guide.guideLastName,
        guideUsername: guide.guideUsername,
        guidePhone: guide.guidePhone,
        guideEmail: guide.guideEmail,
        guideLocation: guide.guideLocation,
        guideBirthDate: guide.guideBirthDate,
        guideInterests: guide.guideInterests,
        guideAbout: guide.guideAbout,
      });  
      setSelectedInterests(guide.guideInterests);
    }
  }, [guide]);
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

    if (!formState.guideProfileImage) {
      errors.guideProfileImage = "Profile Image is required";
    }
    if (!formState.guideFirstName) {
      errors.guideFirstName = "First Name is required";
    }
    if (!formState.guideLastName) {
      errors.guideLastName = "Last Name is required";
    }

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!formState.guideEmail || !emailPattern.test(formState.guideEmail)) {
      errors.guideEmail = "Please enter a valid email address";
    }

    if (!formState.guideLocation) {
      errors.guideLocation = "Location is required";
    }
/*     if (!guide.guideInterests || guide.guideInterests.length === 0) {
      errors.guideInterests = "At least one interest is required";
    } */
    const phoneNumberPattern = /^[0-9]{9}$/;
    if (
      !formState.guidePhone ||
      !phoneNumberPattern.test(formState.guidePhone)
    ) {
      errors.guidePhone = "Please enter a valid 10-digit phone number";
    }
/*     const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
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
    } */
    if (!formState.guideAbout) {
      errors.guideAbout = "About is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
 
  async function updateGuideFunc() {
    

    try {
        console.log("Before validation");
        validateForm();
        console.log("After validation, before axios request");
      console.log("hello")
      const updateGuide = {
        id: formState.guideId,
        guideFirstName: formState.guideFirstName,
        guideLastName: formState.guideLastName,
        guideUsername: formState.guideUsername,
        guideEmail: formState.guideEmail,
        guidePhone: formState.guidePhone,
        guideLocation: formState.guideLocation,
        guideBirthDate: formState.guideBirthDate,
        guideInterests: selectedInterests,
        guideAbout: formState.guideAbout,
      };
      setFormState(updateGuide);
      console.log("Before axios request");
    await axios.put(`/updateGuide/${guideId}`, formState);
   
    console.log("Guide updated successfully:", formState);

    navigate(-1); // Navigate to guide details page after successful update
  } catch (error) {
    console.error("Validation failed. Please check the form for errors.", error);
    // You might want to handle or display the validation error here
  }
}
  formState.guideProfileImage = pathArrayState[0];

  if (!guide) {
    return <div>Loading...</div>;
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
console.log(formState.guideId);

  return (
    <>
    <Layout  firstName={guide.guideFirstName} lastName={guide.guideLastName} />
      <div className="container">
        <div className="pagetitle mt-5 ms-3">
          <h1 className="mt-5 pt-5">Update user</h1>
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card px-3 py-5">
                <div>
       
                  <input
                    className="hidden"
                    onChange={(event) =>
                      setInput("guideId", event.target.value)
                    }
                    value={formState.guideId || ""}
                    placeholder="Guide ID"
                  />
                <div className="col-12">
<label
  className="form-label"
  htmlFor="guideProfileImage"
>
  Profile Image
</label>
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
      setInput("guideProfileImage", event.target.value)
    }
    value={formState.guideProfileImage ? formState.guideProfileImage : ""}
    placeholder="Profile Image"
  />
</div>

{formErrors.guideProfileImage && (
  <p className="text-danger">
    {formErrors.guideProfileImage}
  </p>
)}
</div>
                  <div className="col-12">
                    {" "}
                    <label className="form-label">First Name</label>
                    <input
                      className="form-control"
                      onChange={(event) =>
                        setInput("guideFirstName", event.target.value)
                      }
                      value={formState.guideFirstName || ""}
                      placeholder="First Name"
                    />
                    {formErrors.guideFirstName && (
                      <p className="text-danger">{formErrors.guideFirstName}</p>
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label">First Last</label>
                    <input
                      className="form-control"
                      onChange={(event) =>
                        setInput("guideLastName", event.target.value)
                      }
                      value={formState.guideLastName || ""}
                      placeholder="Last Name"
                    />
                    {formErrors.guideLastName && (
                      <p className="text-danger">{formErrors.guideLastName}</p>
                    )}
                  </div>{" "}
                  <input
                    className="hidden"
                    onChange={(event) =>
                      setInput("guideUsername", event.target.value)
                    }
                    value={formState.guideUsername || ""}
                    placeholder="Username"
                  />
                  <input
                    className="hidden"
                    onChange={(event) =>
                      setInput("guideEmail", event.target.value)
                    }
                    value={formState.guideEmail || ""}
                    placeholder="Email"
                  />
                  <div className="col-12">
                    {" "}
                    <label className="form-label">Phone</label>
                    <input
                      className="form-control"
                      onChange={(event) =>
                        setInput("guidePhone", event.target.value)
                      }
                      value={formState.guidePhone || ""}
                      placeholder="Phone"
                    />
                    {formErrors.guidePhone && (
                      <p className="text-danger">{formErrors.guidePhone}</p>
                    )}
                  </div>
                  <div className="col-12">
                    {" "}
                    <label className="form-label">Location</label>
                    <input
                      className="form-control"
                      onChange={(event) =>
                        setInput("guideLocation", event.target.value)
                      }
                      value={formState.guideLocation || ""}
                      placeholder="Location"
                    />
                    {formErrors.guideLocation && (
                      <p className="text-danger">{formErrors.guideLocation}</p>
                    )}
                  </div>
                  <div className="col-12">
                    {" "}
                    <label className="form-label">Birth Date</label>
                    <input
                      className="form-control"
                      onChange={(event) =>
                        setInput("guideBirthDate", event.target.value)
                      }
                      value={formState.guideBirthDate || ""}
                      placeholder="Birth Date"
                    />
                    {formErrors.guideBirthDate && (
                      <p className="text-danger">{formErrors.guideBirthDate}</p>
                    )}
                  </div>
                  <div className="col-12">
                        <label className="form-label" htmlFor="guideInterests">
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
                    {" "}
                    <label className="form-label">About</label>
                    <textarea
                      className="form-control"
                      onChange={(event) =>
                        setInput("guideAbout", event.target.value)
                      }
                      value={formState.guideAbout || ""}
                      placeholder="About"
                    />{" "}
                    {formErrors.guideAbout && (
                      <p className="text-danger">{formErrors.guideAbout}</p>
                    )}
                  </div>
                  <button className="my-5 btn btn-primary" onClick={updateGuideFunc}>Update Guide</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpdateGuide;
