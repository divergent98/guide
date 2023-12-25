import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const UpdateBlog = () => {
  const { guideId, blogId } = useParams();
  console.log(guideId, blogId);
  const [blog, setBlog] = useState(null);
  const [guide, setGuide] = useState();
  const navigate = useNavigate();

  const [path, setPath] = useState(""); // Initialize path as an empty string
  const pathArray = []; // If you want to store multiple paths as an array
  const [pathArrayState, setPathArrayState] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [formState, setFormState] = useState({
    blogId: blogId,
    guideId: guideId,
    title: "",
    description: "",
    date: "",
    tags: [],
    shortDescription: "",
    photographs: [],
    coverPhotograph: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    shortDescription: "",
    coverPhotograph: "",
    date: "",
  });
  useEffect(() => {
    fetchBlogById(blogId);
    fetchGuideById(guideId);
  }, []);
  async function fetchGuideById(guideId) {
    try {
      const response = await axios.get(`/guide/${guideId}`);
      console.log(response.data);
      setGuide(response.data);
    } catch (error) {
      console.error("Error fetching guide by ID:", error);
    }
  }
  useEffect(() => {
    if (blog) {
      setFormState({
        blogId: blog.id,
        guideId: blog.guideId,
        title: blog.title,
        description: blog.description,
        date: blog.date,
        tags: blog.tags,
        shortDescription: blog.shortDescription,
        photographs: blog.photographs,
        coverPhotograph: blog.coverPhotograph,
      });
    }
  }, [blog]);
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
  async function fetchBlogById(blogId) {
    try {
      const response = await axios.get(`/blog/${blogId}`);
      console.log(response.data);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching guide by ID:", error);
    }
  }
  function validateForm() {}
  async function updateBlogFunc() {
    try {
      const updatedBlog = {
        id: formState.blogId,
        guideId: formState.guideId,
        title: formState.title,
        description: formState.description,
        date: formState.date,
        tags: formState.tags,
        shortDescription: formState.shortDescription,
        photographs: formState.photographs,
        coverPhotograph: formState.coverPhotograph,
      };
      if (!updatedBlog.title) {
        setValidationErrors((prevState) => ({
          ...prevState,
          title: "Title cannot be empty",
        }));
        return;
      }
      if (!updatedBlog.shortDescription) {
        setValidationErrors((prevState) => ({
          ...prevState,
          shortDescription: "Short Description cannot be empty",
        }));
        return;
      }
      if (!updatedBlog.coverPhotograph) {
        setValidationErrors((prevState) => ({
          ...prevState,
          coverPhotograph: "Cover Photograph cannot be empty",
        }));
        return;
      }
      if (!updatedBlog.date) {
        setValidationErrors((prevState) => ({
          ...prevState,
          date: "Date cannot be empty",
        }));
        return;
      }
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!updatedBlog.date.match(datePattern)) {
        setValidationErrors((prevState) => ({
          ...prevState,
          date: "Date should be in YYYY-MM-DD format",
        }));
        return;
      }
      // Reset validation errors
      setValidationErrors({
        title: "",
        shortDescription: "",
        coverPhotograph: "",
        date: "",
      });
      console.log(updatedBlog);
      await axios.put(`/updateBlog/${blogId}`, updatedBlog);

      console.log("Guide updated successfully:", updatedBlog);

      navigate(-1);
      // Handle success, redirect, or display a message
    } catch (err) {
      console.log("error updating blog:", err);
      console.log(formState);
    }
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  formState.coverPhotograph = pathArrayState[0];
  formState.photographs = pathArrayState;
  const size = pathArrayState.length / 2;
  const photographs = pathArrayState.slice(size);
  console.log(formState.photographs);
  return (
    <>
      <Layout firstName={guide.guideFirstName} lastName={guide.guideLastName} />
      <div className="container pt-5">
        <div className="mt-5 pt-5"></div>
        <section className="section profile ">
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card ">
                <div className="row justify-content-center">
                  <div className="col-9 mt-5">
                    <h2 className="franklin font-size-16 color-blue-gray letter-spacing text-center">
                      UPDATE BLOG
                    </h2>
                    <input
                      className="hidden"
                      onChange={(event) =>
                        setInput("blogId", event.target.value)
                      }
                      value={formState.blogId}
                      placeholder="Blog Id"
                    />{" "}
                    <input
                      className="hidden"
                      onChange={(event) =>
                        setInput("guideId", event.target.value)
                      }
                      value={formState.guideId}
                      placeholder="Guide ID"
                    />
                    <div className="col-12">
                      {" "}
                      <input
                        className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
                        onChange={(event) =>
                          setInput("title", event.target.value)
                        }
                        value={formState.title}
                        placeholder="Title"
                      />
                      {validationErrors.title && (
                        <p className="text-danger">{validationErrors.title}</p>
                      )}
                    </div>
                    <div className="col-12">
                      {" "}
                      <input
                        className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
                        onChange={(event) =>
                          setInput("description", event.target.value)
                        }
                        value={formState.description}
                        placeholder="Description"
                      />
                    </div>
                    <div className="col-12">
                      {" "}
                      <input
                        className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
                        onChange={(event) =>
                          setInput("date", event.target.value)
                        }
                        value={formState.date}
                        placeholder="Date"
                      />
                      {validationErrors.date && (
                        <p className="text-danger">{validationErrors.date}</p>
                      )}
                    </div>
                    <div className="col-12">
                      {" "}
                      <input
                        className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
                        onChange={(event) =>
                          setInput("tags", event.target.value.split(","))
                        }
                        value={formState.tags.join(",")}
                        placeholder="Tags (comma-separated)"
                      />
                      {validationErrors.tags && (
                        <p className="text-danger">{validationErrors.tags}</p>
                      )}
                    </div>
                    <div className="col-12">
                      {" "}
                      <input
                        className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
                        onChange={(event) =>
                          setInput("shortDescription", event.target.value)
                        }
                        value={formState.shortDescription}
                        placeholder="Resume"
                      />
                    </div>
                    {validationErrors.shortDescription && (
                      <p className="text-danger">
                        {validationErrors.shortDescription}
                      </p>
                    )}
                    <button
                      className="view-button text-center upload-button franklin font-size-16 w-35 my-3 mx-auto letter-spacing px-5"
                      onClick={() => widgetRef.current.open()}
                    >
                      Upload Photographs
                    </button>
                    {validationErrors.coverPhotograph && (
                      <p className="text-danger text-center">
                        {validationErrors.coverPhotograph}
                      </p>
                    )}
                    <h2 className="franklin font-size-16  color-blue-gray letter-spacing text-center">
                      PHOTOGRAPHS
                    </h2>
                    <div className="m-auto">
                      {photographs.map((photo, index) => (
                        <img className="uploaded-photo" src={photo}></img>
                      ))}
                    </div>
                    {validationErrors.photographs && (
                      <p className="text-danger text-center">
                        {validationErrors.photographs}
                      </p>
                    )}
                    <button
                      className="view-button text-center upload-button franklin font-size-16 w-35 my-3 mx-auto letter-spacing px-5"
                      onClick={updateBlogFunc}
                    >
                      Update
                    </button>
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

export default UpdateBlog;
