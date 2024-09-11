import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { api } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import Loading from "../../components/Client/Loading/Loading";

function ManageBlogsPage() {
  const token = Cookies.get("token");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState(""); // State for input field
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${api}api/v1/blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  const handleDelete = async () => {
    if (confirmTitle === blogToDelete.title) {
      // Check if input matches the blog title
      try {
        await axios.delete(`${api}api/v1/blogs/delete/${blogToDelete._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(blogs.filter((blog) => blog._id !== blogToDelete._id));
        toast.success("Blog Deleted Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowConfirmModal(false);
        setConfirmTitle(""); // Clear the input field
        setErrorMessage(""); // Clear the error message
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    } else {
      setErrorMessage("The blog title does not match. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-blog/${id}`);
  };

  const openConfirmModal = (blog) => {
    setBlogToDelete(blog);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setBlogToDelete(null);
    setConfirmTitle("");
    setErrorMessage("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      {loading && <Loading borderTopColor="buttonColor" />}
      {error && <p className="text-red-500">Error: {error}</p>}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center">
        <thead>
          <tr className="bg-gray-100 border-b text-center">
            <th className="px-4 py-2 text-center border-r border-gray-300">
              STT
            </th>
            <th className="px-4 py-2 text-center border-r border-gray-300">
              Title
            </th>
            <th className="px-4 py-2 text-center border-r border-gray-300">
              Category
            </th>
            <th className="px-4 py-2 text-center border-r border-gray-300">
              Author
            </th>
            <th className="px-4 py-2 text-center border-r border-gray-300">
              Image
            </th>
            <th className="px-4 py-2 text-center border-r border-gray-300">
              Status
            </th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <tr
                key={blog._id}
                className={`border-b ${
                  (index + 1) % 2 === 0 ? "bg-green-50" : ""
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">
                  {blog.title}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">
                  {blog.category}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">
                  {user.fullname}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-8 h-8 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2 border-r border-gray-300">
                  <span
                    className={`px-2 py-1 rounded ${
                      blog.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openConfirmModal(blog)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center px-4 py-2">
                No blogs found
              </td>
              <td colSpan="6" className="text-center px-4 py-2">
                <Link to={"/dashboard/create-blog"}>Create new blog</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>To confirm the deletion, please type the title of the blog:</p>
            <input
              type="text"
              value={confirmTitle}
              onChange={(e) => setConfirmTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
              placeholder="Enter blog title"
            />
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={closeConfirmModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageBlogsPage;
