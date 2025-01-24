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
import Footer from "../../components/common/Footer";
import toast from "react-hot-toast";
// import socket from "../../socket/SocketioClient";
import { useSelector } from "react-redux";

const courseSchema = yup
  .object({
    title: yup.string().required("Title is required").trim(),
    tagline: yup.string().required("Tagline is required"),
    difficulty: yup.string().required("Difficulty is required"),
    category: yup.string().required("Category is required"),
    about: yup.string().required("About section is required"),
    price: yup.number().positive().integer().required("Price is required"),
    thumbnail: yup
      .mixed()
      .required("A thumbnail is required")
      .test(
        "fileSize",
        "File size too large. Max size is 1MB",
        (value) => !value[0] || value[0]?.size <= 1024 * 1024
      )
      .test(
        "fileType",
        "Unsupported file format. Only JPEG, PNG, or WEBP are allowed.",
        (value) =>
          !value[0] ||
          ["image/jpeg", "image/png", "image/webp"].includes(value[0]?.type)
      ),
  })
  .required();

export default function CreateCourse() {

  const user = useSelector((state) => state.user)
  const tutor = useSelector((state) => state.tutor)

  const [categories, setCategories] = useState([]);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(courseSchema),
  });

  useEffect(() => {
    getAllCategoriesAPI().then(({ data }) => {
      setCategories(data.category);
    });
  }, []);

  useEffect(() => {
    const thumbnail = watch("thumbnail");
    if (thumbnail && thumbnail.length > 0) {
      const file = thumbnail[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreviewURL(e.target.result);
      fileReader.readAsDataURL(file);
    }
  }, [watch("thumbnail")]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tagline", data.tagline);
    formData.append("about", data.about);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("difficulty", data.difficulty);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await createCourseAPI(formData);
      reset();
      toast.success("Course created successfully!");
      navigate("/tutor/courses");
      
  // if(socket){
  //   const Notification = {
  //     heading: "New Course Created!",
  //     message: `Tutor uploaded a new course, It will show after adding the lesson.`,
  //     from: tutor.tutorId,
  //     fromModel: "Tutors",
  //     to: user.userId,
  //     toModel: "Users",
  //   };
  //   socket.emit("to-users", Notification);
  // }
  
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error occurred while creating the course");
    }
  };

  return (
    <>
      <SectionTitle
        title="Create a new Course"
        description="Share the knowledge with the world!"
        tutor
      />
      <HorizontalRule />
      <div className="px-4 md:px-20 pb-10 md:pb-20 md:pt-6 nexa-font">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10">
                
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Title input */}
                    <div className="sm:col-span-4">
                      <label htmlFor="title" className="block text-md font-medium text-gray-900">
                        Course title
                      </label>
                      <div className="mt-2">
                        <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${errors.title ? "ring-red-600" : ""}`}>
                          <input
                            type="text"
                            id="title"
                            {...register("title")}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-md"
                            placeholder="title"
                          />
                        </div>
                        <p className="text-red-600 text-xs mt-2">{errors.title?.message}</p>
                      </div>
                    </div>

                    {/* Tagline input */}
                    <div className="sm:col-span-4">
                      <label htmlFor="tagline" className="block text-md font-medium text-gray-900">
                        Tag line
                      </label>
                      <div className="mt-2">
                        <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${errors.tagline ? "ring-red-600" : ""}`}>
                          <input
                            type="text"
                            id="tagline"
                            {...register("tagline")}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-md"
                            placeholder="tagline"
                          />
                        </div>
                        <p className="text-red-600 text-xs mt-2">{errors.tagline?.message}</p>
                      </div>
                    </div>

                    {/* Category and Difficulty */}
                    <div className="sm:col-span-6 flex">
                      <div className="w-full">
                        <label htmlFor="category" className="block text-md font-medium text-gray-900">
                          Category
                        </label>
                        <div className="mt-2">
                          <select
                            {...register("category")}
                            className="bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-md px-2"
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.title}
                              </option>
                            ))}
                          </select>
                          <p className="text-red-600 text-xs mt-2">{errors.category?.message}</p>
                        </div>
                      </div>
                      <div className="w-full">
                        <label htmlFor="difficulty" className="block text-md font-medium text-gray-900">
                          Difficulty
                        </label>
                        <div className="mt-2 px-4">
                          <select
                            {...register("difficulty")}
                            className="bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-md px-2"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                          <p className="text-red-600 text-xs mt-2">{errors.difficulty?.message}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price input */}
                    <div className="sm:col-span-4">
                      <label htmlFor="price" className="block text-md font-medium text-gray-900">
                        Price
                      </label>
                      <div className="mt-2">
                        <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${errors.price ? "ring-red-600" : ""}`}>
                          <input
                            type="number"
                            id="price"
                            {...register("price")}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-md"
                            placeholder="Price"
                          />
                        </div>
                        <p className="text-red-600 text-xs mt-2">{errors.price?.message}</p>
                      </div>
                    </div>

                    {/* About input */}
                    <div className="sm:col-span-6">
                      <label htmlFor="about" className="block text-md font-medium text-gray-900">
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          {...register("about")}
                          rows="5"
                          className={`block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${errors.about ? "ring-red-600" : ""} py-2 px-3`}
                          placeholder="Brief description about the course"
                        ></textarea>
                        <p className="text-red-600 text-xs mt-2">{errors.about?.message}</p>
                      </div>
                    </div>

                    {/* Thumbnail upload */}
                    <div className="sm:col-span-6">
                      <label htmlFor="thumbnail" className="block text-md font-medium text-gray-900">
                        Course Thumbnail
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="thumbnail"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                            >
                              <span>Upload a file</span>
                              <input
                                id="thumbnail"
                                type="file"
                                className="sr-only"
                                accept="image/jpeg,image/png,image/webp"
                                {...register("thumbnail")}
                              />
                            </label>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP up to 1MB</p>
                          <p className="text-red-600 text-xs mt-2">{errors.thumbnail?.message}</p>
                          {imagePreviewURL && (
                            <img
                              className="mx-auto mt-4 h-32 object-cover"
                              src={imagePreviewURL}
                              alt="Preview"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                  to="/tutor"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isSubmitting ? "Submitting..." : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
