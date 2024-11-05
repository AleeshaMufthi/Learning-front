import { Link } from "react-router-dom";
import HorizontalRule from "../common/HorizontalRule";
import SectionTitle from "../common/SectionTitle";
import { CodeBracketIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

import React from 'react'

export default function CategoryCard({categories}) {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(!isLoading);
      }, 2000);
    }, []);
  return (
    <>
      <SectionTitle
        title="Category"
        description="Find Your Next Learning Adventure"
      />
      <HorizontalRule />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 p-5 md:p-2">
        {categories.map((category, i) => (
          <Link
            to={"/explore"}
            key={i}
            className="block min-w-full sm:min-w-0 max-w-xs p-6 bg-white border border-gray-800 rounded-lg shadow hover:bg-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition ease-in-out hover:scale-105 duration-300 hover:shadow-lg ring-1 sm:ring-0"
          >
            <div className="flex flex-col gap-2 items-center justify-between">
              <CodeBracketIcon className="h-6 w-6 text-sm sm:block text-white" />
              <h6 className="text-lg md:text-2xl font-bold tracking-tight text-center text-white nexa-font">
                {category.title}
              </h6>
              <p className="font-normal text-sm hidden sm:block md:text-md text-center whitespace pre-wrap text-white nexa-font">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-center nexa-font items-center">
        <HorizontalRule />
        <button
          type="button"
          className="text-blue-700 bg-gray-100 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Icon</span>
        </button>
        <HorizontalRule />
      </div>
      <HorizontalRule />
      </>
  )
}

