import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
const ViewTrips = ({ guideId }) => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetchTrips();
  }, [guideId]);

  useEffect(() => {
    if (searchLocation.trim() === "") {
      setFilteredTrips(trips);
    } else {
      const filtered = trips.filter((trip) =>
        trip.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredTrips(filtered);
    }
  }, [searchLocation, trips]);

  async function fetchTrips() {
    try {
      const response = await axios.get(`/trips/${guideId}`);
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  const handleDelete = async (tripId) => {
    console.log(tripId);
    axios
      .delete(`/deleteTrip/${tripId}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            type="text"
            placeholder="SEARCH BY LOCATION..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="row">
          {filteredTrips.map((trip) => (
            <div className="col-4">
              <div className="card custom-card" key={trip.id}>
                <div className="custom-card-image">
                  <img src={trip.coverPhotograph} alt="..." />
                </div>
                <div className="card-body ">     
                   <p>
    
             <Icon.GeoAlt className="color-midnight-blue text-bold font-size-24" />{" "}
             <span className="align-middle font-size-18 color-midnight-blue franklin text-bold"> {trip.location}</span>
           </p>
                 
          
          <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2">
          <Icon.Calendar className="color-dark-blue font-size-16 me-2" />{" "}
          <span className="align-middle color-dark-blue font-size-12">{trip.date}</span>
        </span>
        <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2">
               <Icon.People className="color-dark-blue font-size-16 me-2" />
               <span className="align-middle color-dark-blue font-size-12"> {trip.capacity}</span>
             </span>
             <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2">
               <Icon.Clock className="color-dark-blue font-size-16 me-2" />
               <span className="align-middle color-dark-blue font-size-12"> {trip.duration}</span>
             </span>
             <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2">
               <Icon.CarFront className="color-dark-blue font-size-16 me-2" />
               <span className="align-middle color-dark-blue font-size-12">
                 {" "}
                 {trip.transportation}
               </span>
             </span>
           
                  {trip.id}
                     <div className="profile-card-footer mt-3">
            
           
                      <button
                        className="view-button bg-transparent view-button-delete color-midhight-blue"
                        onClick={() => handleDelete(trip._id)}
                      >
                        Delete
                      </button>
                

                      <Link className="view-button align-right color-midnight-blue" to={trip._id}>
                        Update
                      </Link>
      
                  </div></div>
           
                </div>
              </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTrips;
