import React, { Component } from "react";
import { useEffect, useState, useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Guides = ({userId}) => {
  const [guides, setGuides] = useState([]);
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchInterests, setSearchInterests] = useState("");

  useEffect(() => {
    fetchGuides();
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

  // Filter guides based on search criteria
  const filteredGuides = guides.filter((guide) => {
    const firstNameMatch = searchFirstName
      ? guide.guideFirstName
          .toLowerCase()
          .includes(searchFirstName.toLowerCase())
      : true;
    const lastNameMatch = searchLastName
      ? guide.guideLastName.toLowerCase().includes(searchLastName.toLowerCase())
      : true;
    const interestsMatch = searchInterests
      ? guide.guideInterests.some((interest) =>
          interest.toLowerCase().includes(searchInterests.toLowerCase())
        )
      : true;
    return firstNameMatch && lastNameMatch && interestsMatch;
  });

  return (
    <div className="mt-5">
      <div className="row justify-content-center mb-5">
        <div className="col-lg-3">
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            placeholder="SEARCH BY FIRST NAME... "
            value={searchFirstName}
            onChange={(e) => setSearchFirstName(e.target.value)}
          />
        </div>
        <div className="col-lg-3">
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            type="text"
            placeholder="SEARCH BY LAST NAME... "
            value={searchLastName}
            onChange={(e) => setSearchLastName(e.target.value)}
          />
        </div>
        <div className="col-lg-3">
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            type="text"
            placeholder="SEARCH BY INTERESTS... "
            value={searchInterests}
            onChange={(e) => setSearchInterests(e.target.value)}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-9">
        {filteredGuides.map((guide) => (
   <div className="card custom-card" key={guide.id}>  
   <div className="row g-0 ">
     <div className="col-md-4">
       <img
         src={guide.guideProfileImage}
         className="guide-image"
         alt="..."
       />
     </div>
     <div className="col-md-8 ">
       <div className="guide-card-body">
       <h5 className="card-title font-size-24 franklin color-midnight-blue">{guide.guideFirstName} {guide.guideLastName}</h5>
               
                     <div className="my-3 guide-icon-container"> 
                     <span className="badge border border-midnight-blue color-midnight-blue rounded-5 guide-icon-text font-size-14 franklin">
                         <Icon.Calendar className="guide-icon" />{" "}
                         {guide.guideBirthDate}
                       </span>
                       <span className="badge border border-midnight-blue color-midnight-blue rounded-5 guide-icon-text font-size-14 franklin">
                         <Icon.GeoAlt className="guide-icon" />{" "}
                         {guide.guideLocation}
                       </span>
                     </div>
                     <div>
                       {guide.guideInterests.map((interest, index) => (
                         <span key={index} className="badge bg-color-mighty-blue rounded-5 me-2 color-midnight-blue font-size-12 franklin">
                           {interest}
                         </span>
                       ))}
                     </div>

                     <div className="mt-3">
                     <Link className="color-midnight-blue franklin view-button view-button-guide" to={`/view-guide/${userId}/${guide._id}`}>View profile</Link>
                     </div>
   
   
    
       </div>
     </div>
   
   </div></div>
        ))}</div>
      </div>
    </div>
  );
};

export default Guides;
