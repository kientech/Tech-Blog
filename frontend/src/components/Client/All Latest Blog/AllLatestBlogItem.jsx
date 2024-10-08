import React from "react";
import { Link } from "react-router-dom";

function AllLatestBlogItem({
  target,
  image,
  avatar,
  author,
  createdAt,
  title,
  content,
}) {
  return (
    <>
      <Link to={target}>
        <div className="flex md:gap-x-8 gap-x-4 md:mb-8 mb-4">
          <div className="w-1/4 h-full rounded-lg overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-full h-full rounded-lg hover:scale-105 transition-all"
            />
          </div>
          <div className="w-3/4">
            <div className="md:flex md:items-center hidden gap-x-2 my-4 mx-2">
              <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
              <span className="text-textBase text-sm">{author}</span>
              <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
              <span className="text-textBase text-sm">{createdAt}</span>
            </div>

            <div>
              <h1 className="font-bold text-md md:text-2xl text-textBold">{title}</h1>
              <p className="text-sm md:block hidden text-textBase mt-2">{content}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-[80%] ml-auto h-[1px] bg-gray-100 rounded-lg mb-8"></div>
    </>
  );
}

export default AllLatestBlogItem;
