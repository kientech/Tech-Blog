import React from "react";
import SideBar from "../components/Client/SideBar/SideBar";
import LatestBlogComponent from "../components/Client/Lastest Blog/LatestBlogComponent";

function HomePage() {
  return (
    <>
      <div className="md:flex gap-x-8">
        <div className="my-8 md:w-[70%] w-full">
          <LatestBlogComponent />

          {/* Rest of your component... */}
        </div>

        <div className="w-[30%]">
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
