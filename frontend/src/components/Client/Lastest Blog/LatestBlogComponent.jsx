import React, { useState, useEffect } from "react";
import LatestBlogItem from "./LatestBlogItem";
import axios from "axios";
import { api } from "../../../utils/api";
import { formatDate } from "../../../utils/formatDate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LatestBlogComponent() {
  const [latest, setLatest] = useState(null); // Change initial state to null
  console.log("🚀 ~ LatestBlogComponent ~ latest:", latest);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  const getLatestBlog = async () => {
    try {
      const response = await axios.get(`${api}api/v1/blogs/latest?limit=1`);
      setLatest(response.data.data[0]);

      if (response.data.length > 0) {
        const authorId = response.data.data[0].author._id;
        fetchAuthorById(authorId);
      }
    } catch (error) {
      console.error("Error fetching latest blog:", error);
      setError("Failed to fetch latest blog.");
    }
  };

  const fetchAuthorById = async (authorId) => {
    try {
      const response = await axios.get(`${api}api/v1/users/user/${authorId}`);
      setAuthor(response.data.data);
    } catch (error) {
      console.error("Error fetching author:", error);
      setError("Failed to fetch author data.");
    }
  };

  useEffect(() => {
    getLatestBlog();
  }, []);

  // Show skeleton loaders when data is null
  if (!latest || !author) {
    return (
      <div className="w-full md:h-[600px] h-[400px] rounded-lg overflow-hidden">
        <Skeleton height={600} />
        <div className="absolute bottom-24 p-10 w-[700px] leading-relaxed">
          <Skeleton circle={true} height={30} width={100} />
          <Skeleton height={40} width={400} />
          <div className="flex items-center mt-4">
            <Skeleton height={20} width={80} />
            <span className="w-1 h-1 rounded-full bg-white mx-4"></span>
            <Skeleton height={20} width={80} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <LatestBlogItem
      target={latest?.slug ? `/blog/${latest.slug}` : "/error"}
      image={latest.image}
      category={latest.category}
      title={latest.title}
      author={author?.fullname}
      createdAt={formatDate(latest?.createdAt)}
    />
  );
}

export default LatestBlogComponent;
