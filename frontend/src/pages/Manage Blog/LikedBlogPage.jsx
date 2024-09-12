import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../utils/api";
import Cookies from "js-cookie";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartBroken, FaRegEye } from "react-icons/fa";
import { getImageUrl } from "../../utils/getImageUrl";

function LikedBlogPage() {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const { user, updateUser } = useAuthStore();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedBlogs = async () => {
      try {
        const res = await axios.get(`${api}api/v1/blogs/user/liked-blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blogs = res.data.data;
        const blogsWithAuthors = await Promise.all(
          blogs.map(async (blog) => {
            const authorRes = await axios.get(
              `${api}api/v1/users/user/${blog.author}`
            );
            return { ...blog, author: authorRes.data.data };
          })
        );
        setLikedBlogs(blogsWithAuthors);
      } catch (error) {
        console.error("Error fetching liked blogs:", error);
      }
    };

    fetchLikedBlogs();
  }, []);

  const handleUnlikeBlog = async (blogId) => {
    if (!token) {
      toast.info("You Need to Log In to Unlike This Blog.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      await axios.post(
        `${api}api/v1/blogs/${blogId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikedBlogs((prevLikedBlogs) =>
        prevLikedBlogs.filter((blog) => blog._id !== blogId)
      );

      // Optionally update the user state
      const updatedUserData = {
        ...user,
        likes: user.likes.filter((like) => like !== blogId),
      };
      updateUser(updatedUserData);

      toast.success("Blog unliked successfully.", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error unliking the blog:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Liked Blogs</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-4 py-2 text-center border-r border-gray-300">
              N.o.
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
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {likedBlogs.length > 0 ? (
            likedBlogs.map((blog, index) => (
              <tr
                key={blog._id}
                className={`border-b ${
                  (index + 1) % 2 === 0 ? "bg-green-50" : ""
                }`}
              >
                <td className="px-2 py-2 text-center border-r border-gray-300 text-sm">
                  {index + 1}
                </td>
                <td
                  className="px-2 py-2 text-center text-sm border-r border-gray-300"
                  title={blog?.title}
                >
                  {blog.title.slice(0, 20) + "..."}
                </td>
                <td
                  className="px-2 py-2 text-center text-sm border-r border-gray-300"
                  title={blog.category}
                >
                  {blog.category}
                </td>
                <td className="px-2 py-2 text-center text-sm border-r border-gray-300">
                  <div className="flex items-center justify-center gap-x-2">
                    <img
                      src={getImageUrl(user.avatar)}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user.fullname}</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-center text-sm border-r border-gray-300">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-8 object-cover rounded-md"
                  />
                </td>
                <td className="px-2 py-2 text-center text-sm">
                  <button
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                    className="text-green-500 p-2 rounded-lg mr-2 hover:bg-green-100 bg-green-50"
                  >
                    <FaRegEye />
                  </button>
                  <button
                    onClick={handleUnlikeBlog}
                    className="text-red-500 p-2 rounded-lg hover:bg-red-100 bg-red-50"
                  >
                    <FaHeartBroken />
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
    </div>
  );
}

export default LikedBlogPage;
