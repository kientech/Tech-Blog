import React, { useState } from "react";
import {
  FaBars,
  FaFacebookF,
  FaTimes,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigations = [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "Web", to: "/web" },
    { id: 3, name: "App", to: "/app" },
    { id: 4, name: "Machine Learning", to: "/machine-learning" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-sm w-full">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <h1 className="text-3xl font-bold mr-1 pt-2 text-[#ff7079]">
          Tech Blog
        </h1>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {navigations.map((item) => (
            <li
              key={item.id}
              className="md:ml-8 md:my-0 my-7 text-md font-base text-textBase"
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `hover:text-textBold duration-500 ${
                    isActive ? "text-buttonColor" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`flex items-center gap-x-4 `}>
          <div className="hidden md:flex md:items-center md:gap-x-4">
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
          <div>
            <button className="px-4 py-2 rounded-lg bg-buttonColor text-sm text-textWhite">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
