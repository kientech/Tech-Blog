import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { formatDate } from "../utils/formatDate";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Client/Loading/Loading";
import parse from "html-react-parser";
import SideBar from "../components/Client/SideBar/SideBar";
import ModalShare from "../components/Client/Share Blog/ModalShare";
import { FaShareAlt } from "react-icons/fa";
import { getImageUrl } from "../utils/getImageUrl";

function DetailBlogPage() {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        // Fetch blog details
        const blogResponse = await axios.get(`${api}api/v1/blogs/${id}`);
        setBlog(blogResponse.data.data);

        // Fetch author details
        const authorId = blogResponse.data.data.author;
        const authorResponse = await axios.get(
          `${api}api/v1/users/user/${authorId}`
        );
        setAuthor(authorResponse.data.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError("Failed to fetch blog details.");
      }
    };

    fetchBlogDetails();
  }, [id]);

  const shareOnSocialMedia = (platform) => {
    const shareUrl = `${window.location.origin}/blog/${id}`;
    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/share?url=${shareUrl}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
        "_blank"
      );
    }
  };

  if (error) return <div>{error}</div>;
  if (!blog || !author) return <Loading />;

  return (
    <div className="flex gap-x-8">
      <div className="w-[70%] mx-auto p-6 my-4">
        <div className="flex items-center gap-x-2 w-full overflow-auto mb-4">
          <Link to={"/"} className="text-sm text-buttonColor">
            Tech Blog
          </Link>
          <span className="block w-1 h-1 rounded-full bg-buttonColor"></span>
          <Link to={`/${blog.category}`} className="text-sm text-buttonColor">
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
            src={getImageUrl(blog?.author?.avatar)}
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

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-buttonColor flex items-center gap-x-4 text-white px-4 py-2 rounded-lg"
          >
            <FaShareAlt />
            <span>Share this blog</span>
          </button>

          <div className="w-full my-8 py-16 px-10 flex items-center gap-x-10 rounded-lg bg-[#fee0cf]">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={`http://127.0.0.1:5000/api/v1${author.avatar}`}
                alt=""
                className="w-full h-full rounded-full hover:scale-105 transition-all"
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
        blogLink={`${window.location.origin}/blog/${id}`}
        shareOnSocialMedia={shareOnSocialMedia}
      />
    </div>
  );
}

export default DetailBlogPage;
