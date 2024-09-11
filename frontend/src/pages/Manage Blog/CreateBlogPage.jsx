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
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(""); // State for image preview
  const token = Cookies.get("token");

  const { user, loadUserFromLocalStorage } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await loadUserFromLocalStorage();
      if (!user && !token) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [loadUserFromLocalStorage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
      navigate("/dashboard/manage-blogs");
    } catch (error) {
      toast.error("Error creating Blog!");
      console.error("There was an error creating the blog!", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image:
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Image:
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            accept="image/*"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-4 max-w-full h-auto rounded-md shadow-sm"
            />
          )}
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content:
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlogPage;
