import React from "react";
import { Link, useParams } from "react-router-dom";
import CategoryBlogPage from "../components/Client/Category Page/CategoryBlogPage";
import SideBar from "../components/Client/SideBar/SideBar";

function CommonCategoryPage() {
  const { category } = useParams();

  // Handle empty category case
  if (!category) {
    return <div className="text-center my-8">No category selected</div>;
  }

  return (
    <>
      <div className="w-full h-[150px] flex flex-col items-center justify-center my-8 bg-blue-50 rounded-lg">
        <h1 className="font-semibold text-2xl text-textBold capitalize">
          {category}
        </h1>
        <div className="flex items-center justify-center gap-x-4 mt-2">
          <Link to="/" className="text-md text-buttonColor">
            Tech Blog
          </Link>
          <span className="w-1 h-1 rounded-full bg-buttonColor block"></span>
          <span className="text-textBase capitalize">{category}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-8">
        <div className="md:w-[70%] w-full p-10 border rounded-lg">
          <CategoryBlogPage category={category} />
        </div>
        <div className="md:w-[30%] w-full mt-8 md:mt-0">
          {/* Placeholder for additional content */}
          <SideBar />
        </div>
      </div>
    </>
  );
}

export default CommonCategoryPage;
