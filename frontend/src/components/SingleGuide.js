import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import CreateTrip from "./CreateTrip";
import CreateBlog from "./CreateBlog";
import ViewTrips from "./ViewTrips";
import Blogs from "./Blogs";
import Layout from "./Layout";
import ViewTripsReservation from "./ViewTripsReservation";

const SingleGuide = () => {
  const { guideId } = useParams();
  const [guides, setGuides] = useState([]);
  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();
  async function fetchGuides() {
    axios
      .get("/guides")
      .then((res) => {
        console.log(res.data);
        setGuides(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchGuides();
  }, []);
  if (!guides) return null;
  console.log(guides);
  console.log(guideId);
  const guide = guides.find((guide) => guide._id === guideId);
  const handleDelete = async () => {
    if (trips.length === 0) {
      try {
        // Delete the guide using the deleteGuideMutation operation
        axios
          .delete(`/deleteGuide/${guideId}`)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        // Navigate to a different page after successful deletion
        navigate("/guides"); // Change '/guides' to the appropriate URL
      } catch (err) {
        console.log("error deleting guide:", err);
      }
    } else {
      alert("Guide cannot be deleted because they have created trips.");
    }
  };
  if (!guide) {
    return <div>Loading...</div>;
  }
  return (
    <>
     <Layout image={guide.guideProfileImage} firstName={guide.guideFirstName} lastName={guide.guideLastName} />
      <div className="container mt-5">
        <div className="pagetitle mt-5">
          <h1 className="mt-5 pt-5">Profile</h1>
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered text-center">
                    <li className="nav-item">
                      <button
                        className="nav-link-custom active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        OVERVIEW
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link-custom "
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        TRIPS
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link-custom "
                        data-bs-toggle="tab"
                        data-bs-target="#profile-settings"
                      >
                        BLOGS
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link-custom nav-link-reservation"
                        data-bs-toggle="tab"
                        data-bs-target="#view-reservations"
                      >
                        RESERVATIONS
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <div className="row align-right"></div>
                      <div className="row justify-content-center">
                        <div className="col-9">
                          <div className="row">
                            {" "}
                            <div className="col-lg-4">
                              <div
                                width={200}
                                height={200}
                                className="rounded-circle m-auto"
                                style={{
                                  backgroundImage: `url(${guide.guideProfileImage})`,
                                  backgroundSize: "cover",
                                  width: "150px",
                                  height: "150px",
                                  backgroundPosition: "center",
                                }}
                              ></div>

                              <h2 className="text-center mt-3 franklin color-midnight-blue ">
                                {" "}
                                {guide.guideUsername}
                              </h2>
                            </div>
                            <div className="col-lg-8">
                              {" "}
                              <h5 className=" mt-3 franklin color-midnight-blue font-size-24">
                                About
                              </h5>
                              <p className="small fst-italic baskerville color-dark-blue">
                                {guide.guideAbout}
                              </p>
                            </div>
                          </div>{" "}
                          <div className="row">
                            <div className="col-4">
                              <h5 className="franklin font-size-24 color-midnight-blue my-3">
                                Interests
                              </h5>
                              <div className="col-lg-9 col-md-8 franklin color-dark-blue">
                                {guide.guideInterests.map((interest, index) => (
                                  <span
                                    key={index}
                                    className="badge bg-color-mighty-blue rounded-5 me-2 color-midnight-blue font-size-12 franklin"
                                  >
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="col-8">
                              {" "}
                              <h5 className="franklin my-3 color-midnight-blue font-size-24">
                                Profile Details
                              </h5>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Full Name
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {guide.guideFirstName} {guide.guideLastName}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Username
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {guide.guideUsername}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Birth Date
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {guide.guideBirthDate}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Location
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {guide.guideLocation}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Phone
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {guide.guidePhone}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Email
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {guide.guideEmail}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <hr className="my-5" />
                      </div>
                      <div className="profile-card-footer">
                        <Link
                          to={`/guides/${guideId}`}
                          className="view-button align-right color-midnight-blue"
                        >
                          Update{" "}
                        </Link>

                        <button
                          className="view-button bg-transparent view-button-delete color-midhight-blue"
                          onClick={handleDelete}
                        >
                          Delete Profile
                        </button>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {" "}
                      <div className="row justify-content-center">
                        <div className="col-9">
                          <ul className="nav style-none profile-card-footer">
                            <li className="nav-item">
                              <button
                                className="nav-link-custom active"
                                data-bs-toggle="tab"
                                data-bs-target="#view-trips"
                              >
                                View
                              </button>
                            </li>

                            <li className="nav-item">
                              <button
                                className="nav-link-custom"
                                data-bs-toggle="tab"
                                data-bs-target="#create-trip"
                              >
                                Create
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content pt-2">
                            <div
                              className="tab-pane fade show active profile-overview"
                              id="view-trips"
                            >
                              {" "}
                              <ViewTrips guideId={guideId} />
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade profile-edit pt-3"
                          id="create-trip"
                        >
                          <div>
                            <CreateTrip guideId={guideId} />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-settings"
                    >
                      <div className="row justify-content-center">
                        <div className="col-9">
                        <ul className="nav style-none profile-card-footer">
                          <li className="nav-item">
                            <button
                              className="nav-link-custom active"
                              data-bs-toggle="tab"
                              data-bs-target="#view-blogs"
                            >
                              View
                            </button>
                          </li>

                          <li className="nav-item">
                            <button
                              className="nav-link-custom"
                              data-bs-toggle="tab"
                              data-bs-target="#create-blog"
                            >
                              Create
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content pt-2">
                          <div
                            className="tab-pane fade show active profile-overview"
                            id="view-blogs"
                          >
                            <Blogs guideId={guideId} />
                          </div>

                          <div
                            className="tab-pane fade profile-edit pt-3"
                            id="create-blog"
                          >
                            <div>
                              <CreateBlog guideId={guideId} />
                            </div>
                          </div>
                        </div>
                      </div></div>
                    </div>

                    <div className="tab-pane fade pt-3" id="view-reservations">
                      <ViewTripsReservation />
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

export default SingleGuide;
