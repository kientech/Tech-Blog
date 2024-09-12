import React from "react";

function AllLatestBlogItem({
  image,
  avatar,
  author,
  createdAt,
  title,
  content,
}) {
  return (
    <>
      <div className="flex gap-x-8 mb-8">
        <div className="w-1/4 h-full rounded-lg overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full rounded-lg hover:scale-105 transition-all"
          />
        </div>
        <div className="w-3/4">
          <div className="flex items-center gap-x-2 my-4 mx-2">
            <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
            <span className="text-textBase text-sm">{author}</span>
            <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
            <span className="text-textBase text-sm">{createdAt}</span>
          </div>

          <div>
            <h1 className="font-bold text-2xl text-textBold">{title}</h1>
            <p className="text-sm text-textBase mt-2">{content}</p>
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-auto h-[1px] bg-gray-100 rounded-lg mb-8"></div>
    </>
  );
}

export default AllLatestBlogItem;
