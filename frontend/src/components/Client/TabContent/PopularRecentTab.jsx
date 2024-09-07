import React from "react";
import Tabs from "./Tab";

const PopularRecentTab = () => {
  const tabs = [
    {
      title: "Overview",
      content: [
        {
          id: 1,
          imgBlog:
            "https://cdn.dribbble.com/userupload/12310014/file/original-78f354c4c3d7fa4bd4b2b2ff53ac60b4.png?resize=1504x1128",
          titleBlog: "3 Easy Ways To Make Your iPhone Faster",
          datePosted: "August 19, 2022",
        },
        {
          id: 2,
          imgBlog:
            "https://cdn.dribbble.com/userupload/12310014/file/original-78f354c4c3d7fa4bd4b2b2ff53ac60b4.png?resize=1504x1128",
          titleBlog: "3 Easy Ways To Make Your iPhone Faster",
          datePosted: "August 19, 2022",
        },
        {
          id: 3,
          imgBlog:
            "https://cdn.dribbble.com/userupload/12310014/file/original-78f354c4c3d7fa4bd4b2b2ff53ac60b4.png?resize=1504x1128",
          titleBlog: "3 Easy Ways To Make Your iPhone Faster",
          datePosted: "August 19, 2022",
        },
      ],    
    },
    {
      title: "Curriculum",
      content: [
        {
          id: 1,
          imgBlog:
            "https://cdn.dribbble.com/userupload/12310014/file/original-78f354c4c3d7fa4bd4b2b2ff53ac60b4.png?resize=1504x1128",
          titleBlog: "1000 Easy Ways To Make Your iPhone Faster",
          datePosted: "August 19, 2022",
        },
        {
          id: 2,
          imgBlog:
            "https://cdn.dribbble.com/userupload/12310014/file/original-78f354c4c3d7fa4bd4b2b2ff53ac60b4.png?resize=1504x1128",
          titleBlog: "3 Easy Ways To Make Your iPhone Faster",
          datePosted: "August 19, 2022",
        },
        {
          id: 3,
          imgBlog:
            "https://cdn.dribbble.com/userupload/12310014/file/original-78f354c4c3d7fa4bd4b2b2ff53ac60b4.png?resize=1504x1128",
          titleBlog: "3 Easy Ways To Make Your iPhone Faster",
          datePosted: "August 19, 2022",
        },
        {
            id: 4,
            imgBlog:
              "https://cdn.dribbble.com/userupload/12310014/file/original-78f354c4c3d7fa4bd4b2b2ff53ac60b4.png?resize=1504x1128",
            titleBlog: "3 Easy Ways To Make Your iPhone Faster",
            datePosted: "August 19, 2022",
          },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default PopularRecentTab;
