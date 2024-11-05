import { useState, useEffect } from "react";
import { getCourseDetailsAPI } from "../../api/tutor";
import { getAllCoursesAPI } from "../../api/common";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonDetailsAPI } from "../../api/common";
import timeAgo from "../../utils/timeAgo";
import HorizontalRule from "../../components/common/HorizontalRule";
import { ChevronUpIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";

export default function ViewLesson() {
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [formattedDate, setFormattedDate] = useState({});
    const [lesson, setLesson] = useState("");
    const [formatVideo, setFormatVideo] = useState(true);
    const params = useParams();
    const myCallback = () => console.log("Video has ended");
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const courseDetails = await getCourseDetailsAPI(params.id);
        console.log(courseDetails, "courseDetailssssss");
        
        if (!courseDetails) navigate(`/courses/${params.id}`);
        setCourse(courseDetails.data.data);
        console.log(courseDetails.data.data);
        setTimeout(() => setIsLoading(false), 1000);
      })();
    }, []);
  
    useEffect(() => {
      if (course?.lessons?.length) {
        playLesson(course.lessons[0]._id);
      }
    }, [course._id]);

    const playLesson = (lessonId) => {
      getLessonDetailsAPI(lessonId).then((response) => {
        setLesson(response.data.lesson);
        setFormatVideo(response.data.lesson?.videoFormat);
      });
      
    };
    useEffect(() => {
      const courseDate = new Date(course.createdAt).toDateString();
      const courseTimeAgo = timeAgo(course.createdAt);
      setFormattedDate({ timeAgo: courseTimeAgo, createdAt: courseDate });
    }, [course.createdAt]);
    
    return (
      <>
        <div className="flex nexa-font flex-col md:flex-row">
          <div className="md:w-3/5 mx-3">
            <div className="p-5">
              <HorizontalRule />
              {formatVideo != "pdf" ? (
                <div className="flex justify-center pb-4 h-98">
                  <video
                    className="w-full rounded-lg h-full"
                    controls
                    onEnded={() => myCallback()}
                    src={lesson.videoURL}
                    type="video/mp4"
                    controlsList="nodownload"
                  ></video>
                </div>
              ) : (
                <div className="flex justify-center" height="800px">
                  {/* <iframe
                    src={lesson.videoURL}
                    className="w-full rounded-lg h-full"
                  ></iframe> */}
                  <object
                    data={lesson.videoURL}
                    type="application/pdf"
                    className="w-full rounded-lg h-full"
                    height="800px"
                  >
                    <p>
                      Alternative text - include a link{" "}
                      <a href={lesson.videoURL}>to the PDF!</a>
                    </p>
                  </object>
                </div>
              )}
             
              <HorizontalRule />
            </div>
            {/* left section 1 */}
            {/* <div className="flex justify-around px-20 bg-white rounded-xl p-10">
              <div className="flex justify-center items-center ">
                <span className="text-xl text-center px-4 text-gray-400">
                  Instructor
                  <hr />
                  <h1 className="text-xl  text-amber-500">
                    {course?.tutor?.name}
                  </h1>
                </span>
                <img
                  className="rounded-full w-20"
                  src="https://secure.gravatar.com/avatar/c98bb1db01e83b0183281b6aa6173647?s=250&d=mm&r=g"
                  alt="profile picture"
                />
              </div>
              <div className="flex flex-row-reverse justify-center items-center ">
                <div className="text-xl text-center px-4 text-gray-400">
                  Category
                  <hr />
                  <span className="text-xl  text-amber-500">
                    {course?.category || "programming"}
                  </span>
                </div>
                <CodeBracketIcon className="w-10" />
              </div>
            </div> */}
  
            {/* left section 2 */}
            {/* <div className="bg-white flex p-3 my-3 rounded-lg">
              <ul className="flex justify-evenly w-full">
                <li className="flex gap-2">
                  <BookOpenIcon className="w-5 text-blue-500" />{" "}
                  {course?.lessons?.length ?? 0} Lessons
                </li>
                <li className="flex gap-2">
                  <ClockIcon className="w-5 text-blue-500" />{" "}
                  {course.totalDuration ?? "10 hours"}
                </li>
                <li className="flex gap-2">
                  <UserGroupIcon className="w-5 text-blue-500" />{" "}
                  {course?.enrolled?.length ?? 15} enrolled
                </li>
              </ul>
            </div> */}
  
            {/* left section 3 */}
            {/* <div className="flex justify-center bg-white rounded-xl mt-2">
              <div
                className="w-full px-2 py-2 sm:px-4 "
                style={{ minHeight: "31rem" }}
              ></div>
            </div> */}
          </div>
          {/* Right Lessons section  */}
          <div className="md:w-2/5 mx-3 md:mt-20 md:mr-10">
            <div className="rounded-2xl bg-white py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-16">
              <div className="px-5">
                <HorizontalRule />
                <div className="w-full md:px-4">
                  <div className="mx-auto w-full rounded-2xl bg-white">
                    {course?.lessons ? (
                      course.lessons.map((lesson, index) => (
                        <Disclosure as="div" className="mt-2" key={lesson._id}>
                          {({ open }) => (
                            <>
                               <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100  px-4 py-4 text-left text-sm font-medium text-purple-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>
                                   {index + 1}. {lesson.title}
                                 </span> 
                                {/* <div className="flex items-center gap-2">
                               
                                  <ChevronUpIcon
                                    className={`${
                                      open ? "transform" : "rotate-180"
                                    } h-5 w-5 text-purple-500`}
                                  />
                                </div> */}
                              </Disclosure.Button> 
                              <Disclosure.Panel
                                className="px-4 text-gray-500 flex justify-between hover:text-blue-500 hover:cursor-alias"
                                onClick={() => playLesson(lesson._id)}
                              >
                                <div className="flex justify-center">
                                  <PlayCircleIcon className="w-5 mr-2 hover:rotate-180 duration-300" />
                                  <span className="line-clamp-1">
                                    {lesson.description}
                                  </span>
                                </div>
                                <div>{timeAgo(lesson.createdAt)}</div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))
                    ) : (
                      <>No Course Found</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  