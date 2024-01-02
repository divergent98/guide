import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import * as Icon from "react-bootstrap-icons";

const ViewBlog = () => {
  const { blogId } = useParams();
  const navigateBack = useNavigate();
  const [blog, setBlog] = useState(null);
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    fetchBlogById(blogId);
  }, []);

  async function fetchBlogById(blogId) {
    try {
      const response = await axios.get(`/blog/${blogId}`);
      console.log(response.data);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching guide by ID:", error);
    }
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout />
      <div className="spacer"></div>
      <div className="container my-5">
        <Icon.ArrowBarLeft className="font-size-18 color-blue-gray" />
        <button
          className="letter-spacing franklin font-size-14 color-blue-gray ps-0 ms-0 bg-transparent border-0"
          onClick={() => navigateBack(-1)}
        >
          BACK TO PROFILE
        </button>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card p-5 custom-card">
                <div>
                  <h3 className="text-capitalize text-center mb-0 pb-0 align-middle font-size-18 color-midnight-blue franklin text-bold">
                    {blog.title}
                  </h3>
                  <div className="row">
                    <div className="profile-card-footer">
                      <div className="row">
                        <div className="col-2">
                          <Icon.Calendar className="guide-icon color-dark-blue font-size-12" />
                        </div>
                        <div className="col-10 mt-1 color-dark-blue">
                          {blog.date}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-2">
                          <Icon.Person className="guide-icon color-dark-blue font-size-12" />
                        </div>
                        <div className="col-9 mt-1 color-dark-blue">Author</div>
                      </div>
                    </div>
                    <hr className=""></hr>
                    <div className="col-12 text-center">
                      {" "}
                      <p>
                        {blog.tags.map((tag) => (
                          <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2 ">
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="profile">
                    <img
                      src={blog.coverPhotograph}
                      className="profile-cover"
                      alt="ovdje dodje slika"
                    />
                  </div>{" "}
                  <div class="quote-container">
                    <blockquote className="font-size-24 text-justify mt-5 baskerville">
                      {blog.description} 
                    </blockquote>
                  </div>

                  <hr></hr>
                  <div className="my-5">
                    <p className="baskerville align-justify font-size-14 color-midnight-blue align-justify">
                   {blog.shortDescription}
                    </p>
                  </div>
                  <OwlCarousel
                    items={6}
                    className="owl-theme justify-content-center"
                    nav
                    margin={8}
                  >
                    {blog.photographs.map((imageUrl, index) => (
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ViewBlog;
