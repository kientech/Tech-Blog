import React from "react";
import { Link } from "react-router-dom";

function LatestBlogItem({ target, image, category, title, author, createdAt }) {
  return (
    <Link to={target}>
      <div className="w-full md:h-[600px] h-[400px] rounded-lg overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-full rounded-lg object-cover hover:scale-105 transition-all relative"
          // loading="lazy"
        />
        <div className="absolute top-80 md:bottom-24 p-10 md:w-[700px] w-[300] leading-relaxed">
          <Link to={`/category/${category}`} className="px-4 py-2 rounded-full bg-buttonColor text-sm md:text-md text-white inline-block mb-8">
            {category}
          </Link>
          <h1 className="font-bold text-lg md:text-4xl text-white">{title}</h1>
          <div className="flex items-center mt-4">
            <span className="text-white font-base text-md">{author}</span>
            <span className="w-1 h-1 rounded-full bg-white mx-1 md:mx-4"></span>
            <span className="text-white font-base text-md">{createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LatestBlogItem;
