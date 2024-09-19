import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaFacebookF,
  FaTimes,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import Loading from "./Loading/Loading";

const Navbar = () => {
  const navigations = [
    { id: 1, name: "Home", to: "/" },
    {
      id: 2,
      name: "Mobile App Development",
      to: "/category/Mobile App Development",
    },
    { id: 3, name: "Blockchain", to: "/category/Blockchain" },
    { id: 4, name: "Machine Learning", to: "/machine-learning" },
  ];

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getImageUrl = (avatar) => {
    if (avatar.startsWith("http")) {
      return avatar;
    } else if (avatar.startsWith("/upload")) {
      return `${api}api/v1${avatar}`;
    }
  };

  const { user, loadUserFromLocalStorage, logout } = useAuthStore();

  useEffect(() => {
    loadUserFromLocalStorage();
    setLoading(false);
  }, [loadUserFromLocalStorage]);

  const handleSignOut = () => {
    logout();
    toast.success("Logged Out Successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="shadow-sm w-full">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <Link to={'/'} className="text-3xl font-bold mr-1 pt-2 text-[#ff7079]">
          Tech Blog
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-100 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
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

        <div className="flex items-center gap-x-4">
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

          {loading ? (
            <Loading />
          ) : user ? (
            <div className="relative">
              <div className="flex items-center gap-x-4">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden"
                  onClick={toggleDropdown}
                >
                  <img
                    src={getImageUrl(user.avatar)}
                    alt={user.fullname}
                    className="w-full h-full object-cover hover:scale-105 transition-all"
                  />
                </div>
                <h1
                  onClick={toggleDropdown}
                  className="text-md font-medium text-gray-700 cursor-pointer"
                >
                  {`Hello, ${user.fullname}`}
                </h1>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to={"/dashboard"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-buttonColor transition-all"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-buttonColor text-sm text-textWhite"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
