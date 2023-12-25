import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
const SingleBlog = ({ guideId }) => {
  const { blogId } = useParams();
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    try {
      const response = await     axios
      .delete(`/deleteBlog/${blogId}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
      console.log("Blog deleted:", response.data.deleteBlog);
      navigate("/blogs"); // Redirect to the blogs list page after deleting
    } catch (error) {
      console.error("Error deleting blog:", error);
      // Handle error state if needed
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
   
      <h2>Single Blog</h2>
      <p>Title: {blog.title}</p>
      <p>Description: {blog.description}</p>
      <p>Date: {blog.date}</p>
      <p>Tags: {blog.tags.join(", ")}</p>
      <button onClick={handleDelete}>Delete Blog</button>
      <Link to={`/blogs/${blogId}`}>Update Blog</Link>
    </div>
  );
};

export default SingleBlog;
