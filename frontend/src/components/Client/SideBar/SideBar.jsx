import React from "react";
import PopularRecentTab from "../TabContent/PopularRecentTab";
import { Link } from "react-router-dom";
import {
  FaAngleRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function SideBar() {
  return (
    <div className="mt-8">
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
          <Link className="hover:text-buttonColor transition-all">
            <FaFacebookF />
          </Link>
          <Link className="hover:text-buttonColor transition-all">
            <FaInstagram />
          </Link>
          <Link className="hover:text-buttonColor transition-all">
            <FaTwitter />
          </Link>
          <Link className="hover:text-buttonColor transition-all">
            <FaLinkedinIn />
          </Link>
        </div>
      </div>

      <div className="p-8 border border-gray-100 rounded-lg mt-8">
        <h1 className="text-xl font-bold text-textBold hover:text-buttonColor transition-none text-center mb-8">
          Popular Posts
        </h1>

        <div className="flex flex-col space-y-6">
          {[1, 2, 3, 4].map((item) => (
            <div className="flex gap-x-4 w-full group" key={item}>
              <div className="w-16 h-16 rounded-full overflow-hidden ">
                <img
                  src="https://cdn.dribbble.com/userupload/13496904/file/original-8ced0cf5cb374000f6d98d64f50d507b.png?resize=1504x1128"
                  alt="img"
                  className="rounded-full object-cover w-full h-full transition-all group-hover:scale-105 block cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-md font-semibold cursor-pointer group-hover:text-buttonColor ">
                  3 Easy Ways To Make Your iPhone Faster
                </h3>
                <p className="text-gray-500">August 10, 2022</p>
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
            <div className="group">
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
            type="text"
            placeholder="example@gmail.com"
            className="p-2 px-6 block w-full rounded-full border border-gray-100 focus:border-buttonColor outline-none"
          />
          <button className="block my-4 px-4 py-2 rounded-full bg-buttonColor text-md text-textWhite w-full">
            Subcribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default SideBar;
