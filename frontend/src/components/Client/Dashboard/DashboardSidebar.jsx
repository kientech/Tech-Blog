import React from "react";
import { FaAddressBook, FaHeart, FaPenFancy } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function DashboardSidebar() {
  const linkClasses = "flex items-center gap-x-4 my-2 py-4 px-4 rounded-lg transition-all";

  return (
    <div className="w-64 h-screen bg-white shadow-md text-textBold flex flex-col">
      <div className="w-full mx-auto">
        <div className="w-full py-4">
          <h1 className="text-center font-bold text-textBold text-2xl">
            Dashboard
          </h1>
        </div>
        <div className="mt-4 p-8 gap-y-8">
          <NavLink
            to="/dashboard/create-blog"
            className={({ isActive }) =>
              isActive ? `${linkClasses} bg-pink-50 text-buttonColor` : `${linkClasses} hover:bg-pink-50 hover:text-buttonColor`
            }
          >
            <FaPenFancy size={20} />
            Create Blog
          </NavLink>
          <NavLink
            to="/dashboard/manage-blogs"
            className={({ isActive }) =>
              isActive ? `${linkClasses} bg-pink-50 text-buttonColor` : `${linkClasses} hover:bg-pink-50 hover:text-buttonColor`
            }
          >
            <FaAddressBook size={20} />
            Manage Blogs
          </NavLink>
          <NavLink
            to="/dashboard/liked-blogs"
            className={({ isActive }) =>
              isActive ? `${linkClasses} bg-pink-50 text-buttonColor` : `${linkClasses} hover:bg-pink-50 hover:text-buttonColor`
            }
          >
            <FaHeart size={20} />
            Liked Blogs
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
