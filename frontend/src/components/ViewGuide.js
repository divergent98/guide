import React, { useState, useEffect } from "react";
import axios from "axios";
import Trips from "./Trips"
import * as Icon from "react-bootstrap-icons";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Layout from "./Layout";
import TripsGuide from "./TripsGuide";
import backgroundImage from "../nature-5.jpg"
const ViewGuide = () => {
  const { guideId, userId } = useParams();
  const [guide, setGuide] = useState(null);
  const [trips, setTrips] = useState([]);
console.log(userId)
  const navigate = useNavigate();
  async function fetchGuideById(guideId) {
    try {
      const fetchedGuide  = await axios.get(`/guide/${guideId}`);

      setGuide(fetchedGuide.data);

      // Fetch trips associated with the guide
      const fetchedTrips= await axios.get(`/trips/${guideId}`);
      setTrips(fetchedTrips);
    } catch (err) {
      console.log("error fetching guide:", err);
    }
  }
  console.log(guide)

  useEffect(() => {
    fetchGuideById(guideId);
  }, []);

  if (!guide) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Layout />
  
      
      <div className="container mt-5 pt-5">  
      <Icon.ArrowBarLeft className="font-size-18 color-blue-gray"/>
        <HashLink to={`../single-user/${userId}#view-trips`} className="letter-spacing franklin font-size-14 color-blue-gray ps-0 ms-0">
     BACK TO PROFILE
        </HashLink>
        <section className="section profile">
          <div className="row profile-overview">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-body pt-3">
                  <div className="profile">
                    <div className="profile-avatar">
                      <img
                        src={guide.guideProfileImage}
                        alt=""
                        className="profile-img"
                      />
                      <h2 className="profile-name franklin">
                        {" "}
                        {guide.guideFirstName} {guide.guideLastName}
                      </h2>
                    </div>
                    <img
                      src={backgroundImage}
                      alt=""
                      className="profile-cover mb-5"
                    />
                  </div>
                  <div className="spacer"></div>
                  <div className="spacer"></div>
                  <div className="row"> </div>
                  <div className="row ">
                    <div className="col-4 mt-3">
                    <div className="card custom-card">
  <div className="card-body mt-3">
    <h5 className="card-title ms-2 franklin">Profile Details</h5>

    <table className="table custom-profile-table">
      <tbody className="">
        <tr>
          <td className="label bg-transparent franklin uppercase font-size-12 color-blue-gray align-bottom">Full Name</td>
          <td className="color-midnight-blue franklin bg-transparent font-size-14 italic align-bottom">{guide.guideFirstName} {guide.guideLastName}</td>
        </tr>
        <tr>
          <td className="label bg-transparent franklin uppercase font-size-12 color-blue-gray align-bottom">Username</td>
          <td className="color-midnight-blue franklin bg-transparent font-size-14 italic align-bottom">{guide.guideUsername}</td>
        </tr>
        <tr>
          <td className="label bg-transparent franklin uppercase font-size-12 color-blue-gray align-bottom">Birth Date</td>
          <td className="color-midnight-blue franklin bg-transparent font-size-14 italic align-bottom">{guide.guideBirthDate}</td>
        </tr>
        <tr>
          <td className="label bg-transparent franklin uppercase font-size-12 color-blue-gray align-bottom">Location</td>
          <td className="color-midnight-blue franklin bg-transparent font-size-14 italic align-bottom">{guide.guideLocation}</td>
        </tr>
        <tr>
          <td className="label bg-transparent franklin uppercase font-size-12 color-blue-gray align-bottom">Phone</td>
          <td className="color-midnight-blue franklin bg-transparent font-size-14 italic align-bottom">{guide.guidePhone}</td>
        </tr>
        <tr>
          <td className="label bg-transparent franklin uppercase font-size-12 color-blue-gray align-bottom">Email</td>
          <td className="color-midnight-blue franklin bg-transparent font-size-14 italic align-bottom">{guide.guideEmail}</td>
        </tr>
        <tr>
    
          <td colSpan={2} className="bg-transparent align-bottom">
             {guide.guideInterests.map((interest, index) => (
              <span key={index}  className="badge rounded-pill bg-color-mighty-blue color-midnight-blue border-primary align-middle me-2 mb-3">
                {interest}
              </span>
            ))} 
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

                    </div>

                    <div className="col-lg-8">
                      <div className="mt-3 ">
                        <div className="card-body p-3">
                          {" "}
                          <h5 className="card-title franklin">About</h5>
                          <p className="small fst-italic baskerville">{guide.guideAbout}</p>
                        </div>
                      </div>
                   
                    </div>   <TripsGuide userId = {userId}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
    </>
  );
};

export default ViewGuide;
