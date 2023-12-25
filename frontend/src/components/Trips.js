import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";

import { Link } from "react-router-dom";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTags, setSearchTags] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    axios
    .get("/trips")
      .then((res) => {
        console.log(res.data);
        setTrips(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Filter trips based on search criteria
  const filteredTrips = trips.filter((trip) => {
    const dateMatch = searchDate ? trip.date === searchDate : true;
    const locationMatch = searchLocation
      ? trip.location.toLowerCase().includes(searchLocation.toLowerCase())
      : true;
    const tagsMatch = searchTags
      ? trip.tags.some((tag) =>
          tag.toLowerCase().includes(searchTags.toLowerCase())
        )
      : true;
    return dateMatch && locationMatch && tagsMatch;
  });

  return (
    <div>

      <div className="row my-5 justify-content-center"> 
        <div className="col-lg-3">
      
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            type="text"
            placeholder="SEARCH BY DATE..."
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <div className="col-lg-3">
         
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            type="text"
            placeholder="SEARCH BY LOCATION..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        <div className="col-lg-3">
          
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            type="text"
            placeholder="SEARCH BY TAGS..."
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
          />
        </div>
      </div>

      <div className="row justify-content-center">
      <div className="col-9">
      <div className="row"> 
            {filteredTrips.map((trip) => (
     <>
     <div className="col-lg-4">
       <div className="card custom-card" key={trip.id}>
         <img
         src={trip.coverPhotograph}
           className="card-img-top"
           alt="..."
         />
         <div className="card-body">
           <p>
             {" "}
             <Icon.GeoAlt className="color-midnight-blue text-bold font-size-24" />{" "}
             <span className="align-middle font-size-18 color-midnight-blue franklin text-bold"> {trip.location}</span>
           </p>
           <p className="font-size-14 baskerville color-midnight-blue ">{trip.description}</p>
           <div className="mb-3">
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
           </div>

           <div>
             {trip.tags.map((tag, index) => (
               <span key={index} className="badge badge-primary">
                 {tag}
               </span>
             ))}
           </div>
           <div className="row custom-price-and-button-container">
    <div className="col-5">
        <div className="rounded-pill-container">
            <p>
                {" "}
                <Icon.CurrencyDollar className="color-midnight-blue font-size-18" />{" "}
                <span className="align-middle color-midnight-blue" > {trip.cost}</span>
            </p>
        </div>
    </div>
    <div className="col-7 ">
        <div className="pill-button">
            <Link className="font-size-16 book-trip-button text-center" to={trip._id}>
                BOOK TRIP
            </Link>
        </div>
    </div>
</div>

         </div>
       </div>

     </div>
     </>
            ))}
          </div>
        </div>
      </div>
</div>
  );
};

export default Trips;
