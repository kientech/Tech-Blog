import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../utils/api";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/formatDate";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function AllTrendingBlogItem() {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  console.log("🚀 ~ AllTrendingBlogItem ~ trendingBlogs:", trendingBlogs);

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const res = await axios.get(`${api}api/v1/blogs/trending?count=6`);
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

        setTrendingBlogs(blogsWithAuthors);
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
      }
    };

    fetchTrendingBlogs();
  }, []);

  const topBlogs = trendingBlogs.slice(0, 2);
  console.log("🚀 ~ AllTrendingBlogItem ~ topBlogs:", topBlogs);
  const otherBlogs = trendingBlogs.slice(2, 6);
  return (
    <div>
      <div className="p-10 rounded-lg border border-gray-100">
        <div className="top grid grid-cols-2 gap-x-5">
          {topBlogs &&
            topBlogs.map((blog) => (
              <Link to={blog?.slug ? `/blog/${blog?.slug}` : "/error"}>
                <div className="w-full h-[300px] rounded-lg overflow-hidden relative">
                  <img
                    src={blog?.image}
                    alt={blog?.title}
                    className="w-full h-full object-cover rounded-lg transition-all hover:scale-105 "
                  />
                  <span className="absolute top-6 left-6 py-2 px-4 rounded-full bg-buttonColor text-white text-sm">
                    {blog?.category}
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center gap-x-2 my-4 mx-2">
                    <img
                      src={getImageUrl(blog?.author?.avatar)}
                      alt={blog?.author?.fullname}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-textBase text-sm">
                      {blog?.author?.fullname}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
                    <span className="text-textBase text-sm">
                      {formatDate(blog?.createdAt)}
                    </span>
                  </div>
                  <h1 className="mx-2 font-semibold text-textBold text-xl my-2">
                    {blog?.title}
                  </h1>
                  <p className="my-2 text-textBase text-sm font-base mx-2">
                    {parse(blog?.content.slice(0, 150) + ".....")}
                  </p>
                </div>
              </Link>
            ))}
        </div>
        <div className="bottom mt-8">
          <div className="grid grid-cols-2 gap-4">
            {otherBlogs &&
              otherBlogs.map((blog) => (
                <Link to={blog?.slug ? `/blog/${blog?.slug}` : "/error"}>
                  <div className="flex gap-x-4" key={blog._id}>
                    <div className="w-[30%] h-full rounded-lg overflow-hidden">
                      <img
                        src={blog?.image}
                        alt={blog?.title}
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="w-[70%] p-2">
                      <h1 className="font-semibold text-textBold text-md">
                        {blog?.title}
                      </h1>
                      <span className="text-textBase">
                        {formatDate(blog?.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTrendingBlogItem;
