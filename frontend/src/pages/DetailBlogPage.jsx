import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { formatDate } from "../utils/formatDate";
import { useParams } from "react-router-dom";
import Loading from "../components/Client/Loading/Loading";
import parse from "html-react-parser";
import SideBar from "../components/Client/SideBar/SideBar";
import { Link } from "react-router-dom";

function DetailBlogPage() {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  console.log("🚀 ~ DetailBlogPage ~ author:", author);
  const [error, setError] = useState(null);
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
          <span className="">{blog.title.slice(0, 50)} ...</span>
        </div>
        <h1 className="text-3xl font-bold my-4 text-textBold leading-relaxed">
          {blog.title}
        </h1>
        <div className="text-gray-600 mb-4 flex items-center gap-x-4">
          <img
            src={`${api}api/v1${author.avatar}`}
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
        </div>
      </div>
      <div className="w-[30%]">
        <SideBar />
      </div>
    </div>
  );
}

export default DetailBlogPage;
