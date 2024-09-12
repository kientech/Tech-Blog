import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { formatDate } from "../utils/formatDate";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Client/Loading/Loading";
import parse from "html-react-parser";
import SideBar from "../components/Client/SideBar/SideBar";
import ModalShare from "../components/Client/Share Blog/ModalShare";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { getImageUrl } from "../utils/getImageUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

function DetailBlogPage() {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading status
  const { slug } = useParams();
  const token = Cookies.get("token");
  const { user, updateUser } = useAuthStore();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogResponse = await axios.get(`${api}api/v1/blogs/${slug}`);
        const blogData = blogResponse.data.data;
        setBlog(blogData);

        document.title = blogData.title || "Default Blog Title";

        const authorId = blogData.author;
        const authorResponse = await axios.get(
          `${api}api/v1/users/user/${authorId}`
        );
        setAuthor(authorResponse.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError("Failed to fetch blog details.");
        document.title = "Error Loading Blog";
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [slug]);

  const handleLikeBlog = async () => {
    if (!token) {
      toast.info("You Need Log In to Like This Blog.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); // Notify user to log in
      return;
    }
    try {
      const response = await axios.post(
        `${api}api/v1/blogs/${blog._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlog((prev) => ({
        ...prev,
        likes: response.data.data,
      }));

      const updatedUserData = response.data.data;

      // Update the user state and localStorage
      updateUser({ ...user, likes: updatedUserData });
    } catch (error) {
      console.error("Error liking the blog:", error);
      setError("Failed to like the blog.");
    }
  };

  const shareOnSocialMedia = (platform) => {
    const shareUrl = `${window.location.origin}/blog/${slug}`;
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/share?url=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    };
    window.open(urls[platform], "_blank");
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!blog || !author) return <Loading />;

  const hasLiked = blog.likes.includes(user?._id);
  console.log("🚀 ~ DetailBlogPage ~ hasLiked:", hasLiked);
  console.log("🚀 ~ DetailBlogPage ~ author:", author._id);

  return (
    <div className="flex gap-x-8">
      <div className="w-[70%] mx-auto p-6 my-4">
        <div className="flex items-center gap-x-2 w-full overflow-auto mb-4">
          <Link to={"/"} className="text-sm text-buttonColor">
            Tech Blog
          </Link>
          <span className="block w-1 h-1 rounded-full bg-buttonColor"></span>
          <Link to={`/category/${blog.category}`} className="text-sm text-buttonColor">
            {blog.category}
          </Link>
          <span className="block w-1 h-1 rounded-full bg-buttonColor"></span>
          <span className="text-textBase">{blog.title.slice(0, 50)} ...</span>
        </div>
        <h1 className="text-3xl font-bold my-4 text-textBold leading-relaxed">
          {blog.title}
        </h1>
        <div className="text-gray-600 mb-4 flex items-center gap-x-4">
          <img
            src={getImageUrl(author?.avatar)}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-800 font-semibold">{author.fullname}</span>
          <span className="block w-1 h-1 rounded-full bg-buttonColor"></span>
          <span className="text-gray-500"> {formatDate(blog.createdAt)}</span>
        </div>
        <div className="mt-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-100 object-cover mb-4 rounded-lg"
          />
          <div className="prose lg:prose-xl">{parse(blog.content)}</div>

          <span className="block w-full h-[1px] bg-gray-100 mt-20 mb-8"></span>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-buttonColor flex items-center gap-x-4 text-white px-4 py-2 rounded-lg"
            >
              <FaShareAlt />
              <span>Share this blog</span>
            </button>

            <button onClick={handleLikeBlog} className="ml-4">
              {hasLiked ? (
                <FaHeart size={20} className="text-red-500" />
              ) : (
                <FaRegHeart size={20} className="text-red-500" />
              )}
            </button>
          </div>

          <div className="w-full my-8 py-16 px-10 flex items-center gap-x-10 rounded-lg bg-[#fee0cf]">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={getImageUrl(author?.avatar)}
                alt=""
                className="w-full h-full rounded-full hover:scale-105 transition-all object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-semibold text-buttonColor text-2xl mb-2">
                {author.fullname}
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur aut esse officia eum dolorem minus? Laboriosam
                pariatur earum maxime at facere atque provident molestiae,
                cupiditate nemo beatae, expedita voluptatum ad.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-x-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img
                  src="https://cdn.dribbble.com/userupload/12532315/file/original-17d2e661a6708bc1b0cf70b8e8ed0495.jpg?resize=1504x1128"
                  alt=""
                  className="w-full h-full rounded-lg transition-all hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[30%]">
        <SideBar />
      </div>
      <ModalShare
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blogLink={`${window.location.origin}/blog/${slug}`}
        shareOnSocialMedia={shareOnSocialMedia}
      />
    </div>
  );
}

export default DetailBlogPage;
