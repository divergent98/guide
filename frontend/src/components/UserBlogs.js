import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserBlogs = ({ userInterests}) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigateBack = useNavigate();
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs based on search query whenever the searchQuery or blogs change
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  async function fetchBlogs() {
    try {
        const response = await axios.get(`/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
  }

  const calculateMatchingInterests = (blog) => {
    return blog.tags.filter((tag) => userInterests.includes(tag)).length;
  };

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => calculateMatchingInterests(b) - calculateMatchingInterests(a)
  );

  return (
    <div className="row justify-content-center">

<div className="col-9">
      <div className="row">
        <div className="col-4 my-5">
    
         
          <input
         className="form-control-custom font-size-14 franklin font-weight-bold text-dark"
         type="text"
         placeholder="SEARCH BY TITLE"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {sortedBlogs.map((blog) => (
          <div className="col-6">
            <div className="card custom-card" key={blog.id}>
              <img src={blog.coverPhotograph} className="card-img-top" alt="..." />
              <div className="card-body ">
                <h5 className="font-size-18 color-midnight-blue franklin text-bold">{blog.title}</h5>

                <p className="font-size-14 baskerville color-midnight-blue">{blog.description}</p>
                <div className="mb-3">
         
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="badge rounded-pill bg-color-mighty-blue color-dark-blue border-primary align-middle me-2">
                        <span className="align-middle color-dark-blue font-size-12">{tag}</span>
                      </span>
                    ))}
                
                </div>
                <Link className="color-midnight-blue franklin view-button view-button-blog" to={`/single-blog/${blog._id}`}>Read </Link>
                {/* Display other blog details here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UserBlogs;
