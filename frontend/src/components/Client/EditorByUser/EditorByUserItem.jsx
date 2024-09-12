import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "../../../utils/formatDate";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { api } from "../../../utils/api";

function EditorByUserItem() {
  const [blogs, setBlogs] = useState([]);
  const [firstBlog, setFirstBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRes = await axios.get(`${api}api/v1/blogs/all`);
        const blogsData = blogsRes.data.data;

        // Fetch authors for each blog
        const blogsWithAuthors = await Promise.all(
          blogsData.map(async (blog) => {
            const authorRes = await axios.get(
              `${api}api/v1/users/user/${blog.author}`
            );
            return { ...blog, author: authorRes.data.data };
          })
        );

        setBlogs(blogsWithAuthors);

        if (blogsWithAuthors.length > 0) {
          // Select a random blog
          const randomIndex = Math.floor(
            Math.random() * blogsWithAuthors.length
          );
          const selectedFirstBlog = blogsWithAuthors[randomIndex];
          setFirstBlog(selectedFirstBlog);

          // Filter out the selected blog from the other blogs
          const filteredBlogs = blogsWithAuthors.filter(
            (blog, index) => index !== randomIndex
          );
          setOtherBlogs(filteredBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs or authors:", error);
      }
    };

    fetchBlogs();
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
    <div className="mt-16">
      <h1 className="font-bold text-3xl text-textBold my-4">Editor's Pick</h1>
      <div className="flex gap-x-8">
        {firstBlog && (
          <Link to={firstBlog.slug ? `/blog/${firstBlog.slug}` : "/error"}>
            <div className="w-full h-full p-8 border flex gap-x-8 border-gray-100 rounded-lg">
              <div className="w-1/2">
                <div className="w-full h-[300px] overflow-hidden rounded-lg">
                  <img
                    src={firstBlog.image || "https://via.placeholder.com/300"}
                    alt={firstBlog.title || "Title"}
                    className="w-full h-full hover:scale-105 rounded-lg transition-all"
                  />
                </div>
                <div className="flex items-center gap-x-2 my-4 mx-2">
                  <img
                    src={getImageUrl(firstBlog.author?.avatar)}
                    alt={firstBlog.author?.fullname || "Author"}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-textBase text-sm">
                    {firstBlog.author?.fullname || "Unknown Author"}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
                  <span className="text-textBase text-sm">
                    {formatDate(firstBlog?.createdAt) || "Unknown Date"}
                  </span>
                </div>
                <h1 className="mx-2 font-semibold text-textBold text-xl my-2">
                  {firstBlog.title || "Title"}
                </h1>
                <p className="my-2 text-textBase text-sm font-base mx-2">
                  {parse(firstBlog?.content || "Content not available.")}
                </p>
              </div>
              <div className="w-1/2 flex-col h-full justify-between space-y-4">
                {otherBlogs.map((blog) => (
                  <Link
                    to={firstBlog.slug ? `/blog/${firstBlog.slug}` : "/error"}
                    className="block"
                  >
                    <div className="flex gap-x-4" key={blog._id}>
                      <div className="w-[30%] h-full rounded-lg overflow-hidden">
                        <img
                          src={blog.image || "https://via.placeholder.com/150"}
                          alt={blog.title || "Title"}
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                      <div className="w-[70%] p-2">
                        <h1 className="font-semibold text-textBold text-md">
                          {blog.title || "Title"}
                        </h1>
                        <span className="text-textBase">
                          {formatDate(blog.createdAt) || "Unknown Date"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default EditorByUserItem;
