import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

const Blogs = ({ guideId }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    fetchBlogs();
  }, [guideId]);

  useEffect(() => {
    // Filter blogs based on search query whenever the searchQuery or blogs change
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  async function fetchBlogs() {
    try {
        const response = await axios.get(`/blogs/${guideId}`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
  }

  const handleDelete = async (blogId) => {
    console.log(blogId);
    axios
      .delete(`/deleteBlog/${blogId}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
<div>
  <div className="row justify-content-center">
    <div className="col-4">
      <input
        className="form-control-custom text-center font-size-14 franklin font-weight-bold text-dark"
        type="text"
        placeholder="SEARCH BY TITLE"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>

  <div className="row">
    {filteredBlogs.map((blog) => (
      <div className="col-4">
        <div className="card custom-card" key={blog.id}>
          <div className="custom-card-image">
            <img src={blog.coverPhotograph} alt="..." />
          </div>
          <div className="card-body ">
            <h5 className="text-capitalize align-middle font-size-18 color-midnight-blue franklin text-bold">{blog.title}</h5>

            <span className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2 mb-3">
            <Icon.Calendar className="guide-icon" />{" "}
            <span className="align-middle color-dark-blue font-size-12">
            {blog.date}
            </span>
            </span>
            <div>
                       {blog.tags.map((tag, index) => (
                         <span key={index} className="badge bg-color-mighty-blue rounded-5 me-2 color-midnight-blue font-size-12 franklin">
                           {tag}
                         </span>
                       ))}
                     </div>
            {/* Display other blog details here */}
            {/* <BlogPhotographs photographs={blog.photographs} /> */}
            <div className="profile-card-footer mt-3">
              <button
                className="view-button bg-transparent view-button-delete color-midnight-blue"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
              <Link
                className="view-button align-right color-midnight-blue"
                to={`blog/${blog._id}`}
              >
                Update
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

const BlogPhotographs = ({ photographs }) => {
  return (
    <div>
      <h4>Photographs:</h4>
      <ul>
        {photographs.map((photo, index) => (
          <li key={index}>
            <img src={photo} alt={`Photograph ${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
