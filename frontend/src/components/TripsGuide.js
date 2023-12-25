import React, { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const TripsGuide = ({userId}) => {
  const [trips, setTrips] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const navigate = useNavigate();
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

      <div className="row justify-content-center">
      <div className="col-12">
      <div className="row">
  {filteredTrips.slice(0, 3).map((trip) => (
    <div className="col-lg-4" key={trip.id}>
      <div className="card custom-card">
        <div className="row mt-3">
          <div className="col-4">
            <img
              src={trip.coverPhotograph}
              className="card-img-top-2"
              alt="..."
            />
          </div>
          <div className="col-8">
            <div className="card-body pt-2">
              <p>
                {" "}
                <Icon.GeoAlt className="color-midnight-blue text-bold font-size-24" />{" "}
                <span className="align-middle font-size-18 color-midnight-blue franklin text-bold">
                  {" "}
                  {trip.location}
                </span>
              </p>

              <div className="row custom-price-and-button-container">
                <div className="col-5">
                  <div className="rounded-pill-container">
                    <p>
                      {" "}
                      <Icon.CurrencyDollar className="color-midnight-blue font-size-18" />{" "}
                      <span className="align-middle color-midnight-blue">
                        {" "}
                        {trip.cost}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-7">
                  <div className="pill-button">
                    <Link
                      className="font-size-16 book-trip-button text-center"
                      to={`/single-user/${userId}/${trip._id}`}
                    >
                      BOOK TRIP
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
</div>
  );
};

export default TripsGuide;
