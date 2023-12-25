import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
/* import CreateTrip from "./CreateTrip"; */

import UserBlogs from "./UserBlogs";
import Trips from "./Trips";
import Guides from "./Guides";
import axios from "axios";
import Layout from "./Layout";
const SingleUser = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  async function fetchUsers() {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  const user = users.find((user) => user._id === userId);
  if (!user) {
    return <div>Loading...</div>;
  }
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        axios
          .delete(`/deleteUser/${userId}`)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        navigate("/login");
      } catch (err) {
        console.log("error deleting user:", err);
      }
    }
  }
  return (
    <>
      <Layout image={user.userProfileImage} firstName={user.userFirstName} lastName={user.userLastName} />
      <div className="container pt-5">
        <div className="pagetitle">
          <h1 className="mt-5">Profile</h1>
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered franklin font-size-14">
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
                        className="nav-link-custom"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        GUIDES
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link-custom"
                        data-bs-toggle="tab"
                        data-bs-target="#trips"
                      >
                        TRIPS
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link-custom"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        BLOGS
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <div className="row justify-content-center">
                        <div className="col-9">
                          {" "}
                          <div className="row">
                            <div className="col-4 text-center pt-3">
                              <div
                                width={200}
                                height={200}
                                className="rounded-circle m-auto"
                                style={{
                                  backgroundImage: `url(${user.userProfileImage})`,
                                  backgroundSize: "cover",
                                  width: "150px",
                                  height: "150px",
                                  backgroundPosition: "center",
                                }}
                              ></div>

                              <h2 className="mt-3 franklin color-midnight-blue ">
                                {user.userName}{" "}
                              </h2>
                            </div>
                            <div className="col-8">
                              <h5 className=" mt-3 franklin color-midnight-blue font-size-24">
                                About
                              </h5>
                              <p className="small fst-italic baskerville color-dark-blue">
                                {user.userAbout}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              {" "}
                              <h5 className="franklin font-size-24 color-midnight-blue my-3">
                                Interests
                              </h5>
                              <div>
                                {user.userInterests.map((interest, index) => (
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
                                  {user.userFirstName} {user.userLastName}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Phone
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {user.userPhone}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Email
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {user.userEmail}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-4 franklin color-midnight-blue font-size-14">
                                  Birth date
                                </div>
                                <div className="col-lg-9 col-md-8 franklin color-dark-blue font-size-14">
                                  {user.userBirthDate}
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
                          className="view-button align-right color-midnight-blue"
                          to={`/users/${userId}`}
                        >
                          Update
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
                      <div>
                        <Guides
                          userInterests={user.userInterests}
                          userId={userId}
                        />
                      </div>
                    </div>

                    <div className="tab-pane fade pt-3" id="trips">
                      <div id="view-trips">
                        <Trips />
                      </div>
                    </div>

                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    >
                      <div>
                        <UserBlogs userInterests={user.userInterests} />
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

export default SingleUser;
