import React from "react";
import SideBar from "../components/Client/SideBar/SideBar";

function HomePage() {
  return (
    <>
      <div className="md:flex gap-x-8">
        <div className="my-8 md:w-[70%] w-full  ">
          <div className="w-full h-[600px] rounded-lg overflow-hidden">
            <img
              src="https://cdn.dribbble.com/userupload/13964724/file/original-4a3421ac0282a412d8bcc411caa081cc.jpg?resize=1504x1128"
              alt=""
              className="w-full h-full rounded-lg object-cover hover:scale-105 transition-all relative"
            />
            <div className="absolute bottom-24 p-10 w-[700px] leading-relaxed">
              <span className="px-4 py-2 rounded-full bg-buttonColor text-md text-white inline-block mb-8">
                Web Development
              </span>
              <h1 className="font-bold text-4xl text-white">
                5 Easy Way You Can Turn Future Into Success
              </h1>
              <div className="flex items-center mt-4">
                <span className="text-white font-base text-md">
                  Kien Duong Trung
                </span>
                <span className="w-1 h-1 rounded-full bg-white mx-4"></span>
                <span className="text-white font-base text-md">
                  August 20, 2024
                </span>
              </div>
            </div>
          </div>

          {/* editor's pick */}
          <div className="mt-16">
            <h1 className="font-bold text-3xl text-textBold my-4">
              Editor's Pick
            </h1>
            <div className="flex gap-x-8">
              <div className="w-full h-full p-8 border flex gap-x-8 border-gray-100 rounded-lg">
                <div className="w-1/2 ">
                  <div className="w-full h-[300px] overflow-hidden rounded-lg">
                    <img
                      src="https://cdn.dribbble.com/userupload/12532315/file/original-17d2e661a6708bc1b0cf70b8e8ed0495.jpg?resize=1504x1128"
                      alt=""
                      className="w-full h-full hover:scale-105 rounded-lg transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-x-2 my-4 mx-2">
                    <img
                      src="https://cdn.dribbble.com/userupload/12532315/file/original-17d2e661a6708bc1b0cf70b8e8ed0495.jpg?resize=1504x1128"
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-textBase text-sm">Kien Duong</span>
                    <span className="w-1 h-1 rounded-full bg-buttonColor mx-2"></span>
                    <span className="text-textBase text-sm">
                      August 10, 2023
                    </span>
                  </div>
                  <h1 className="mx-2 font-semibold text-textBold text-xl my-2">
                    3 Easy Ways To Make Your iPhone Faster
                  </h1>
                  <p className="my-2 text-textBase text-sm font-base mx-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Unde repellendus suscipit nam commodi minima minus
                    reprehenderit perferendis dolor ullam!
                  </p>
                </div>
                <div className="w-1/2 flex-col h-full justify-between space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
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
            <h1 className="font-bold text-3xl text-textBold my-4 ">Trending</h1>
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
            <h1 className="font-bold text-3xl text-textBold my-4">Lastest</h1>

            <div className="p-10 rounded-lg border border-gray-100 my-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <>
                  <div className="flex gap-x-8 mb-8" key={item}>
                    <div className="w-1/4 h-full rounded-lg overflow-hidden">
                      <img
                        src="https://cdn.dribbble.com/userupload/12532537/file/original-9b40aa4942f5c0336b8132f60e348015.jpg?resize=1504x1128"
                        alt=""
                        className="w-full h-full rounded-lg hover:scale-105 transition-all"
                      />
                    </div>
                    <div className="w-3/4">
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

                      <div>
                        <h1 className="font-bold text-2xl text-textBold">
                          60 Things To Immediately Do About Building
                        </h1>
                        <p className="text-sm text-textBase mt-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Nemo voluptates sapiente repellendus repudiandae
                          voluptatem.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[60%] h-[1px] bg-gray-100 ml-auto mb-4"></div>
                </>
              ))}
            </div>
          </div>
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
