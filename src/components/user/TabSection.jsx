import { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { Tab } from "@headlessui/react";
import HorizontalRule from "../common/HorizontalRule";
import { Link } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  export default function TabSection() {
    let [categories] = useState({
      Recent: [
        {
          id: 1,
          title: "The Future of Web Development",
          date: "5h ago",
          commentCount: 5,
          shareCount: 2,
        },
        {
          id: 2,
          title: "Discover the Power of React",
          date: "2h ago",
          commentCount: 3,
          shareCount: 2,
        },
        {
          id: 3,
          title: "10 Tips for Learning Python",
          date: "12h ago",
          commentCount: 300,
          shareCount: 21,
        },
        {
          id: 4,
          title: "The Art of Writing Clean Code",
          date: "1d ago",
          commentCount: 26,
          shareCount: 5,
        },
      ],
      Popular: [
        {
          id: 1,
          title: "The Impact of AI on Education",
          date: "Jan 7",
          commentCount: 29,
          shareCount: 16,
        },
        {
          id: 2,
          title: "Blockchain Technology",
          date: "Mar 19",
          commentCount: 24,
          shareCount: 12,
        },
        {
          id: 3,
          title: "The Impact of AI on Education",
          date: "Jan 7",
          commentCount: 29,
          shareCount: 16,
        },
        {
          id: 4,
          title: "Blockchain Technology: Revolutionizing the Tech Industry",
          date: "Mar 19",
          commentCount: 24,
          shareCount: 12,
        },
      ],
      Trending: [
        {
          id: 1,
          title: "10 answers to your questions about AI",
          date: "2d ago",
          commentCount: 9,
          shareCount: 5,
        },
        {
          id: 2,
          title: "Common Myths About Machine Learning",
          date: "4d ago",
          commentCount: 1,
          shareCount: 2,
        },
        {
          id: 3,
          title: "10 answers to your questions about AI",
          date: "2d ago",
          commentCount: 9,
          shareCount: 5,
        },
        {
          id: 4,
          title: "Myths About Machine Learning",
          date: "4d ago",
          commentCount: 1,
          shareCount: 2,
        },
      ],
    });
  
    return (
      <div>
        <div className="w-full px-2 pb-16 mt-16 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-400/20 p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none  focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-black hover:bg-white/[0.18] hover:text-gray-700"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <ul>
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className="relative rounded-md p-3 hover:bg-gray-100"
                      >
                        <h3 className="text-sm font-medium leading-5">
                          {post.title}
                        </h3>
                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                          <li>{post.date}</li>
                          <li>&middot;</li>
                          <li>{post.commentCount}</li>
                          <li>&middot;</li>
                          <li>{post.shareCount} shares</li>
                        </ul>
  
                        <Link
                          to="newsletter"
                          className={classNames(
                            "absolute inset-0 rounded-md",
                            "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  }