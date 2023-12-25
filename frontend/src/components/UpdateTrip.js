import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";
const UpdateTrip = () => { 
    const { guideId, tripId } = useParams();
  
  const [trip, setTrip] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [path, setPath] = useState(""); // Initialize path as an empty string
  const pathArray = []; // If you want to store multiple paths as an array
  const [pathArrayState, setPathArrayState] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
    const [formState, setFormState] = useState({
        tripId: tripId,
        userIds: [],
        guideId: guideId,
        capacity: '',
        description: '',
        longDescription: '',
        duration: '',
        location: '',
        date: '',
        tags: [],
        transportation: '',
        photographs: [],
        coverPhotograph: '',
        cost: '',
      
      });
  useEffect(() => {
    fetchTripById(tripId)
  }, []);
  useEffect(() => {
    if (trip) {
        setFormState({
            tripId: trip.id,
            userIds: trip.userIds,
            guideId: trip.guideId,
            capacity: trip.capacity,
            description: trip.description,
            longDescription: trip.longDescription,
            duration: trip.duration,
            location: trip.location,
            date: trip.date,
            tags: trip.tags,
            transportation: trip.transportation,
            photographs: trip.photographs,
            coverPhotograph: trip.coverPhotograph,
            cost: trip.cost,
        });
    }
}, [trip]);
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
    async function fetchTripById(tripId) {
      try {
        const response = await axios.get(`/trip/${tripId}`);
        console.log(response.data);
        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching guide by ID:", error);
      }
    }
  function validateForm() {
    const errors = {};

    if (formState.cost !== "" && isNaN(parseFloat(formState.cost))) {
      errors.cost = "Cost must be a number";
    }

    for (const key in formState) {
      if (key !== "cost" && !formState[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function updateTripFunc() {      
  
    try {
      console.log("Before validation");
      validateForm();
      console.log("After validation, before axios request");
    console.log("hello")
      const updatedTrip = {
        id: formState.tripId,
        userIds: formState.userIds,
        capacity: formState.capacity,
        description: formState.description,
        longDescription: formState.longDescription,
        duration: formState.duration,
        location: formState.location,
        date: formState.date,
        tags: formState.tags,
        transportation: formState.transportation,
        photographs: formState.photographs,
        coverPhotograph: formState.coverPhotograph,
        cost: formState.cost,
      };
      setFormState(updatedTrip);
      await axios.put(`/updateTrip/${tripId}`, formState);
      console.log("Trip updated successfully:", formState);

    navigate(-1); // Navigate to guide details page after successful update
  } catch (error) {
    console.error("Validation failed. Please check the form for errors.", error);
    // You might want to handle or display the validation error here
  }
  }

  if (!trip) {
    return <div>Loading...</div>;
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  formState.coverPhotograph = pathArrayState[0];
  pathArrayState.shift()
  formState.photographs = pathArrayState;
  console.log(formState.photographs)

  return (
    <>

        <div className='container'>
        <div className="pagetitle mt-5 pt-5 ms-3">
          <h1 className='mt-5 pt-5'>Upate trip</h1>
          
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card px-3 py-5">
                <div>
    
                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">Capacity</label>
                      <input
                        className="form-control"
                        type="number"
                        onChange={(event) => setInput('capacity', event.target.value)}
                        value={formState.capacity}
                        placeholder="Capacity"
                      />
                      {formErrors.capacity && <p className="text-danger">{formErrors.capacity}</p>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Location</label>
                      <input
                        className="form-control"
                        onChange={(event) => setInput('location', event.target.value)}
                        value={formState.location}
                        placeholder="Location"
                      />
                      {formErrors.location && <p className="text-danger">{formErrors.location}</p>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Duration</label>
                      <input
                        className="form-control"
                        onChange={(event) => setInput('duration', event.target.value)}
                        value={formState.duration}
                        placeholder="Duration"
                      />
                      {formErrors.duration && <p className="text-danger">{formErrors.duration}</p>}
                    </div>
                  </div>
          
                  <div className="row">
                    <div className="col-md-4">
                      <label className="form-label">Cost</label>
                      <input
                          className="form-control"
                          type="text"
                          onChange={(event) => setInput("cost", event.target.value)}
                          value={formState.cost}
                          placeholder="Cost"
                        />
                        {formErrors.cost && <p className="text-danger">{formErrors.cost}</p>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Transportation</label>
                      <input
                        className="form-control"
                        onChange={(event) => setInput('transportation', event.target.value)}
                        value={formState.transportation}
                        placeholder="Transportation"
                      />
                      {formErrors.transportation && <p className="text-danger">{formErrors.transportation}</p>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Date</label>
                      <input
                        className="form-control"
                        onChange={(event) => setInput('date', event.target.value)}
                        value={formState.date}
                        placeholder="Date"
                      />
                      {formErrors.date && <p className="text-danger">{formErrors.date}</p>}
                    </div>
                  </div>
                  <hr className='my-5'></hr>
                  <label className="form-label">Description</label>
                  <input
                    className="form-control"
                    onChange={(event) => setInput('description', event.target.value)}
                    value={formState.description}
                    placeholder="Description"
                  />
                {formErrors.description && <p className="text-danger">{formErrors.description}</p>}
                  <label className="form-label">Long Description</label>
                  <textarea
                    className="form-control"
                    onChange={(event) => setInput('longDescription', event.target.value)}
                    value={formState.longDescription}
                    placeholder="Long Description"
                  />
                          <hr className='my-5'></hr>
                {formErrors.longDescription && <p className="text-danger">{formErrors.longDescription}</p>}
                  <label className="form-label">Cover Photograph</label>
                  <button
                            className="w-100 btn btn-success custom-border-right"
                            onClick={() => widgetRef.current.open()}
                          >
                            Upload
                          </button>
                  <input
                    className="form-control"
                    onChange={(event) => setInput('coverPhotograph', event.target.value)}
                    value={formState.coverPhotograph}
                    placeholder="Cover Photograph"
                  />
                {formErrors.coverPhotograph && <p className="text-danger">{formErrors.coverPhotograph}</p>}
                  <label className="form-label">Photographs (comma-separated)</label>
                  <input
                    className="form-control"
                    onChange={(event) => setInput('photographs', event.target.value.split(','))}
                    value={formState.photographs.join(',')}
                    placeholder="Photographs (comma-separated)"
                  />
                          <hr className='mt-5'></hr>
                {formErrors.photographs && <p className="text-danger">{formErrors.photographs}</p>}
                  <button className='btn btn-primary mt-5' onClick={updateTripFunc}>Create Trip</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
 
  </>
  );
};

export default UpdateTrip;
