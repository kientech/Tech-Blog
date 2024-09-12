import React from "react";
import SideBar from "../components/Client/SideBar/SideBar";
import LatestBlogComponent from "../components/Client/Lastest Blog/LatestBlogComponent";
import AllLatestComponent from "../components/Client/All Latest Blog/AllLatestComponent";
import EditorByUserComponent from "../components/Client/EditorByUser/EditorByUserComponent";

function HomePage() {
  const items = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="md:flex gap-x-8">
        <div className="my-8 md:w-[70%] w-full">
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
            <div>
              <div className="p-10 rounded-lg border border-gray-100">
                <div className="top grid grid-cols-2 gap-x-5">
                  <div>
                    <div className="w-full h-[300px] rounded-lg overflow-hidden relative">
                      <img
                        src="https://cdn.dribbble.com/userupload/12310930/file/original-415c017b597ca268aa7e2dadc3390252.png?resize=1504x1128"
                        alt=""
                        className="w-full h-full object-cover rounded-lg transition-all hover:scale-105 "
                      />
                      <span className="absolute top-6 left-6 py-2 px-4 rounded-full bg-buttonColor text-white text-sm">
                        Web Development
                      </span>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-x-2 my-4 mx-2">
                        <img
                          src="https://cdn.dribbble.com/userupload/12532315/file/original-17d2e661a6708bc1b0cf70b8e8ed0495.jpg?resize=1504x1128"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-textBase text-sm">
                          Kien Duong
                        </span>
                        <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
                        <span className="text-textBase text-sm">
                          August 10, 2023
                        </span>
                      </div>
                      <h1 className="mx-2 font-semibold text-textBold text-xl my-2">
                        3 Easy Ways To Make Your iPhone Faster
                      </h1>
                      <p className="my-2 text-textBase text-sm font-base mx-2">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Unde repellendus suscipit nam commodi minima minus
                        reprehenderit perferendis dolor ullam!
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="w-full h-[300px] rounded-lg overflow-hidden relative">
                      <img
                        src="https://cdn.dribbble.com/userupload/12310930/file/original-415c017b597ca268aa7e2dadc3390252.png?resize=1504x1128"
                        alt=""
                        className="w-full h-full object-cover rounded-lg transition-all hover:scale-105 "
                      />
                      <span className="absolute top-6 left-6 py-2 px-4 rounded-full bg-buttonColor text-white text-sm">
                        Web Development
                      </span>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-x-2 my-4 mx-2">
                        <img
                          src="https://cdn.dribbble.com/userupload/12532315/file/original-17d2e661a6708bc1b0cf70b8e8ed0495.jpg?resize=1504x1128"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-textBase text-sm">
                          Kien Duong
                        </span>
                        <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
                        <span className="text-textBase text-sm">
                          August 10, 2023
                        </span>
                      </div>
                      <h1 className="mx-2 font-semibold text-textBold text-xl my-2">
                        3 Easy Ways To Make Your iPhone Faster
                      </h1>
                      <p className="my-2 text-textBase text-sm font-base mx-2">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Unde repellendus suscipit nam commodi minima minus
                        reprehenderit perferendis dolor ullam!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bottom mt-8">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div className="flex gap-x-4" key={item}>
                        <div className="w-[30%] h-full rounded-lg overflow-hidden">
                          <img
                            src="https://cdn.dribbble.com/userupload/12532315/file/original-17d2e661a6708bc1b0cf70b8e8ed0495.jpg?resize=1504x1128"
                            alt=""
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div className="w-[70%] p-2">
                          <h1 className="font-semibold text-textBold text-md">
                            3 Easy Ways To Make Your iPhone Faster
                          </h1>
                          <span className="text-textBase">August 10, 2022</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h1 className="font-bold text-3xl text-textBold my-4">
              Latest Posts
            </h1>

            <div className="p-10 rounded-lg border border-gray-100 my-8">
              <AllLatestComponent />
            </div>
          </div>
        </div>
        <div className="w-[30%] mt-16">
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
