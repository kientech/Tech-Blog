import React, { useState, useEffect } from "react";
import PopularRecentTab from "../TabContent/PopularRecentTab";
import { Link, useLocation } from "react-router-dom";
import {
  FaAngleRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import axios from "axios";
import { api } from "../../../utils/api";
import Loading from "../Loading/Loading";
import { getImageUrl } from "../../../utils/getImageUrl";
import { formatDate } from "../../../utils/formatDate";

// Skeleton Components
const SkeletonLoader = ({ className }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-6 bg-gray-300 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded"></div>
  </div>
);

const SidebarSkeleton = () => (
  <div className="mt-8">
    <div className="shadow-sm w-full h-[600px] p-10 border border-gray-100 rounded-lg">
      <SkeletonLoader className="w-full h-full" />
    </div>

    <div className="w-full p-4 mt-16 border border-gray-100 rounded-lg">
      <SkeletonLoader className="w-full h-24" />
      <SkeletonLoader className="w-full h-10 mt-4" />
      <SkeletonLoader className="w-full h-10 mt-4" />
    </div>

    <div className="p-8 border border-gray-100 rounded-lg mt-8">
      <SkeletonLoader className="w-full h-8" />
      <div className="space-y-4 mt-4">
        {[1, 2, 3, 4].map((_, index) => (
          <SkeletonLoader key={index} className="w-full h-16" />
        ))}
      </div>
    </div>

    <div className="p-10 border border-gray-100 rounded-lg mt-8">
      <SkeletonLoader className="w-full h-8" />
      <div className="space-y-4 mt-4">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <SkeletonLoader key={index} className="w-full h-8" />
        ))}
      </div>
    </div>

    <div className="p-10 border border-gray-100 rounded-lg mt-8">
      <SkeletonLoader className="w-full h-8" />
      <SkeletonLoader className="w-full h-12 mt-4" />
    </div>

    <div className="mt-8">
      <SkeletonLoader className="w-full h-[500px]" />
    </div>
  </div>
);

function SideBar() {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [latestBlogs, setLatests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const res = await axios.get(`${api}api/v1/blogs/trending?count=6`);
        const blogs = res.data.data;

        // Fetch author data for each blog
        const blogsWithAuthors = await Promise.all(
          blogs.map(async (blog) => {
            try {
              const authorRes = await axios.get(
                `${api}api/v1/users/user/${blog.author}`
              );
              return { ...blog, author: authorRes.data.data };
            } catch (authorError) {
              console.log(
                `Failed to fetch author for blog ${blog._id}:`,
                authorError
              );
              return { ...blog, author: null }; // Handle the case where author data is not available
            }
          })
        );

        setTrendingBlogs(blogsWithAuthors);
      } catch (error) {
        console.log("Error fetching trending blogs:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
      }
    };

    fetchTrendingBlogs();
  }, []);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await axios.get(`${api}api/v1/blogs/latest?limit=5`);
        const blogs = res.data.data;

        // Fetch author data for each blog
        const blogsWithAuthors = await Promise.all(
          blogs.map(async (blog) => {
            try {
              const authorRes = await axios.get(
                `${api}api/v1/users/user/${blog.author._id}`
              );
              return { ...blog, author: authorRes.data.data };
            } catch (authorError) {
              console.log(
                `Failed to fetch author for blog ${blog._id}:`,
                authorError
              );
              return { ...blog, author: null }; // Handle the case where author data is not available
            }
          })
        );

        setLatests(blogsWithAuthors);
      } catch (error) {
        console.log("Error fetching latest blogs:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
      }
    };

    fetchLatestBlogs();
  }, []);

  const location = useLocation();
  console.log("🚀 ~ SideBar ~ location:", location.pathname);

  return loading ? (
    <SidebarSkeleton />
  ) : (
    <div className={location.pathname === "/" ? "-mt-8": "mt-8"}>
      {location.pathname === "/" ? (
        <>
          <div className="shadow-sm w-full h-[600px] p-10 border border-gray-100 rounded-lg">
            <PopularRecentTab />
          </div>
          <div className="w-full p-4 mt-16 border border-gray-100 rounded-lg">
            <h1 className="font-bold text-textBold text-center text-3xl my-4">
              Tech Blog
            </h1>
            <p className="text-center px-4 text-sm text-textBase my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              consequatur hic! A, minima ea dolorum voluptate amet aliquam!
            </p>
            <div className="md:flex md:items-center md:gap-x-4 md:justify-center my-4">
              <Link
                to="#"
                aria-label="Facebook"
                className="hover:text-buttonColor transition-all"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="#"
                aria-label="Instagram"
                className="hover:text-buttonColor transition-all"
              >
                <FaInstagram />
              </Link>
              <Link
                to="#"
                aria-label="Twitter"
                className="hover:text-buttonColor transition-all"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                aria-label="LinkedIn"
                className="hover:text-buttonColor transition-all"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </>
      ) : null}

      <div className="p-8 border border-gray-100 rounded-lg mt-8">
        <h1 className="text-xl font-bold text-textBold hover:text-buttonColor transition-none text-center mb-8">
          Popular Posts
        </h1>

        <div className="flex flex-col space-y-6">
          {latestBlogs.map((blog) => (
            <div className="flex gap-x-4 w-full group" key={blog?._id}>
              <div className="w-16 h-16 rounded-full overflow-hidden ">
                <img
                  src={getImageUrl(blog?.image)}
                  alt={`Popular Post ${blog?.title}`}
                  className="rounded-full object-cover w-full h-full transition-all group-hover:scale-105 block cursor-pointer"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-md font-semibold cursor-pointer group-hover:text-buttonColor ">
                  {blog?.title}
                </h3>
                <p className="text-gray-500">{formatDate(blog?.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10 border border-gray-100 rounded-lg mt-8">
        <h1 className="text-xl font-bold text-textBold hover:text-buttonColor transition-none text-center mb-8">
          Explore Topics
        </h1>
        <div className="mt-12">
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="group" key={item}>
              <div className="w-[80%] h-[1px] bg-gray-50"></div>
              <div className="flex items-center w-full my-4 cursor-pointer">
                <FaAngleRight className="group-hover:text-buttonColor transition-all" />
                <span className="ml-2 font-[500] text-textBold hover:text-buttonColor transition-all">
                  Web Development
                </span>
                <span className="ml-16">(03)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10 border border-gray-100 rounded-lg mt-8">
        <h1 className="text-xl font-bold text-textBold hover:text-buttonColor transition-none text-center mb-8">
          Newsletter
        </h1>
        <span className="block font-semibold text-textBold text-md my-4 text-center">
          Join 70,000 subscribers!
        </span>

        <form>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="p-2 px-6 block w-full rounded-full border border-gray-100 focus:border-buttonColor outline-none text-buttonColor"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="block my-4 px-4 py-2 rounded-full bg-buttonColor text-md text-textWhite w-full"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="p-10 rounded-lg border border-gray-100 mt-8">
        <h1 className="text-xl font-bold text-textBold hover:text-buttonColor transition-none text-center mb-8">
          Tag Clouds
        </h1>

        <div className="flex gap-2 flex-wrap">
          <button className="py-2 px-4 rounded-lg border border-gray-100 text-textBase text-sm">
            #technology
          </button>
          <button className="py-2 px-4 rounded-lg border border-gray-100 text-textBase text-sm">
            #web
          </button>
          <button className="py-2 px-4 rounded-lg border border-gray-100 text-textBase text-sm">
            #app
          </button>
          <button className="py-2 px-4 rounded-lg border border-gray-100 text-textBase text-sm">
            #design
          </button>
          <button className="py-2 px-4 rounded-lg border border-gray-100 text-textBase text-sm">
            #development
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full h-[500px] rounded-lg overflow-hidden">
          <img
            src="https://cdn.dribbble.com/userupload/12323819/file/original-a9feadb89946ddd142f612244eb9d25e.png?resize=1504x1128"
            alt="Sidebar promotional image"
            className="w-full h-full rounded-lg hover:scale-105 transition-all object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
