import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../utils/api";
import AllLatestBlogItem from "../All Latest Blog/AllLatestBlogItem";
import parse from "html-react-parser";
import { formatDate } from "../../../utils/formatDate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";

function CategoryBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      setLoading(true);

      try {
        setBlogs([]);

        const res = await axios.get(`${api}api/v1/blogs/category/${category}`);
        const blogs = res.data.data;

        // Fetch author data for each blog
        const blogsWithAuthors = await Promise.all(
          blogs.map(async (blog) => {
            const authorRes = await axios.get(
              `${api}api/v1/users/user/${blog.author}`
            );
            return { ...blog, author: authorRes.data.data };
          })
        );

        setBlogs(blogsWithAuthors);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchLatestBlogs();
  }, [category]); // Dependency on category to refetch when it changes

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
        blogs.map((blog) => (
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

export default CategoryBlogPage;
