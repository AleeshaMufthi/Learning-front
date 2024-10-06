import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { createCourseAPI } from "../../api/tutor";
import { getAllCategoriesAPI } from "../../api/common";
import { Dumy } from "../../api/link";
import SectionTitle from "../../components/common/SectionTitle";
import HorizontalRule from "../../components/common/HorizontalRule";
import * as yup from 'yup'
import React from 'react'

const courseSchema = yup
  .object({
    title: yup.string().required().trim(),
    tagline: yup.string().required(),
    difficulty: yup.string().required(),
    category: yup.string().required(),
    about: yup.string().required(), 
    price: yup.number().positive().integer().required(),
    thumbnail: yup.mixed().required(),
  })
  .required();

export default function CreateCourse() {

    const [categories, setCategories] = useState([]);
    const [imageError, setImageError] = useState(null);
    const navigate = useNavigate();
    const [imagePreviewURL, setImagePreviewURL] = useState(null);
  
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(courseSchema),
    });

    useEffect(() => {
      getAllCategoriesAPI().then(({ data }) => {
        setCategories(data.categories);
      });
    });

    const validateImage = (file) => {
      setImagePreviewURL(null);
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setImageError("invalid file type");
        console.log("invalid file type");
        return false;
      }
      const maxSize = 1024 * 1024;
      if (file.size > maxSize) {
        setImageError("file size exceeds limits of 1MB");
        console.log("file size exceeds limit of 1 mb");
        return false;
      }
      setImageError(null);
      return true;
    };

    useEffect(() => {
      let fileReader;
      if (watch("thumbnail")[0] && validateImage(watch("thumbnail")[0])) {
        if (watch("thumbnail")[0]) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result) setImagePreviewURL(result);
          };
          fileReader.readAsDataURL(watch("thumbnail")[0]);
        }
        return () => {
          if (fileReader && fileReader.readyState === 1) {
            console.log("aborted");
            fileReader.abort();
          }
        };
      }
    }, [watch("thumbnail")]);
    const onSubmit = async (data, e) => {
      if (imageError) {
        console.log("please upload correct thumbnail");
        return false;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("tagline", data.tagline);
      formData.append("about", data.about);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("difficulty", data.difficulty);
      formData.append("thumbnail", Array.from(data.thumbnail)[0]);
  
      createCourseAPI(formData)
        .then((response) => {
          reset();
          console.log(response);
          if (confirm("Course Created Successfully")) {
            console.log("yes");
            navigate("/tutor");
          } else {
            console.log("no");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("error occured while creating course" + error.message);
        });
    };

    return (
      <>
        <SectionTitle
          title="Create a new Course"
          description="Share the knowledge with world!"
          tutor
        />
        <HorizontalRule />
        <div className="px-4 md:px-20 pb-10 md:pb-20 md:pt-6 nexa-font">
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="lg:w-1/2">
              <form onSubmit={ handleSubmit(onSubmit)}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-amber-600 text-center">
                      Craft Compelling Courses
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-amber-900 text-center">
                      Design, Engage, Inspire with Brain Booster!!! Best Course Creation
                      Toolkit
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Course title
                        </label>
                        <div className="mt-2">
                          <div
                            className={`flex rounded-md shadow-sm ring-1ring-inset ring-gray-300 focuss-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${
                              errors.title?.message &&
                              "ring-red-600 ring-1 rounded-md"
                            }`}
                          >
                            <input
                              type="text"
                              name="title"
                              id="title"
                              {...register("title")}
                              className={`block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                              placeholder="title"
                            />
                          </div>
                          <p className="text-red-600 nex-font text-xs mt-2 ml-1">
                            {errors.title?.message}
                          </p>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="tagline"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Tag line
                        </label>
                        <div className="mt-2">
                          <div
                            className={`flex rounded-md shadow-sm ring-1ring-inset ring-gray-300 focuss-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${
                              errors.tagline?.message &&
                              "ring-red-600 ring-1 rounded-md"
                            }`}
                          >
                            <input
                              type="text"
                              name="tagline"
                              id="tagline"
                              {...register("tagline")}
                              autoComplete="tagline"
                              className={`block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                              placeholder="tagline"
                            />
                          </div>
                          <p className="text-red-600 nex-font text-xs mt-2 ml-1">
                            {errors.tagline?.message}
                          </p>
                        </div>
                      </div>
                      <div className="sm:col-span-6 flex">
                        <div className="w-full">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Catgegory
                          </label>
                          <div className="mt-2">
                            <select
                              name=""
                              id=""
                              className="bg-gray-100 block w-full rounded-md border-0 py-1 5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm-leading-6"
                              {...register("category")}
                            >
                               <option value="" disabled>Select Category</option>
                              {categories.map((category) => (
                                <option key={category._id}>
                                  {category.title}
                                </option>
                              ))}
                            </select>
                            <p className="text-red-600 nex-font text-xs mt-2 ml-1">
                              {errors.category?.message}
                            </p>
                          </div>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="difficulty"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Difficulty
                          </label>
                          <div className="mt-2">
                            <select
                              name="difficulty"
                              id="difficulty"
                              className="bg-gray-100 block w-full rounded-md border-0 py-1 5 text-gray-900 shadow-sm ring-1rind-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading"
                              {...register("difficulty")}
                            >
                              <option className="capitalize" value="beginner">
                                beginner
                              </option>
                              <option className="capitalize" value="intermediate">
                                intermediate
                              </option>
                              <option className="capitalize" value="advanced">
                                advanced
                              </option>
                              <option className="capitalize" value="expert">
                                expert
                              </option>
                            </select>
                            <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                              {errors.difficulty?.message}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Price
                        </label>
                        <div className="mt-2">
                          <div
                            className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${
                              errors.price?.message &&
                              "ring-red-600 ring-1 rounded-md"
                            }`}
                          >
                            <input
                              type="number"
                              name="price"
                              id="price"
                              {...register("price")}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="price"
                            />
                          </div>
                          <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                            {errors.difficulty?.message}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          About
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="about"
                            id="about"
                            rows={3}
                            {...register("about")}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                              errors.about?.message &&
                              "ring-red-600 ring-1 rounded-md"
                            }`}
                            defaultValue={""}
                          />
                        </div>
                        <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                          {errors.about?.message}
                        </p>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cover Photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon
                              className="mx-auto h-12 w-12 text-gray-300"
                              aria-hidden="true"
                            />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  {...register("thumbnail")}
                                  required
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG,JPG,WEBP up to 1MB
                            </p>
                          </div>
                        </div>
                        <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                          {errors.thumbnail?.message}
                        </p>
                        <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                          {imageError}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {/* done course creating area */}
            </div>
            {/* now below it will view what you editted  */}
            <div className="lg:w-1/2 mb-10 lg:mb-1 flex justify-center">
              <div>
                <SectionTitle
                  title="Course Preview"
                  description="This is how your course will look like"
                />
                <div
                  style={{ flexShrink: 0, scrollSnapAlign: "start" }}
                  className="w-full max-w-sm block hover:shadow-lg duration-300 bg-white border overflow-hidden border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-10"
                >
                  <div className="overflow-hidden">
                    <Link to={Dumy}>
                      <img
                        src={
                          imagePreviewURL
                            ? imagePreviewURL
                            : "https://archive.org/download/no-photo-available/no-photo-available.png"
                        }
                        style={{ minHeight: "286px", objectFit: "cover" }}
                        alt="course thumbnail"
                        className="rounded-t-lg duration-300 scale-105 hover:scale-100"
                      />
                    </Link>
                  </div>
                  <div className="px-5 pb-5">
                    <Link to={Dumy}>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-400 dark:text-white nexa-font">
                        {watch("title") ? watch("title") : "Attractive Title"}
                      </h5>
                      <h5 className="text-sm font-semibold tracking-tight text-gray-400 dark:text-white nexa-font">
                        {watch("tagline")
                          ? watch("tagline")
                          : "A tagline for your course"}
                      </h5>
                    </Link>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start justify-start">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ₹{watch("price") ? watch("price") : "0"}
                        </span>
                      </div>
                      <Link
                        to="#"
                        className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue=300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Buy Course
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
