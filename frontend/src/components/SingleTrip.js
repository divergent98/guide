import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useParams, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CreateTrip from "./CreateTrip";
import ViewTripsReservation from "./ViewTripsReservation";
import Layout from "./Layout";
import axios from "axios";
const SingleTrip = () => {
  const [reservationCount, setReservationCount] = useState(1);

  const { userId, tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const navigateBack = useNavigate();
  console.log(userId);
  console.log(tripId);
  async function fetchTripById(tripId) {
    try {
      const response = await axios.get(`/trip/${tripId}`);
      console.log(response.data);
      setTrip(response.data);
    } catch (error) {
      console.error("Error fetching guide by ID:", error);
    }
  }

  useEffect(() => {
    fetchTripById(tripId)
  }, []);

  if (!trip) {
    return <div>Loading...</div>;
  }

  async function bookTrip(userId, count) {
    try {
      if (!trip.userIds.includes(userId) && trip.capacity >= count) {
        const userIds = [
          ...trip.userIds,
          ...Array.from({ length: count }, () => userId),
        ];

        const updatedCapacity = trip.capacity - count;

        const updatedTrip = {
          id: tripId,
          userIds: userIds,
          capacity: updatedCapacity,
        };

        await axios.put(`/updateTrip/${tripId}`, updatedTrip);
        fetchTripById(); // Refresh trip data after booking
      }
    } catch (err) {
      console.log("error booking trip:", err);
    }
  }
console.log(trip.photographs)
  return (
    <>
      <Layout />
      <div className="container my-5 pt-5"> <Icon.ArrowBarLeft className="font-size-18 color-blue-gray"/>
        <HashLink to={`../single-user/${userId}#view-trips`} className="letter-spacing franklin font-size-14 color-blue-gray ps-0 ms-0">
     BACK TO PROFILE
        </HashLink>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card p-5 custom-card">
                <div className="row">
                  <div className="col-lg-5">
                    {" "}
                    <OwlCarousel
                      items={1}
                      className="owl-theme "
                      loop
                      nav
                      margin={8}
                    >
                      <div>
                        <img
                          className="custom-height-carousel"
                          src={trip.coverPhotograph}
                        />
                      </div>

                        {trip.photographs.map((imageUrl, index) => (
                          <div key={index}>
                            <img
                              className="img"
                              src={imageUrl}
                              alt={`Image ${index}`}
                            />
                          </div>
                        ))}
              
                    </OwlCarousel>
                  </div>
                  <div className="col-lg-7">
                    {" "}
                    <h3  className="text-capitalize align-middle font-size-18 color-midnight-blue franklin text-bold">{trip.description}</h3>
                    <div className="my-3">
                      <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2 mb-3">
                        <Icon.Calendar className="guide-icon" />{" "}
                        <span className="align-middle color-dark-blue font-size-12">{trip.date}</span>
                      </span>
                      <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2 mb-3">
                        <Icon.People className="guide-icon"  />
                        <span className="align-middle color-dark-blue font-size-12"> {trip.capacity}</span>
                      </span>
                      <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2 mb-3">
                        <Icon.Clock className="guide-icon"  />
                        <span className="align-middle color-dark-blue font-size-12"> {trip.duration}</span>
                      </span>
                      <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2 mb-3">
                        <Icon.CarFront className="guide-icon"  />
                        <span className="align-middle color-dark-blue font-size-12">
                          {" "}
                          {trip.transportation}
                        </span>
                      </span>
                    </div>
                    <hr></hr>
                    <p className="baskerville color-dark-blue">{trip.longDescription}</p>

                    <div className="row my-5">
                      <div className="col-8">
                        <div  className="custom-style ">
                        <h2 className="franklin font-size-16  color-blue-gray letter-spacing text-center">
                          MAKE A RESERVATION
                    </h2>
                        <div className="row g-0 border border-1 p-3 rounded-5 bg-color-mighty-blue">
                          <div className="col-8 px-5 pt-1">
                            <input
                              className="form-control-custom reservation-field text-center"
                              type="number"
                              value={reservationCount}
                              placeholder="Number of reservations"
                              onChange={(e) =>
                                setReservationCount(parseInt(e.target.value))
                              }
                            />
                          </div>
                          <div className="col-4">
                            <button
                              className="view-button"
                              onClick={() => bookTrip(userId, reservationCount)}
                              disabled={
                                trip.userIds.includes(userId) ||
                                trip.capacity < reservationCount
                              }
                            >
                              {trip.userIds.includes(userId)
                                ? "Already Reserved"
                                : "Book Trip"}
                            </button>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default SingleTrip;
