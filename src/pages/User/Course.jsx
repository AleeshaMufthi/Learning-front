import React, { useEffect, useState} from "react";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../../components/common/Loading";
import SectionTitle from "../../components/common/SectionTitle";
import { BookOpenIcon, ClockIcon, CodeBracketIcon, UserGroupIcon, CheckCircleIcon, ChevronUpIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Disclosure, Tab } from "@headlessui/react";
import { getUser } from "../../components/authorization/getUser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCourseDetailsAPI, enrollCourseAPI } from "../../api/user";
import timeAgo from "../../utils/timeAgo";
import { Button } from "flowbite-react";
import Modal from "../../components/user/Modal";
import HorizontalRule from '../../components/common/HorizontalRule'

export default function Course() {
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [formattedDate, setFormattedDate] = useState({});
    const user = getUser();
    const params = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
  
    useEffect(() => {
      (async () => {
        const courseDetails = await getCourseDetailsAPI(params.id);
        setCourse(courseDetails.data.data);
        setTimeout(() => setIsLoading(false));
      })();
    }, []);

    useEffect(() => {
      const courseDate = new Date(course.createdAt).toDateString();
      const courseTimeAgo = timeAgo(course.createdAt);
      setFormattedDate({
        timeAgo: courseTimeAgo,
        createdAt: courseDate,
      });
    }, [course.createdAt]);
    function classNames(...classes) {
      return classes.filter(Boolean).join(" ");
    }
    const handleEnrollCourse = async (courseId, type) => {
      if (!user.loggedIn)
        return navigate(`/signin?private=true&from=${pathname}`);
      if (type === "fake") console.log("fake Buy");
      try {
        const response = await enrollCourseAPI({ courseId: courseId });
      } catch (error) {
        return console.log("error in enrolling Course", error);
      }
      setIsEnrolled(true);
      toast.success(
        "Congratulations ! You have Enrolled For the Course Successfully.",
        {
          duration: "4000",
          position: "top-right",
        }
      );
    };
    return (
      <>
        <Toaster />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex nexa-font">
            <div className="w-3/5 mx-3">
              <SectionTitle
                title="Course Overview"
                description="get an overview of the course here"
              />
              <HorizontalRule />
              <div className="flex justify-around sm:px-10 md:px-15 lg:px-20 mt-10 bg-white rounded-xl sm:p-5 md:p-10">
                <div className="flex justify-center items-center">
                  <span className="text-sm text-center px-4 text-gray-400 md:text-lg">
                    Instructor
                    <HorizontalRule />
                    <h1 className="text-sm text-amber-500 md:text-lg">
                      {course?.tutor?.name}
                    </h1>
                  </span>
                  <img
                    src="https://secure.gravatar.com/avatar/c98bb1db01e83b0183281b6aa6173647?s=250&d=mm&r=g"
                    alt="profile picture"
                    className="rounded-full w-10 sm:w-10 md:w-15 lg:w-20"
                  />
                </div>
                <div className="flex flex-row-reverse justify-center items-center">
                  <div className="text-sm text-center px-4 text-gray-400 md:text-lg">
                    Category
                    <hr />
                    <span className="text-sm text-amber-500  md:text-lg">
                      {course?.category || "programming"}
                    </span>
                  </div>
                  <CodeBracketIcon className="sm:w-6 md:w-7 lg:w-10" />
                </div>
              </div>
              <div className="bg-white flex p-3 my-3 rounded-lg">
                <ul className="flex justify-evenly w-full">
                  <li className="flex gap-2">
                    <BookOpenIcon className="w-5 text-blue-500" />
                    {course.lessons?.length} Lessons
                  </li>
                  <li className="flex gap-2">
                    <ClockIcon className="w-5 text-blue-500" />
                    {course.totalDuration ?? "10 hours"}
                  </li>
                  <li className="flex gap-2">
                    <UserGroupIcon className="w-5 text-blue-500" />
                    {course.totalStudentsEnrolled ?? 3} enrolled
                  </li>
                </ul>
              </div>
              <div className="flex justify-center bg-white rounded-xl mt-2">
                <div
                  className="w-full px-2 py-2 sm:px-4"
                  style={{ minHeight: "31rem" }}
                >
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-indigo-500 p-1">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                          )
                        }
                      >
                        Overview
                      </Tab>
  
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                          )
                        }
                      >
                        Lessons
                      </Tab>
                     
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel
                        className={classNames(
                          "rounded-xl bg-white p-3",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                        )}
                      >
                        <ul>
                          <li>
                            {" "}
                            <div className="sm:p-2 md:p-3 lg:p-5">
                              <div className="sm:ml-1 md:ml-3 lg:ml-5 flex justify-between">
                                <div>
                                  <h3 className="sm:text-2xl md:text-2xl lg:text-3xl">
                                    {course.title.charAt(0).toUpperCase() +
                                      course.title.slice(1)}
                                  </h3>
  
                                  <h3 className="sm:text-sm md:text-md text-gray-500">
                                    {course.tagline}
                                  </h3>
                                </div>
                                <div className="flex flex-col justify-center">
                                  <h3 className="text-xs text-gray-500">
                                    {formattedDate?.createdAt}
                                  </h3>
                                  <h3 className="text-xs text-gray-500 text-end">
                                    {formattedDate?.timeAgo} Ago
                                  </h3>
                                </div>
                              </div>
                              <HorizontalRule />
                              <div className="flex justify-center pb-4">
                                <img
                                  src={course.thumbnailURL}
                                  alt="course thumbnail image"
                                  className="rounded-lg w-132.5 shadow-2"
                                />
                              </div>
                              <HorizontalRule />
                              <div className="px-20 text-justify">
                                <span className="text-justify">
                                  {course.about}
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </Tab.Panel>
                      <Tab.Panel
                        className={classNames(
                          "rounded-xl bg-white p-3 ",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                        )}
                      >
                        <ul>
                          <li>
                            <div className="sm:p-2 md:p-3 lg:p-5">
                              <div className="sm:ml-1 md:ml-3 lg:ml-5 flex justify-between">
                                <div>
                                  <h3 className="sm:text-xl md:text-2xl lg:text-3xl">
                                    Total Lessons - {course?.lessons?.length}
                                  </h3>
                                  <h3 className="sm:text-sm md:text-md text-gray-500">
                                    {course.tagline}
                                  </h3>
                                </div>
                                <div className="flex flex-col justify-center">
                                  <h3 className="text-xs text-gray-500">
                                    {formattedDate.createdAt}
                                  </h3>
                                  <h3 className="text-xs text-gray-500 text-end">
                                    {formattedDate.timeAgo} ago
                                  </h3>
                                </div>
                              </div>
                              <div className="w-full px-4">
                                <div className="mx-auto w-full rounded-2xl bg-white">
                                  {course?.lessons?.map((lesson, index) => (
                                    <Disclosure
                                      as="div"
                                      className="mt-2"
                                      key={lesson._id}
                                    >
                                      {({ open }) => (
                                        <>
                                          <Disclosure.Button className="w-full justify-between rounded-lg bg-indigo-100 px-4 py-3 text-left text-sm font-medium text-purple-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            <div className="flex items-center gap-2">
                                              {/* First line - left-aligned */}
                                              <span>{index + 1}</span>
                                              <span>{lesson.title}</span>
                                            </div>
  
                                            <div className="flex items-center gap-2">
                                              {/* Second line - right-aligned */}
                                              <div className="ml-auto">
                                                {(lesson.duration / 60).toFixed(
                                                  2
                                                )}
                                                :00
                                              </div>
  
                                              <ChevronUpIcon
                                                className={`${
                                                  open
                                                    ? "transform"
                                                    : "rotate-180"
                                                } h-5 w-5 text-purple-500`}
                                              />
                                            </div>
                                          </Disclosure.Button>
  
                                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 flex justify-between">
                                            <div className="flex">
                                              <LockClosedIcon className="w-4 mr-2 mb-2" />
                                              {lesson.description}
                                            </div>
                                            <div>
                                              {timeAgo(lesson.createdAt)} ago
                                            </div>
                                          </Disclosure.Panel>
                                        </>
                                      )}
                                    </Disclosure>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
  
            <div className="w-2/5 mx-3">
              <SectionTitle title="price" description="This is a Paid Course" />
              <HorizontalRule />
              <div className="rounded-2xl bg-white py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  {isEnrolled ? (
                    <div className="flex flex-col items-center">
                      <CheckCircleIcon className="text-green-400 w-20" />
                      Enrolled for Course
                      <Button
                        className="mt-5"
                        onClick={() =>
                          navigate(`/courses/enrolled/${course._id}`)
                        }
                      >
                        View Course
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-base font-semibold text-gray-600">
                        Pay once & own it forever
                      </p>
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="sm:text-xl md:text-2xl lg:text-5xl font-bold tracking-tight text-gray-900">
                          ₹{course?.price}
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                          INR
                        </span>
                      </p>
                      <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="mt-2 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Fake Buy
                    </button>
                    
                    <Modal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      modalData={{
                        title: "Confirm Payment",
                        description:
                          'By Clicking "Confirm" you are accepting Learnt payment procedures and proceed to payment',
                        onClick: () => handleEnrollCourse(course._id, "fake"),
                      }}
                    />
                 
                      <p className="mt-6 text-xs leading-5 text-gray-600">
                        Invoices and receipts available for easy company
                        reimbursement
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  