import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex justify-center items-center gap-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`py-2 px-4 w-1/2 border rounded-full text-sm font-medium focus:outline-none transition-colors duration-300 ${
              activeTab === index
                ? "text-white bg-buttonColor border-buttonColor"
                : "text-gray-400"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative mt-12">
        <div className="transition-all duration-500 ease-in-out">
          {tabs[activeTab].content.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex flex-col mt-8">
                <div className="flex gap-x-4 w-full group">
                  <div className="w-16 h-16 rounded-full overflow-hidden ">
                    <img
                      src={item.imgBlog}
                      alt={item.titleBlog}
                      className="rounded-full object-cover w-full h-full transition-all group-hover:scale-105 block cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold cursor-pointer group-hover:text-buttonColor">
                      {item.titleBlog}
                    </h3>
                    <p className="text-gray-500 mt-2">{item.datePosted}</p>
                  </div>
                </div>
                {/* <div className="w-[70%] h-[1px] bg-gray-300 ml-auto"></div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
