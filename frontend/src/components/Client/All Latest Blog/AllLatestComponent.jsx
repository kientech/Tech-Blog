import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../utils/api";
import AllLatestBlogItem from "./AllLatestBlogItem";
import parse from "html-react-parser";
import { formatDate } from "../../../utils/formatDate";

function AllLatestComponent() {
  const [latests, setLatests] = useState([]);

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
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
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
      {latests.map((blog) => (
        <AllLatestBlogItem
          key={blog._id}
          image={blog.image}
          author={blog.author.fullname}
          title={blog.title}
          content={parse(blog.content.slice(0, 145) + "......")}
          avatar={getImageUrl(blog.author.avatar)}
          createdAt={formatDate(blog.createdAt)}
        />
      ))}
    </div>
  );
}

export default AllLatestComponent;
