import React from "react";
import { FaAddressBook } from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardSidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md text-textBold flex flex-col">
      <div className="w-full mx-auto">
        <div>
            <h1>Dashboad</h1>
        </div>
        <div className="mt-20 p-8">
            <div className="flex items-center gap-x-4 py-2 px-4 rounded-lg hover:text-buttonColor">
                <FaAddressBook />
                <Link to={'/dashboard/create-blog'}>Create Blog</Link>
            </div>
            <div className="flex items-center gap-x-4 py-2 px-4 rounded-lg hover:text-buttonColor">
                <FaAddressBook />
                <Link to={'/dashboard/manage-blogs'}>Manage Blogs</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
