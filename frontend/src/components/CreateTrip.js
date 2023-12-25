import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
const initialState = {
  userIds: [],
  guideId: "",
  capacity: "",
  description: "",
  longDescription: "",
  duration: "",
  location: "",
  date: "",
  tags: [],
  transportation: "",
  photographs: [],
  coverPhotograph: "",
  cost: "",
};

const CreateTrip = ({ guideId }) => {
  const [formState, setFormState] = useState({
    userIds: [],
    guideId: guideId,
    capacity: "",
    description: "",
    longDescription: "",
    duration: "",
    location: "",
    date: "",
    tags: [],
    transportation: "",
    photographs: [],
    coverPhotograph: "",
    cost: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [path, setPath] = useState(""); // Initialize path as an empty string
  const pathArray = []; // If you want to store multiple paths as an array
  const [pathArrayState, setPathArrayState] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
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

    if (formState.cost !== "" && isNaN(parseFloat(formState.cost))) {
      errors.cost = "Cost must be a number";
    }

    for (const key in formState) {
      if (key !== "cost" && !formState[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function addTrip() {
    if (!validateForm()) {
      return;
    }
    try {
      if (
        !formState.userIds ||
        !formState.guideId ||
        !formState.capacity ||
        !formState.description ||
        !formState.longDescription ||
        !formState.duration ||
        !formState.location ||
        !formState.date ||
        !formState.transportation ||
        !formState.coverPhotograph ||
        !formState.cost
      ) {
        return;
      }

      const trip = { ...formState };
      trip.userIds = trip.userIds || [];
      trip.tags = trip.tags || [];
      trip.photographs = trip.photographs || [];
      formState.photographs = Array.from(new Set(photographs));
      const createTripInput = {
        ...trip,
        tags: trip.tags.filter(Boolean),
        photographs: trip.photographs.filter(Boolean),
      };
      const response = await axios.post("/createTrip", createTripInput);

      console.log(response);
      window.location.reload();
      setFormState(initialState);
    } catch (err) {
      console.log("error creating trip:", err);
    }
  }
  formState.coverPhotograph = pathArrayState[0];
  formState.photographs = pathArrayState;
  const size = pathArrayState.length / 2;
  const photographs = pathArrayState.slice(size);

  console.log("full photo array", formState.photographs);
  return (
    <div className="row justify-content-center">
      <div className="col-9">
        {" "}
        <h2 className="franklin font-size-16 color-blue-gray letter-spacing text-center">CREATE TRIP</h2>
        <div className="row">
          <div className="col-md-4">
            <input
              className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
              type="number"
              onChange={(event) => setInput("capacity", event.target.value)}
              value={formState.capacity}
              placeholder="Capacity"
            />
            {formErrors.capacity && (
              <p className="text-danger">{formErrors.capacity}</p>
            )}
          </div>
          <div className="col-md-4">
            <input
              className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
              onChange={(event) => setInput("location", event.target.value)}
              value={formState.location}
              placeholder="Location"
            />
            {formErrors.location && (
              <p className="text-danger">{formErrors.location}</p>
            )}
          </div>
          <div className="col-md-4">
            <input
              className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
              onChange={(event) => setInput("duration", event.target.value)}
              value={formState.duration}
              placeholder="Duration"
            />
            {formErrors.duration && (
              <p className="text-danger">{formErrors.duration}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <input
              className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
              type="text"
              onChange={(event) => setInput("cost", event.target.value)}
              value={formState.cost}
              placeholder="Cost"
            />
            {formErrors.cost && (
              <p className="text-danger">{formErrors.cost}</p>
            )}
          </div>
          <div className="col-md-4">
            <input
              className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
              onChange={(event) =>
                setInput("transportation", event.target.value)
              }
              value={formState.transportation}
              placeholder="Transportation"
            />
            {formErrors.transportation && (
              <p className="text-danger">{formErrors.transportation}</p>
            )}
          </div>
          <div className="col-md-4">
            <input
              className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
              onChange={(event) => setInput("date", event.target.value)}
              value={formState.date}
              placeholder="Date"
            />
            {formErrors.date && (
              <p className="text-danger">{formErrors.date}</p>
            )}
          </div>
        </div>
        <input
          className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
          onChange={(event) => setInput("description", event.target.value)}
          value={formState.description}
          placeholder="Description"
        />
        {formErrors.description && (
          <p className="text-danger">{formErrors.description}</p>
        )}
        <textarea
          className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
          onChange={(event) => setInput("longDescription", event.target.value)}
          value={formState.longDescription}
          placeholder="Long Description"
        />
        {formErrors.longDescription && (
          <p className="text-danger">{formErrors.longDescription}</p>
        )}
       <button
          className="view-button text-center upload-button franklin font-size-16 w-35 my-3 mx-auto letter-spacing px-5"
          onClick={() => widgetRef.current.open()}
        >
          Upload Photos
        </button>
   
        {formErrors.coverPhotograph && (
          <p className="text-danger text-center">{formErrors.coverPhotograph}</p>
        )}
        <h2 className="franklin font-size-16  color-blue-gray letter-spacing text-center">PHOTOGRAPHS</h2>
        <div className="m-auto">
          {photographs.map((photo, index) => (
            <img className="uploaded-photo" src={photo}></img>
          ))}
        </div>
        {formErrors.photographs && (
          <p className="text-danger text-center">{formErrors.photographs}</p>
        )}
        <button className="view-button text-center upload-button franklin font-size-16 w-35 my-3 mx-auto letter-spacing px-5" onClick={addTrip}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTrip;
