import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const initialState = {
  guideId: "",
  title: "",
  description: "",
  date: "",
  tags: [],
  shortDescription: "",
  photographs: [],
  coverPhotograph: "",
};

const CreateBlog = ({ guideId }) => {
  const [formState, setFormState] = useState({
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
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState(""); // Initialize path as an empty string
  const pathArray = []; // If you want to store multiple paths as an array
  const [pathArrayState, setPathArrayState] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
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
  async function addBlog() {
    try {
      const { title, shortDescription, coverPhotograph, date } = formState;

      if (!title) {
        setValidationErrors((prevState) => ({
          ...prevState,
          title: "Title cannot be empty",
        }));
        return;
      }
      if (!shortDescription) {
        setValidationErrors((prevState) => ({
          ...prevState,
          shortDescription: "Short Description cannot be empty",
        }));
        return;
      }
      if (!coverPhotograph) {
        setValidationErrors((prevState) => ({
          ...prevState,
          coverPhotograph: "Cover Photograph cannot be empty",
        }));
        return;
      }
      if (!date) {
        setValidationErrors((prevState) => ({
          ...prevState,
          date: "Date cannot be empty",
        }));
        return;
      }
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!date.match(datePattern)) {
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

      const blog = { ...formState };
      blog.tags = blog.tags || [];
      blog.photographs = blog.photographs || [];

      const createBlogInput = {
        ...blog,
        tags: blog.tags.filter(Boolean),
        photographs: blog.photographs.filter(Boolean),
      };

      console.log(createBlogInput);
      const response = await axios.post("/createBlog", createBlogInput);
      console.log(response);
      window.location.reload();
      setFormState(initialState);
    } catch (err) {
      console.log("error creating blog:", err);
    }
  }
  formState.coverPhotograph = pathArrayState[0];
  formState.photographs = pathArrayState;
  const size = pathArrayState.length / 2;
  const photographs = pathArrayState.slice(size);
  console.log(formState.photographs);
  return (
    <div>

        <h2 className="franklin font-size-16 color-blue-gray letter-spacing text-center">CREATE BLOG</h2>
        <input
          className="d-none form-control-custom font-size-14 franklin font-weight-bold text-dark"
          onChange={(event) => setInput("guideId", event.target.value)}
          value={formState.guideId}
          placeholder="Guide ID"
        />
        <div className="col-12">

          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            onChange={(event) => {
              setInput("title", event.target.value);
              setValidationErrors((prevState) => ({
                ...prevState,
                title: "",
              }));
            }}
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
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            placeholder="Content"
            style={{ display: "none" }}
          />
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            onChange={(event) => setInput("description", event.target.value)}
            value={formState.description}
            placeholder="Resume"
          />
        </div>
        <div className="col-12">
       
          <input
            className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
            onChange={(event) => {
              setInput("date", event.target.value);
              setValidationErrors((prevState) => ({
                ...prevState,
                date: "",
              }));
            }}
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
          {validationErrors.shortDescription && (
            <p className="text-danger">{validationErrors.shortDescription}</p>
          )}
        </div>
   
        <button
        className="view-button text-center upload-button franklin font-size-16 w-35 my-3 mx-auto letter-spacing px-5"
          onClick={() => widgetRef.current.open()}
        >
          Upload Photographs
        </button>
        {validationErrors.coverPhotograph && (
          <p className="text-danger text-center">{validationErrors.coverPhotograph}</p>
        )}
        <h2 className="franklin font-size-16  color-blue-gray letter-spacing text-center">PHOTOGRAPHS</h2>
        <div className="m-auto">
          {photographs.map((photo, index) => (
            <img className="uploaded-photo" src={photo}></img>
          ))}
        </div>
        {validationErrors.photographs && (
          <p className="text-danger text-center">{validationErrors.photographs}</p>
        )}

        <button className="view-button text-center upload-button franklin font-size-16 w-35 my-3 mx-auto letter-spacing px-5" onClick={addBlog}>
          Create
        </button>

    </div>
  );
};

export default CreateBlog;
