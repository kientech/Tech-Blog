import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../utils/api";
import AllLatestBlogItem from "./AllLatestBlogItem";
import parse from "html-react-parser";
import { formatDate } from "../../../utils/formatDate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AllLatestComponent() {
  const [latests, setLatests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await axios.get(`${api}api/v1/blogs/latest?limit=5`);
        const blogs = res.data.data;

        // Fetch author data for each blog
        const blogsWithAuthors = await Promise.all(
          blogs.map(async (blog) => {
            const authorRes = await axios.get(
              `${api}api/v1/users/user/${blog.author._id}`
            );
            return { ...blog, author: authorRes.data.data };
          })
        );

        setLatests(blogsWithAuthors);
        setLoading(false); // Data has been fetched
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
        setLoading(false); // Data fetching failed
      }
    };

    fetchLatestBlogs();
  }, []);

  const getImageUrl = (avatar) => {
    if (avatar.startsWith("http")) {
      return avatar;
    } else if (avatar.startsWith("/upload")) {
      return `${api}api/v1${avatar}`;
    }
    return "";
  };

  return (
    <div>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-x-4 p-4 border rounded-lg border-gray-200"
            >
              <div className="w-[30%] h-full rounded-lg overflow-hidden">
                <Skeleton height={150} />
              </div>
              <div className="w-[70%] p-2">
                <Skeleton width={200} height={20} />
                <Skeleton width={150} height={15} count={3} />
                <Skeleton width={100} height={15} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        latests.map((blog) => (
          <AllLatestBlogItem
            key={blog._id}
            target={blog.slug ? `/blog/${blog.slug}` : "/error"}
            image={blog.image}
            author={blog.author.fullname}
            title={blog.title}
            content={parse(blog.content.slice(0, 145) + "......")}
            avatar={getImageUrl(blog.author.avatar)}
            createdAt={formatDate(blog.createdAt)}
          />
        ))
      )}
    </div>
  );
}

export default AllLatestComponent;
