import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Client/Loading/Loading";

function CreateBlogPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const token = Cookies.get("token");

  const { user, loadUserFromLocalStorage } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await loadUserFromLocalStorage();
      if (!user && !token) {
        navigate("/login");
      } else {
        setLoading(false); // Set loading to false once authentication check is done
      }
    };

    checkAuth();
  }, [user, token, navigate, loadUserFromLocalStorage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      content,
      category,
      image,
    };

    try {
      const response = await axios.post(`${api}api/v1/blogs/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ handleSubmit ~ response:", response);
      toast.success("Created Blog Successfully!");
    } catch (error) {
      toast.error("Error creating Blog Successfully!");
      console.error("There was an error creating the blog!", error);
    }
  };

  // Render a loading indicator while checking authentication
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="create-blog-page">
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <ReactQuill value={content} onChange={setContent} required />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlogPage;
