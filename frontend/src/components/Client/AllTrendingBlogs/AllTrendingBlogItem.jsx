import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../utils/api";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/formatDate";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AllTrendingBlogItem() {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
        setLoading(false);
      }
    };

    fetchTrendingBlogs();
  }, []);

  const topBlogs = trendingBlogs.slice(0, 2);
  const otherBlogs = trendingBlogs.slice(2, 6);

  return (
    <div>
      <div className="p-10 rounded-lg border border-gray-100">
        <div className="top grid grid-cols-2 gap-x-5">
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  className="w-full h-[300px] rounded-lg overflow-hidden relative"
                  key={index}
                >
                  <Skeleton height="100%" />
                  <div className="absolute top-6 left-6 py-2 px-4 rounded-full bg-buttonColor text-white text-sm">
                    <Skeleton width={100} />
                  </div>
                  <div className="my-4 mx-2">
                    <div className="flex items-center gap-x-2">
                      <Skeleton circle height={32} width={32} />
                      <Skeleton width={100} />
                      <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
                      <Skeleton width={80} />
                    </div>
                    <Skeleton width={150} height={20} className="my-2" />
                    <Skeleton count={2} />
                  </div>
                </div>
              ))
            : topBlogs.map((blog) => (
                <Link
                  to={blog?.slug ? `/blog/${blog?.slug}` : "/error"}
                  key={blog._id}
                >
                  <div className="w-full h-[300px] rounded-lg overflow-hidden relative">
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      className="w-full h-full object-cover rounded-lg transition-all hover:scale-105 "
                    />
                    <Link
                      to={`/category/${blog?.category}`}
                      className="absolute top-6 left-6 py-2 px-4 rounded-full bg-buttonColor text-white text-sm"
                    >
                      {blog?.category}
                    </Link>
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
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex gap-x-4" key={index}>
                    <div className="w-[30%] h-full rounded-lg overflow-hidden">
                      <Skeleton height="100%" />
                    </div>
                    <div className="w-[70%] p-2">
                      <Skeleton width={150} height={20} />
                      <Skeleton width={100} />
                    </div>
                  </div>
                ))
              : otherBlogs.map((blog) => (
                  <Link
                    to={blog?.slug ? `/blog/${blog?.slug}` : "/error"}
                    key={blog._id}
                  >
                    <div className="flex gap-x-4">
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
