import React, { useEffect } from "react";
import SideBar from "../components/Client/SideBar/SideBar";
import LatestBlogComponent from "../components/Client/Lastest Blog/LatestBlogComponent";
import AllLatestComponent from "../components/Client/All Latest Blog/AllLatestComponent";
import EditorByUserComponent from "../components/Client/EditorByUser/EditorByUserComponent";
import AllTrendingBlogsComponent from "../components/Client/AllTrendingBlogs/AllTrendingBlogsComponent";

function HomePage() {
  useEffect(() => {
    document.title = "Home | Tech Blog";
  }, []);

  return (
    <>
      <div className="md:flex gap-x-8 ">
        <div className="my-8 md:w-[70%] w-full -z-100">
          <LatestBlogComponent />
          {/* editor's pick */}
          <EditorByUserComponent />

          <div className="my-8">
            <div className="w-full h-[150px] rounded-lg">
              <img
                src="https://cdn.dribbble.com/userupload/12310930/file/original-415c017b597ca268aa7e2dadc3390252.png?resize=1504x1128"
                alt=""
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="mt-24">
            <h1 className="font-bold text-3xl text-textBold my-4">Trending</h1>
            <AllTrendingBlogsComponent />
          </div>

          <div className="mt-24">
            <h1 className="font-bold text-3xl text-textBold my-4">
              Latest Posts
            </h1>

            <div className="md:p-10 p-2 rounded-lg border border-gray-100 my-8">
              <AllLatestComponent />
            </div>
          </div>
        </div>
        <div className="w-[30%] md:block hidden mt-16">
          <SideBar />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-x-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item}>
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img
                src="https://cdn.dribbble.com/userupload/12532315/file/original-17d2e661a6708bc1b0cf70b8e8ed0495.jpg?resize=1504x1128"
                alt=""
                className="w-full h-full rounded-lg transition-all hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
