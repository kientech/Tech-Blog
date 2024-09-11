import React from "react";
import { Link } from "react-router-dom";

function LatestBlogItem({ target, image, category, title, author, createdAt }) {
  return (
    <Link to={target}>
      <div className="w-full h-[600px] rounded-lg overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-full rounded-lg object-cover hover:scale-105 transition-all relative"
        />
        <div className="absolute bottom-24 p-10 w-[700px] leading-relaxed">
          <span className="px-4 py-2 rounded-full bg-buttonColor text-md text-white inline-block mb-8">
            {category}
          </span>
          <h1 className="font-bold text-4xl text-white">{title}</h1>
          <div className="flex items-center mt-4">
            <span className="text-white font-base text-md">{author}</span>
            <span className="w-1 h-1 rounded-full bg-white mx-4"></span>
            <span className="text-white font-base text-md">{createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LatestBlogItem;
